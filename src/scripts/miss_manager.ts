import {NoteManager} from "./note_manager";
import {Config} from "../scripts2/config";
import {AccuracyEvent, handleAccuracyEvent} from "./handle_accuracy_event";
import {getMissBoundary} from "./util";
import {Note, NoteState, NoteType} from "./parsing";
import {HoldManager} from "./hold_manager";

export class MissManager {
    private config: Config;
    private noteManager: NoteManager;
    private lastCheckedNoteIndices: number[];
    private accuracyRecording: AccuracyEvent[][];
    private holdManager: HoldManager;

    constructor(config: Config, noteManager: NoteManager, accuracyRecording: AccuracyEvent[][],
                holdManager: HoldManager) {
        this.config = config;
        this.noteManager = noteManager;
        this.lastCheckedNoteIndices = [];
        for (let i = 0; i < this.noteManager.tracks.length; i++) {
            this.lastCheckedNoteIndices.push(0);
        }
        this.accuracyRecording = accuracyRecording;
        this.holdManager = holdManager;
    }

    update(currentTime: number) {
        if (this.config.accuracySettings[0].lowerBound != null) {
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
            if (this.isNoteMissedAndNotHandled(track[indexOfLastCheckedNote], currentTime)) {
                this.handleMissedNote(trackNumber, track[indexOfLastCheckedNote], currentTime);
                indexOfLastCheckedNote++;
            } else {
                break;
            }
        }
        this.lastCheckedNoteIndices[trackNumber] = indexOfLastCheckedNote;
    }

    private isNoteMissedAndNotHandled(note: Note, currentTime: number): boolean {
        let missBoundary = getMissBoundary(currentTime, this.config);
        return note.timeInSeconds < missBoundary && note.state === NoteState.DEFAULT;
    }

    private handleMissedNote(trackNumber: number, missedNote: Note, currentTime: number) {
        handleAccuracyEvent(this.config.accuracySettings[0].name, trackNumber, -Infinity, currentTime, missedNote.type, this.accuracyRecording);
        missedNote.state = NoteState.MISSED;
        if (missedNote.type == NoteType.TAIL) {
            this.holdManager.unholdTrack(trackNumber) // Force a hold release upon missing the tail
        }
    }
}