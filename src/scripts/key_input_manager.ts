import {AccuracyManager} from "./accuracy_manager";
import {Config} from "../scripts2/config";
import {GameTimeSupplier} from "../scripts2/game_time_provider";

export class PlayerKeyAction {
    gameTime: number;
    track: number;
    keyState: KeyState;

    constructor(gameTime: number, track: number, keyState: KeyState) {
        this.gameTime = gameTime;
        this.track = track;
        this.keyState = keyState;
    }
}

export enum KeyState {
    UP, DOWN,
}

export class KeyHandler {
    timeManager: GameTimeSupplier; // Allow ScrollManager only for debug mode
    accuracyManager: AccuracyManager;
    config: Config;
    heldKeys = new Set<string>();

    constructor(config: Config, timeManager: GameTimeSupplier, accuracyManager: AccuracyManager) {
        this.config = config;
        this.timeManager = timeManager;
        this.accuracyManager = accuracyManager;
    }

    keyDown(e: KeyboardEvent) {
        // if (this.isBoundKey(e.key)) {
        //     if (!this.heldKeys.has(e.key)) {
        //         this.handleKeyboardEvent(e, KeyState.DOWN);
        //     }
        // }
    }

    keyUp(e: KeyboardEvent) {
        // if (this.isBoundKey(e.key)) {
        //     if (this.heldKeys.has(e.key)) {
        //         this.handleKeyboardEvent(e, KeyState.UP);
        //     }
        // }
    }

    //TODO: only do .toUpperCase when displaying the bindings, not when storing
    private isBoundKey(key: string) {
        // return this.config.keyBindings.hasKey(key.toUpperCase());
    }

    private handleKeyboardEvent(e: KeyboardEvent, keyState: KeyState) {
        if (keyState == KeyState.DOWN) {
            this.heldKeys.add(e.key);
        } else {
            this.heldKeys.delete(e.key);
        }
        // this.accuracyManager.handlePlayerAction(
        //     new PlayerKeyAction(
        //         this.timeManager.getGameTime(performance.now()),
        //         this.config.keyBindings.getValue(e.key.toUpperCase()),
        //         keyState
        //     )
        // );
    }
}