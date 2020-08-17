import {NoteType} from "./parsing/parse_sm";
import {AccuracyEvent} from "./accuracy_event";

export enum AccuracyRecordingState {
    INCOMPLETE,
    READY,
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

    public update(accuracyEvent: AccuracyEvent) {
        this.recording[accuracyEvent.trackNumber].push(
            {
                timeInSeconds: accuracyEvent.timeInSeconds,
                accuracyMillis: accuracyEvent.accuracyMillis,
                noteType: accuracyEvent.noteType
            });
    }
}