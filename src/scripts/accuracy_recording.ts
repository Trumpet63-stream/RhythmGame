import {NoteType} from "./parse_sm";

export enum AccuracyRecordingState {
    INCOMPLETE,
    READY,
}

export interface AccuracyEvent {
    accuracyName: string,
    trackNumber: number,
    timeInSeconds: number,
    accuracyMillis: number,
    noteType: NoteType
}

export interface AccuracyRecordingEntry {
    timeInSeconds: number,
    accuracyMillis: number,
    noteType: NoteType
}

export class AccuracyRecording {
    public state: AccuracyRecordingState;
    public recording: AccuracyRecordingEntry[][];

    constructor(numTracks: number) {
        this.state = AccuracyRecordingState.INCOMPLETE;
        this.recording = [];
        for (let i = 0; i < numTracks; i++) {
            this.recording.push([]);
        }
    }

    public recordAccuracyEvent(accuracyEvent: AccuracyEvent) {
        this.recording[accuracyEvent.trackNumber].push(
            {
                timeInSeconds: accuracyEvent.timeInSeconds,
                accuracyMillis: accuracyEvent.accuracyMillis,
                noteType: accuracyEvent.noteType
            });
    }
}