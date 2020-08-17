import {NoteType} from "./parsing/parse_sm";

export interface AccuracyEvent {
    accuracyName: string,
    trackNumber: number,
    timeInSeconds: number,
    accuracyMillis: number,
    noteType: NoteType
}