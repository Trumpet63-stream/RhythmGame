export enum NoteType {
    NONE,
    NORMAL,
    HOLD_HEAD,
    TAIL,
    ROLL_HEAD,
    MINE,
    UNKNOWN,
}

export enum NoteState {
    DEFAULT,
    HIT,
    MISSED,
    HELD,
}

export interface Note {
    type: NoteType,
    timeInSeconds: number,
    trackNumber: number,
    state: NoteState,
    beatFraction: number
}