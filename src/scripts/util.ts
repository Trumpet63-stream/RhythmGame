import {Mode, Note, NoteState, NoteType} from "./parsing/parse_sm";
import {Config} from "./config";
import {global} from "./index";
import {KeyBinding} from "./key_binding_helper";
import * as p5 from "p5";
import {Stepfile, StepfileState} from "./stepfile";
import {AudioFile, AudioFileState} from "./audio/audio_file";
import {PlayingDisplay} from "./pages/play/playing_display";
import {SyncGameDisplay} from "./pages/sync/sync_game_display";
import {HtmlAudioElementHelper} from "./audio/html_audio_element_helper";
import {PAGES} from "./page_manager";

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
    global.config.save();
}

export function setConfigKeyBinding(trackNumber: number, numTracks: number, keyBinding: KeyBinding) {
    let bindingIndex = getIndexOfTrackNumberBinding(trackNumber, global.config.keyBindings.get(numTracks));
    global.config.keyBindings.get(numTracks)[bindingIndex] = keyBinding;
    global.config.save();
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

export function getModeOptionsForDisplay(modesAsStrings: Map<string, string>[]): Mode[] {
    let modeOptions: Mode[] = [];
    for (let i = 0; i < modesAsStrings.length; i++) {
        let mode: Map<string, string> = modesAsStrings[i];
        modeOptions.push({type: mode.get("type"), difficulty: mode.get("difficulty"), meter: mode.get("meter"), id: i});
    }
    modeOptions.sort(compareModeOptions);
    return modeOptions;
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
                typeString: "Don't Care",
                timeInSeconds: currentTime,
                state: NoteState.DEFAULT,
                trackNumber: i
            });
            track.push({
                type: NoteType.TAIL,
                typeString: "Don't Care",
                timeInSeconds: currentTime + 0.25,
                state: NoteState.DEFAULT,
                trackNumber: i
            });
        } else {
            track.push({
                type: NoteType.NORMAL,
                typeString: "Don't Care",
                timeInSeconds: currentTime,
                state: NoteState.DEFAULT,
                trackNumber: i
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

export function initPlayingDisplay(tracks: Note[][], audioFile: AudioFile, returnPage: PAGES) {
    global.playingDisplay = new PlayingDisplay(tracks, <HtmlAudioElementHelper>audioFile, global.config, global.p5Scene, returnPage);
}

export function initSyncGameDisplay(tracks: Note[][], audioFile: AudioFile, returnPage: PAGES) {
    global.syncGameDisplay = new SyncGameDisplay(tracks, <HtmlAudioElementHelper>audioFile, global.config, global.p5Scene, returnPage);
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
