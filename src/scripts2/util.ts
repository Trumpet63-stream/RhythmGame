import {KeyBinding} from "./keybind_utility";
import {global} from "./index";
import * as p5 from "p5";

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

function getIndexOfTrackNumberBinding(trackNumber: number, bindings: {trackNumber: number, keyCode: number, string: string}[]) {
    for(let i = 0; i < bindings.length; i++) {
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