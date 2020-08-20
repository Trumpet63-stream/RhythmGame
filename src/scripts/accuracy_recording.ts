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
    public perTrackRecording: AccuracyRecordingEntry[][];
    public linearRecording: AccuracyRecordingEntry[];

    constructor(numTracks: number) {
        this.state = AccuracyRecordingState.INCOMPLETE;
        this.perTrackRecording = [];
        for (let i = 0; i < numTracks; i++) {
            this.perTrackRecording.push([]);
        }
        this.linearRecording = [];
    }

    public update(accuracyEvent: AccuracyEvent) {
        let entry = {
            timeInSeconds: accuracyEvent.timeInSeconds,
            accuracyMillis: accuracyEvent.accuracyMillis,
            noteType: accuracyEvent.noteType
        }
        this.perTrackRecording[accuracyEvent.trackNumber].push(entry);
        this.linearRecording.push(entry);
    }
}