import {Mode, Note, NoteState, NoteType} from "./parsing/parse_sm";
import {Config} from "./config";
import {global} from "./index";
import {KeyBinding} from "./key_binding_helper";
import * as p5 from "p5";
import {Accuracy} from "./accuracy_manager";
import {Stepfile, StepfileState} from "./stepfile";
import {AudioFile, AudioFileState} from "./audio_file";
import {PlayingDisplay} from "./playing_display";

export function defaultIfUndefined(value: any, defaultValue: any): any {
    return isUndefined(value) ? defaultValue : value;
}

export function isUndefined(value: any): boolean {
    return typeof value === "undefined";
}

export function setAllNotesToDefaultState(tracks: Note[][]) {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].length; j++) {
            tracks[i][j].state = NoteState.DEFAULT;
        }
    }
}

export function replaceNotYetImplementedNoteTypes(tracks: Note[][]) {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].length; j++) {
            switch (tracks[i][j].type) {
                case NoteType.TAIL:
                    break;
                case NoteType.MINE:
                    tracks[i][j].type = NoteType.NONE; //TODO: implement mines
                    break;
                case NoteType.HOLD_HEAD:
                    break;
                case NoteType.NONE:
                    break;
                case NoteType.ROLL_HEAD:
                    tracks[i][j].type = NoteType.HOLD_HEAD; //TODO: implement rolls
                    break;
                case NoteType.NORMAL:
                    break;
            }
        }
    }
}

export function getMissBoundary(currentTime: number, config: Config) {
    let missBoundary = currentTime + (config.accuracySettings[0].upperBound / 1000); //result is in seconds
    return missBoundary;
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

export function getKeyBindingButtonId(trackNumber: number, numTracks: number) {
    return getKeyBindingUniqueId(trackNumber, numTracks) + "Button";
}

export function getKeyBindingContainerId(trackNumber: number, numTracks: number) {
    return getKeyBindingUniqueId(trackNumber, numTracks) + "Button";
}

function getKeyBindingUniqueId(trackNumber: number, numTracks: number) {
    return "track" + trackNumber + "Of" + numTracks + "Binding";
}

export function getKeyString(p: p5) {
    return p.key.length == 1 ? p.key.toUpperCase() : p.key;
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
    if (typeA != typeB) {
        if (typeA < typeB) {
            return -1;
        } else {
            return 1;
        }
    } else {
        let difficultyA = a.difficulty.toUpperCase();
        let difficultyB = b.difficulty.toUpperCase();
        if (difficultyA != difficultyB) {
            return difficultyRank(difficultyA) - difficultyRank(difficultyB);
        } else {
            let meterA = parseFloat(a.meter);
            let meterB = parseFloat(b.meter);
            if (meterA != meterB) {
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
                type: NoteType.HOLD_HEAD, typeString: "Don't Care", timeInSeconds: currentTime,
                state: NoteState.DEFAULT
            });
            track.push({
                type: NoteType.TAIL, typeString: "Don't Care", timeInSeconds: currentTime + 0.25,
                state: NoteState.DEFAULT
            });
        } else {
            track.push({
                type: NoteType.NORMAL,
                typeString: "Don't Care",
                timeInSeconds: currentTime,
                state: NoteState.DEFAULT
            });
        }
        notes.push(track);
        isHold = !isHold;
        currentTime += timeIncrement;
    }
    return notes;
}

export function getAccuracyEventName(timeDifferenceInMilliseconds: number, config: Config): string {
    if (config.accuracySettings[0].lowerBound == null &&
        timeDifferenceInMilliseconds < config.accuracySettings[0].upperBound) {
        return config.accuracySettings[0].name; // Handle miss if it exists
    }
    if (config.accuracySettings[config.accuracySettings.length - 1].upperBound == null &&
        timeDifferenceInMilliseconds >= config.accuracySettings[config.accuracySettings.length - 1].lowerBound) {
        return config.accuracySettings[config.accuracySettings.length - 1].name; // Handle boo if it exists
    }
    for (let i = 0; i < config.accuracySettings.length; i++) {
        let accuracy: Accuracy = config.accuracySettings[i];
        if (accuracy.lowerBound != null && accuracy.upperBound != null) {
            if (accuracy.lowerBound < timeDifferenceInMilliseconds && timeDifferenceInMilliseconds <= accuracy.upperBound) {
                return accuracy.name;
            }
        }
    }
    return "ERROR: Unknown accuracy";
}

export function isFilesReady(stepfile: Stepfile, audioFile: AudioFile) {
    let stepfileReady = stepfile.state === StepfileState.PARTIALLY_PARSED ||
        stepfile.state === StepfileState.FULLY_PARSED;
    let audioFileReady = audioFile.state === AudioFileState.BUFFERED;
    return stepfileReady && audioFileReady;
}

export function initPlayingDisplay(tracks: Note[][], audioFile: AudioFile) {
    global.playingDisplay = new PlayingDisplay(tracks, audioFile, global.config, global.p5Scene);
}
