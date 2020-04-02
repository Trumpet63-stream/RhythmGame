import {Note, NoteState, NoteType} from "./parsing";
import {Config} from "../scripts2/config";
import {global} from "../scripts2/index";
import {KeyBinding} from "../scripts2/keybind_utility";
import * as p5 from "p5";
import {AccuracyEvent} from "./handle_accuracy_event";

export function defaultIfUndefined(value: any, defaultValue: any): any {
    return isUndefined(value) ? defaultValue : value;
}

export function isUndefined(value: any): boolean {
    return typeof value === "undefined";
}

export function saveAccuracy(accuracyRecording: AccuracyEvent[][], trackNumber: number,
                             accuracyInMilliseconds: number, gameTime: number, noteType: NoteType) {
    accuracyRecording[trackNumber].push(
        {time: gameTime, accuracyInMilliseconds: accuracyInMilliseconds, noteType: noteType});
}

export function setAllNotesToDefault(tracks: Note[][]) {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].length; j++) {
            tracks[i][j].state = NoteState.DEFAULT;
        }
    }
}

export function replaceNotYetImplementedNoteTypes(tracks: Note[][]) {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].length; j++) {
            switch (NoteType[tracks[i][j].type as keyof typeof NoteType]) {
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

export function initializeKeyBindings(numTracks: number) {
    let mapping: { trackNumber: number, keyCode: number, string: string }[] = [];

    if (numTracks <= 9) {
        let keySequence = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
        for (let i = 0; i < numTracks; i++) {
            let keyString = keySequence[i];
            mapping.push({trackNumber: i, keyCode: keyString.charCodeAt(0), string: keyString});
        }
    } else if (numTracks > 9 && numTracks <= 26) {
        for (let i = 0; i < numTracks; i++) {
            let characterCode = "A".charCodeAt(0) + i; // This is an ASCII character code
            mapping.push({trackNumber: i, keyCode: characterCode, string: String.fromCharCode(characterCode)});
        }
    } else {
        throw new Error("Couldn't generate default key bindings for more than 26 tracks. Ran out of letters!");
    }

    global.config.keyBindings.set(numTracks, mapping);
}

export function setConfigKeyBinding(trackNumber: number, numTracks: number, keyBinding: KeyBinding) {
    let bindingIndex = getIndexOfTrackNumberBinding(trackNumber, global.config.keyBindings.get(numTracks));
    global.config.keyBindings.get(numTracks)[bindingIndex] = keyBinding;
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

function getKeyBindingUniqueId(trackNumber: number, numTracks: number) {
    return "track" + trackNumber + "Of" + numTracks + "Binding";
}

export function getKeyString(p: p5) {
    return p.key.length == 1 ? p.key.toUpperCase() : p.key;
}