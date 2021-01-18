import {Config} from "./config";
import {global} from "./index";
import {KeyBinding} from "./key_binding_helper";
import * as p5 from "p5";
import {Mode, Stepfile, StepfileState} from "./stepfile";
import {AudioFile, AudioFileState} from "./audio/audio_file";
import {PlayingDisplay} from "./pages/play/playing_display";
import {SyncGameDisplay} from "./pages/sync/sync_game_display";
import {HtmlAudioElementHelper} from "./audio/html_audio_element_helper";
import {PageDescription} from "./pages/page_manager";
import {Note, NoteState, NoteType} from "./note";
import {OfflineStorageClient} from "./offline_storage_client/offline_storage_client";
import {ScoreProvider} from "./score_provider";
import {Replay} from "./accuracy_recording";
import {ExperimentDisplay} from "./pages/experiment/experiment_display";

export function defaultIfUndefined(value: any, defaultValue: any): any {
    return isUndefined(value) ? defaultValue : value;
}

export function isUndefined(value: any): boolean {
    return typeof value === "undefined";
}

export function getMissBoundaryInSeconds(currentTime: number, config: Config) {
    return currentTime + (config.accuracySettings[0].upperBound / 1000);
}

export function isKeyBindingsDefined(numTracks: number) {
    return global.config.keyBindings.get(numTracks) !== undefined;
}

export function initializeKeyBindings(numTracks: number) {
    let mapping: { trackNumber: number, keyCode: number, string: string }[] = [];

    if (numTracks <= 9) {
        let keySequence = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
        for (let i = 0; i < numTracks; i++) {
            let keyString = keySequence[i];
            mapping.push({trackNumber: i, keyCode: keyString.charCodeAt(0), string: keyString});
        }
    } else {
        if (numTracks > 26) {
            console.error("Couldn't generate default key bindings for more than 26 tracks. Ran out of letters!");
            numTracks = 26;
        }
        for (let i = 0; i < numTracks; i++) {
            let characterCode = "A".charCodeAt(0) + i; // This is an ASCII character code
            mapping.push({trackNumber: i, keyCode: characterCode, string: String.fromCharCode(characterCode)});
        }
    }

    global.config.keyBindings.set(numTracks, mapping);
    OfflineStorageClient.saveConfig(<Config>global.config);
}

export function setConfigKeyBinding(trackNumber: number, numTracks: number, keyBinding: KeyBinding) {
    let bindingIndex = getIndexOfTrackNumberBinding(trackNumber, global.config.keyBindings.get(numTracks));
    global.config.keyBindings.get(numTracks)[bindingIndex] = keyBinding;
    OfflineStorageClient.saveConfig(<Config>global.config);
}

// Expects e to be an enum
export function enumToStringArray(e: any): string[] {
    return Object.values(e).filter((value) => typeof value === "string").map((value) => {
        return String(value)
    });
}

function getIndexOfTrackNumberBinding(trackNumber: number, bindings: { trackNumber: number, keyCode: number, string: string }[]) {
    for (let i = 0; i < bindings.length; i++) {
        if (bindings[i].trackNumber === trackNumber) {
            return i;
        }
    }
    return -1;
}

export function getKeyString(p: p5) {
    return p.key.length === 1 ? p.key.toUpperCase() : p.key;
}

export function compareModeOptions(a: Mode, b: Mode) {
    let typeA = a.type.toUpperCase();
    let typeB = b.type.toUpperCase();
    if (typeA !== typeB) {
        if (typeA < typeB) {
            return -1;
        } else {
            return 1;
        }
    } else {
        let difficultyA = a.difficulty.toUpperCase();
        let difficultyB = b.difficulty.toUpperCase();
        if (difficultyA !== difficultyB) {
            return difficultyRank(difficultyA) - difficultyRank(difficultyB);
        } else {
            let meterA = parseFloat(a.meter);
            let meterB = parseFloat(b.meter);
            if (meterA !== meterB) {
                return meterA - meterB;
            }
        }
    }
    return a.id = b.id;
}

function difficultyRank(difficulty: string) {
    switch (difficulty) {
        case "BEGINNER":
            return 0;
        case "EASY":
            return 1;
        case "MEDIUM":
            return 2;
        case "HARD":
            return 3;
        case "CHALLENGE":
            return 4;
        case "EDIT":
            return 5;
        default:
            return 6;
    }
}

export function getFirstElementByTagName(div: p5.Element, tagName: string): p5.Element {
    let childrenNodes = div.child();
    for (let i = 0; i < childrenNodes.length; i++) {
        let node: Node = childrenNodes[i];
        // @ts-ignore
        if (node.tagName === tagName) {
            // @ts-ignore
            return new p5.Element(node);
        }
    }
    return undefined;
}

export function findBindingInfoForTrack(trackNumber: number, bindings: { trackNumber: number, keyCode: number, string: string }[]) {
    for (let i = 0; i < bindings.length; i++) {
        if (bindings[i].trackNumber === trackNumber) {
            return bindings[i];
        }
    }
    return undefined;
}

