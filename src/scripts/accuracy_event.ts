import {NoteType} from "./stepfile";

export interface AccuracyEvent {
    accuracyName: string,
    trackNumber: number,
    timeInSeconds: number,
    accuracyMillis: number,
    noteType: NoteType
}