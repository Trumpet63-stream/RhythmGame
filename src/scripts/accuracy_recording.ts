import {NoteType} from "./parsing/parse_sm";
import {AccuracyEvent} from "./accuracy_event";

export enum AccuracyRecordingState {
    INCOMPLETE,
    READY,
}

export interface AccuracyRecordingEntry {
    trackNumber: number,
    timeInSeconds: number,
    accuracyMillis: number,
    noteType: NoteType
}

export interface Replay {
    songTitle: string
    numTracks: number,
    numNotes: number,
    entries: AccuracyRecordingEntry[]
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

    public update(accuracyEvent: AccuracyEvent | AccuracyRecordingEntry) {
        let entry = {
            trackNumber: accuracyEvent.trackNumber,
            timeInSeconds: accuracyEvent.timeInSeconds,
            accuracyMillis: accuracyEvent.accuracyMillis,
            noteType: accuracyEvent.noteType
        }
        this.perTrackRecording[accuracyEvent.trackNumber].push(entry);
        this.linearRecording.push(entry);
    }

    public static ofReplay(replay: Replay): AccuracyRecording {
        let recording: AccuracyRecording = new AccuracyRecording(replay.numNotes);
        let entries: AccuracyRecordingEntry[] = replay.entries;
        for (let i = 0; i < entries.length; i++) {
            recording.update(entries[i]);
        }
        return recording;
    }
}