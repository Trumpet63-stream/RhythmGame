export class PlayerKeyEvent {
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