import {NoteType} from "./parsing";

export enum AccuracyRecordingState {
    INCOMPLETE,
    READY,
}

export interface AccuracyEvent {
    timeInSeconds: number,
    accuracyMillis: number,
    noteType: NoteType
}

export class AccuracyRecording {
    public state: AccuracyRecordingState;
    public recording: AccuracyEvent[][];

    constructor(numTracks: number) {
        this.state = AccuracyRecordingState.INCOMPLETE;
        this.recording = [];
        for (let i = 0; i < numTracks; i++) {
            this.recording.push([]);
        }
    }

    public recordAccuracyEvent(trackNumber: number, accuracyMillis: number, currentTime: number, noteType: NoteType) {
        this.recording[trackNumber].push(
            {timeInSeconds: currentTime, accuracyMillis: accuracyMillis, noteType: noteType});
    }
}