import * as p5 from "p5";
import {getKeyString, setConfigKeyBinding} from "../scripts/util";
import {global} from "./index";

export interface KeyBinding {
    trackNumber: number,
    keyCode: number,
    string: string
}

export class KeyBindingHelper {
    private bindingsToAcquire: number;
    private currentBindingNumber: number;

    constructor(bindingsToAcquire: number) {
        this.bindingsToAcquire = bindingsToAcquire;
        this.currentBindingNumber = 0;
    }

    public bindNext(p: p5) {
        let keybinding: KeyBinding = {
            trackNumber: this.currentBindingNumber,
            keyCode: p.keyCode,
            string: getKeyString(p)
        };
        setConfigKeyBinding(this.currentBindingNumber, this.bindingsToAcquire, keybinding);
        this.currentBindingNumber++;

        if (this.currentBindingNumber >= this.bindingsToAcquire) {
            global.keyboardEventManager.unbindKey(-1);
        }
    }
}
