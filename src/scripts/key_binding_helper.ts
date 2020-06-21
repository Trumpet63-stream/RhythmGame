import * as p5 from "p5";
import {getKeyString, setConfigKeyBinding} from "./util";
import {global} from "./index";
import {KeyBindingsUi} from "./key_bindings_ui";

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

    public bindNext(p: p5, keyBindingsQuickstartId: string) {
        let keybinding: KeyBinding = {
            trackNumber: this.currentBindingNumber,
            keyCode: p.keyCode,
            string: getKeyString(p)
        };
        setConfigKeyBinding(this.currentBindingNumber, this.bindingsToAcquire, keybinding);
        this.currentBindingNumber++;

        if (this.currentBindingNumber >= this.bindingsToAcquire) {
            global.keyboardEventManager.unbindKey(-1);
            document.getElementById(keyBindingsQuickstartId).scrollIntoView();
            KeyBindingsUi.noLongerWaitingForLastKey(p);
        } else {
            KeyBindingsUi.scrollKeyBindingIntoView(this.currentBindingNumber);
            KeyBindingsUi.indicateWaitingForKey(p, this.currentBindingNumber);
        }
    }
}