export function generatePreviewNotes(numTracks: number): Note[][] {
    let notes: Note[][] = [];
    let isHold = false;
    let currentTime = 0.1;
    let timeIncrement = 0.3 / numTracks;
    for (let i = 0; i < numTracks; i++) {
        let track: Note[] = [];
        if (isHold) {
            track.push({
                type: NoteType.HOLD_HEAD,
                timeInSeconds: currentTime,
                state: NoteState.DEFAULT,
                trackNumber: i,
                beatFraction: 8
            });
            track.push({
                type: NoteType.TAIL,
                timeInSeconds: currentTime + 0.25,
                state: NoteState.DEFAULT,
                trackNumber: i,
                beatFraction: 8
            });
        } else {
            track.push({
                type: NoteType.NORMAL,
                timeInSeconds: currentTime,
                state: NoteState.DEFAULT,
                trackNumber: i,
                beatFraction: 8
            });
        }
        notes.push(track);
        isHold = !isHold;
        currentTime += timeIncrement;
    }
    return notes;
}

export function isFilesReady(stepfile: Stepfile, audioFile: AudioFile) {
    let stepfileReady = stepfile.state === StepfileState.PARTIALLY_PARSED ||
        stepfile.state === StepfileState.FULLY_PARSED;
    let audioFileReady = audioFile.getState() === AudioFileState.BUFFERED;
    return stepfileReady && audioFileReady;
}

export function initPlayingDisplay(tracks: Note[][], audioFile: AudioFile, returnPage: PageDescription, songTitle: string): Promise<void> {
    let scoreProvider = new ScoreProvider(global.config, countItemsIn2dArray(tracks));
    return OfflineStorageClient.loadPBReplay(tracks, scoreProvider)
        .then((replay: Replay | null) => {
            if (replay !== null) {
                global.playingDisplay = new PlayingDisplay(tracks, <HtmlAudioElementHelper>audioFile, global.config,
                    global.p5Scene, returnPage, songTitle, replay, scoreProvider);
            } else {
                global.playingDisplay = new PlayingDisplay(tracks, <HtmlAudioElementHelper>audioFile, global.config,
                    global.p5Scene, returnPage, songTitle);
            }
        });
}

export function initSyncGameDisplay(tracks: Note[][], audioFile: AudioFile, returnPage: PageDescription, songTitle: string) {
    global.syncGameDisplay = new SyncGameDisplay(tracks, <HtmlAudioElementHelper>audioFile, global.config,
        global.p5Scene, returnPage, songTitle);
}

export function initExperimentDisplay(numTracks: number, returnPage: PageDescription, songTitle: string) {
    let tracks = getEmpty2dArray(numTracks);
    global.experimentDisplay = new ExperimentDisplay(tracks, global.config, global.p5Scene, returnPage, songTitle);
}

export function enumToString(TheEnum: any, value: any) {
    return TheEnum[value as keyof typeof TheEnum].toString();
}

export function getFloat(value: string | number): number {
    if (typeof value === "string") {
        return parseFloat(value);
    }
    return value;
}

export function getInt(value: string | number): number {
    if (typeof value === "string") {
        return parseInt(value);
    }
    return value;
}

export function getEnum(value: string | number, EnumType: any): any {
    let string: string = String(value);
    return EnumType[string as keyof typeof EnumType];
}

export function logArray(array: any[]) {
    for (let i = 0; i < array.length; i++) {
        let logEntry = i + ": " + JSON.stringify(array[i]);
        console.log(logEntry);
    }
}

export function lerp(startValue: number, endValue: number, ratio: number) {
    if (ratio <= 0) {
        return startValue;
    } else if (ratio > 0 && ratio < 1) {
        return startValue + (endValue - startValue) * ratio;
    } else {
        return endValue;
    }
}

export function mapLinear(fromStart: number, fromEnd: number, toStart: number, toEnd: number, fromValue: number) {
    let toValue = Math.abs(fromValue - fromStart) * Math.abs(toEnd - toStart) / Math.abs(fromEnd - fromStart);
    if (toEnd > toStart) {
        toValue = toValue + toStart;
    } else {
        toValue = -toValue + toStart;
    }
    return clampValueToRange(toValue, Math.min(toStart, toEnd), Math.max(toStart, toEnd));
}

export function getTextWidth(text: string, textSize: number): number {
    let p: p5 = this.p;
    p.push();
    p.textSize(textSize);
    let textWidth: number = p.textWidth(text);
    p.pop();
    return textWidth;
}

export function getEmpty2dArray(numRows: number): any[][] {
    let array: any[][] = [];
    for (let i = 0; i < numRows; i++) {
        array.push([]);
    }
    return array;
}

function countItemsIn2dArray(array2d: any[][]) {
    return array2d.reduce((sum, array) => sum + array.length, 0);
}

export function disableButton(button: p5.Element) {
    button.attribute("disabled", "");
}

export function enableButton(button: p5.Element) {
    button.removeAttribute("disabled");
}

export function getNowTimestamp(): string {
    return new Date().toISOString();
}

// The maximum is inclusive and the minimum is inclusive
export function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function mean(array: number[]) {
    return array.reduce((sum, x) => sum + x) / array.length;
}

export function clampValueToRange(value: number, lowerBound: number, upperBound: number): number {
    if (value < lowerBound) {
        return lowerBound;
    }
    if (value > upperBound) {
        return upperBound;
    }
    return value;
}