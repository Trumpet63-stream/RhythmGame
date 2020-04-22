import * as p5 from "p5";

export class KeyboardEventManager {
    private actionBindings: Map<number, {keyDownAction: () => void, keyUpAction: () => void}>;

    constructor(p: p5) {
        this.actionBindings = new Map();

        p.keyPressed = function() {
            // -1 is a special keyCode flag that means "any". This is especially useful for setting up key bindings.
            let globalActions = this.actionBindings.get(-1);
            if (globalActions !== undefined) {
                if (globalActions.keyDownAction !== undefined) {
                    globalActions.keyDownAction();
                }
            } else {
                let actions = this.actionBindings.get(p.keyCode);
                if (actions !== undefined) {
                    if (actions.keyDownAction !== undefined) {
                        actions.keyDownAction();
                    }
                }
            }
        }.bind(this);

        p.keyReleased = function() {
            let actions = this.actionBindings.get(p.keyCode);
            if (actions !== undefined) {
                if (actions.keyUpAction !== undefined) {
                    actions.keyUpAction();
                }
            }
        }.bind(this);
    }

    bindKeyToAction(keyCode: number, keyDownAction: () => void, keyUpAction: () => void = undefined) {
        this.actionBindings.set(keyCode, {keyDownAction: keyDownAction, keyUpAction: keyUpAction});
    }

    unbindKey(keyCode: number): boolean {
        return this.actionBindings.delete(keyCode);
    }
}