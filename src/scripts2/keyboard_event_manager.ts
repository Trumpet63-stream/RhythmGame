import * as p5 from "p5";

export class KeyboardEventManager {
    private bindings: Map<number, {keyDownAction: () => void, keyUpAction: () => void}>;

    constructor(p: p5) {
        this.bindings = new Map();

        p.keyPressed = function() {
            // -1 is a special keyCode flag that means "any". This is especially useful for setting up key bindings.
            let globalActions = this.bindings.get(-1);
            if (globalActions !== undefined) {
                if (globalActions.keyDownAction !== undefined) {
                    globalActions.keyDownAction();
                }
            } else {
                console.log("key down " + p.keyCode);
                let actions = this.bindings.get(p.keyCode);
                if (actions !== undefined) {
                    if (actions.keyDownAction !== undefined) {
                        actions.keyDownAction();
                    }
                }
            }
        }.bind(this);

        p.keyReleased = function() {
            console.log("key up " + p.keyCode);
            let actions = this.bindings.get(p.keyCode);
            if (actions !== undefined) {
                if (actions.keyUpAction !== undefined) {
                    actions.keyUpAction();
                }
            }
        }.bind(this);
    }

    bindKeyToAction(keyCode: number, keyDownAction: () => void, keyUpAction: () => void = undefined) {
        this.bindings.set(keyCode, {keyDownAction: keyDownAction, keyUpAction: keyUpAction});
    }

    unbindKey(keyCode: number) {
        return this.bindings.delete(keyCode);
    }
}