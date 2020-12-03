import {NoteManager} from "./note_manager";
import {Config} from "./config";
import {getMissBoundaryInSeconds} from "./util";
import {HoldManager} from "./hold_manager";
import {AccuracyRecording} from "./accuracy_recording";
import {AccuracyEvent} from "./accuracy_event";
import {AccuracyUtil} from "./accuracy_util";
import {Note, NoteState} from "./note";

export class MissManager {
    private config: Config;
    private noteManager: NoteManager;
    private lastCheckedNoteIndices: number[];
    private accuracyRecording: AccuracyRecording;
    private holdManager: HoldManager;
    private handleAccuracyEvent: (accuracyEvent: AccuracyEvent) => void;

    public constructor(config: Config, noteManager: NoteManager, accuracyRecording: AccuracyRecording,
                       holdManager: HoldManager, handleAccuracyEvent: (accuracyEvent: AccuracyEvent) => void) {
        this.config = config;
        this.noteManager = noteManager;
        this.lastCheckedNoteIndices = [];
        for (let i = 0; i < this.noteManager.tracks.length; i++) {
            this.lastCheckedNoteIndices.push(0);
        }
        this.accuracyRecording = accuracyRecording;
        this.holdManager = holdManager;
        this.handleAccuracyEvent = handleAccuracyEvent;
    }

    public update(currentTimeInSeconds: number) {
        if (this.config.accuracySettings[0].lowerBound !== null) {
            return; // A lowerBound for misses is incompatible with this way of doing misses
        }
        let numTracks = this.noteManager.tracks.length;
        for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
            this.handleAllMissedNotesForTrack(trackNumber, currentTimeInSeconds);
        }
    }

    private handleAllMissedNotesForTrack(trackNumber: number, currentTimeInSeconds: number) {
        let indexOfLastCheckedNote = this.lastCheckedNoteIndices[trackNumber];
        let track: Note[] = this.noteManager.tracks[trackNumber];
        while (true) {
            if (indexOfLastCheckedNote >= track.length) {
                break;
            }
            let currentNote = track[indexOfLastCheckedNote];
            if (!this.isMissable(currentNote)) {
                indexOfLastCheckedNote++;
                continue;
            }
            if (this.isNoteMissedAndNotHandled(currentNote, currentTimeInSeconds)) {
                // TODO: current time should be the earliest possible miss time, not just when the miss was detected
                this.handleMissedNote(trackNumber, indexOfLastCheckedNote, currentTimeInSeconds);
                indexOfLastCheckedNote++;
            } else {
                break;
            }
        }
        this.lastCheckedNoteIndices[trackNumber] = indexOfLastCheckedNote;
    }

    // For example: notes that have already been hit are not missable
    private isMissable(note: Note) {
        return note.state === NoteState.DEFAULT;
    }

    private isNoteMissedAndNotHandled(note: Note, currentTimeInSeconds: number): boolean {
        let missBoundary = getMissBoundaryInSeconds(currentTimeInSeconds, this.config);
        return note.timeInSeconds < missBoundary && note.state === NoteState.DEFAULT;
    }

    private handleMissedNote(trackNumber: number, indexOfMissedNote: number, currentTimeInSeconds: number) {
        let track = this.noteManager.tracks[trackNumber];
        let missedNote = track[indexOfMissedNote];
        this.handleAccuracyEvent({
            accuracyName: this.config.accuracySettings[0].name,
            trackNumber: trackNumber,
            noteIndex: indexOfMissedNote,
            accuracyMillis: AccuracyUtil.MISS_ACCURACY_FLAG,
            timeInSeconds: currentTimeInSeconds,
            noteType: missedNote.type
        });
    }
}