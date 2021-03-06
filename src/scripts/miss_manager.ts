import {NoteManager} from "./note_manager";
import {Config} from "./config";
import {getMissBoundaryInSeconds} from "./util";
import {Note, NoteState, NoteType} from "./parsing/parse_sm";
import {HoldManager} from "./hold_manager";
import {AccuracyRecording} from "./accuracy_recording";
import {AccuracyEvent} from "./accuracy_event";

export class MissManager {
    private config: Config;
    private noteManager: NoteManager;
    private lastCheckedNoteIndices: number[];
    private accuracyRecording: AccuracyRecording;
    private holdManager: HoldManager;
    private handleAccuracyEvent: (accuracyEvent: AccuracyEvent) => void;

    constructor(config: Config, noteManager: NoteManager, accuracyRecording: AccuracyRecording,
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

    update(currentTime: number) {
        if (this.config.accuracySettings[0].lowerBound !== null) {
            return; // A lowerBound for misses is incompatible with this way of doing misses
        }
        let numTracks = this.noteManager.tracks.length;
        for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
            this.handleAllMissedNotesForTrack(trackNumber, currentTime);
        }
    }

    private handleAllMissedNotesForTrack(trackNumber: number, currentTime: number) {
        let indexOfLastCheckedNote = this.lastCheckedNoteIndices[trackNumber];
        let track: Note[] = this.noteManager.tracks[trackNumber];
        while (true) {
            if (indexOfLastCheckedNote >= track.length) {
                break;
            }
            let currentNote = track[indexOfLastCheckedNote];
            if (this.isNotMissable(currentNote)) {
                indexOfLastCheckedNote++;
                continue;
            }
            if (this.isNoteMissedAndNotHandled(currentNote, currentTime)) {
                this.handleMissedNote(trackNumber, indexOfLastCheckedNote, currentTime);
                indexOfLastCheckedNote++;
            } else {
                break;
            }
        }
        this.lastCheckedNoteIndices[trackNumber] = indexOfLastCheckedNote;
    }

    // For example: notes that have already been hit are not missable
    private isNotMissable(note: Note) {
        return note.state !== NoteState.DEFAULT;
    }

    private isNoteMissedAndNotHandled(note: Note, currentTime: number): boolean {
        let missBoundary = getMissBoundaryInSeconds(currentTime, this.config);
        return note.timeInSeconds < missBoundary && note.state === NoteState.DEFAULT;
    }

    private handleMissedNote(trackNumber: number, indexOfMissedNote: number, currentTimeInSeconds: number) {
        let track = this.noteManager.tracks[trackNumber];
        let missedNote = track[indexOfMissedNote];
        this.handleAccuracyEvent({
            accuracyName: this.config.accuracySettings[0].name,
            trackNumber: trackNumber,
            accuracyMillis: -Infinity,
            timeInSeconds: currentTimeInSeconds,
            noteType: missedNote.type
        });
        missedNote.state = NoteState.MISSED;
        if (missedNote.type === NoteType.TAIL) {
            if (this.holdManager.isTrackHeld(trackNumber)) {
                this.holdManager.unholdTrack(trackNumber, currentTimeInSeconds) // Force a hold release upon missing the tail
            }
        } else if (missedNote.type === NoteType.HOLD_HEAD) {
            let nextNote = track[indexOfMissedNote + 1];
            if (nextNote !== undefined) {
                if (nextNote.type === NoteType.TAIL) {
                    nextNote.state = NoteState.MISSED; // Miss the tail when you miss the head
                }
            }
        }
    }
}