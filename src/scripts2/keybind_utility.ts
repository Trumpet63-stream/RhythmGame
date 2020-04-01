import {setConfigKeyBinding} from "../scripts/util";

export interface KeyBinding {
    trackNumber: number,
    keyCode: number,
    string: string
}

export interface KeybindingFunction {
    (currentBinding: number): KeyBinding;
}

export interface SaveOnFinishFunction {
    (keybindings: Keybindings): void;
}

export type Keybindings = KeyBinding[];

export interface ActiveKeybindingState {
    currentBinding: number;
    totalBindings: number;
    bindings?: Keybindings;
}

export function BeginRebinding(bindingsToAcquire: number): ActiveKeybindingState {
    var keybindingState: ActiveKeybindingState = {
        currentBinding: 0,
        totalBindings: bindingsToAcquire,
        bindings: []
    };

    return keybindingState;
}

export function ContinueRebinding(state: ActiveKeybindingState, bindingFunction: KeybindingFunction): boolean {
    console.debug("current:" + state.currentBinding);
    console.debug("totalBindings:" + state.totalBindings);

    if (state.currentBinding < state.totalBindings) {
        setConfigKeyBinding(state.currentBinding, state.totalBindings, bindingFunction(state.currentBinding));
        state.currentBinding++;
    }

    return state.currentBinding < state.totalBindings;
}
