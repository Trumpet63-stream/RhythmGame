import {NoteType} from "./note";

export interface AccuracyEvent {
    accuracyName: string,
    trackNumber: number,
    noteIndex: number,
    timeInSeconds: number,
    accuracyMillis: number,
    noteType: NoteType
}