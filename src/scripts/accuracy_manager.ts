import {NoteManager} from "./note_manager";
import {KeyState, PlayerKeyAction} from "./player_key_action";
import {Config} from "../scripts2/config";
import {handleAccuracyEvent} from "./handle_accuracy_event";
import {HoldManager} from "./hold_manager";
import {Note, NoteState, NoteType} from "./parsing";
import {AccuracyEvent, AccuracyRecording} from "../scripts2/accuracy_recording";

export class Accuracy {
    name: string;
    lowerBound: number;
    upperBound: number;

    constructor(name: string, lowerBound: number, upperBound: number) {
        this.name = name;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }
}

export class AccuracyManager {
    private noteManager: NoteManager;
    holdManager: HoldManager;
    private config: Config;
    private accuracyRecording: AccuracyRecording;

    constructor(noteManager: NoteManager, config: Config, accuracyRecording: AccuracyRecording,
                holdManager: HoldManager) {
        this.noteManager = noteManager;
        this.config = config;
        this.accuracyRecording = accuracyRecording;
        this.holdManager = holdManager;
    }

    handlePlayerAction(action: PlayerKeyAction): void {
        if (action.keyState == KeyState.DOWN) {
            this.tryToHitNote(action.gameTime, action.track);
        } else if (action.keyState == KeyState.UP) {
            if (this.holdManager.isTrackHeld(action.track)) {
                this.holdManager.unholdTrack(action.track);
                this.tryToReleaseNote(action.gameTime, action.track);
            }
        }
    }

    private tryToHitNote(currentTimeInSeconds: number, trackNumber: number) {
        let noteIndex = this.getEarliestHittableUnhitNoteIndex(currentTimeInSeconds, trackNumber);
        if (noteIndex != null) {
            let note: Note = this.noteManager.tracks[trackNumber][noteIndex];
            if (note.type === NoteType.NORMAL) {
                note.state = NoteState.HIT;
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                handleAccuracyEvent(this.getAccuracyEventName(accuracy), trackNumber, accuracy, currentTimeInSeconds,
                    note.type, this.accuracyRecording);
            } else if (note.type == NoteType.HOLD_HEAD) {
                note.state = NoteState.HELD; // set the note to held so it won't count as a miss
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                handleAccuracyEvent(this.getAccuracyEventName(accuracy), trackNumber, accuracy, currentTimeInSeconds,
                    note.type, this.accuracyRecording);
                this.holdManager.holdTrack(trackNumber);
            }
        } else if (this.isConfiguredForBoos()) {
            handleAccuracyEvent(this.getAccuracyEventName(Infinity), trackNumber, Infinity, currentTimeInSeconds,
                NoteType.NONE, this.accuracyRecording);
        }
    }

    private getEarliestHittableUnhitNoteIndex(currentTimeInSeconds: number, trackNumber: number) {
        let accuracyRange: { leastTime: number, greatestTime: number } = this.getAccuracyRangeInSeconds();
        let hittableTimeRange: { leastTime: number, greatestTime: number } =
            this.getHittableRange(accuracyRange, currentTimeInSeconds);
        let hittableIndexRange: {startIndex: number, endIndexNotInclusive: number} =
            this.noteManager.getNotesByTimeRange(hittableTimeRange.leastTime, hittableTimeRange.greatestTime, trackNumber);
        return this.getEarliestUnhitNoteIndexInRange(trackNumber, hittableIndexRange);
    }

    getAccuracyRangeInSeconds() {
        let accuracySettings = this.config.accuracySettings;
        let numSettings = accuracySettings.length;
        let leastTime = accuracySettings[0].lowerBound == null ?
            accuracySettings[1].lowerBound : accuracySettings[0].lowerBound;
        let greatestTime;
        if (accuracySettings[numSettings - 1].upperBound == null) {
            greatestTime = accuracySettings[numSettings - 2].upperBound;
        } else {
            greatestTime = accuracySettings[numSettings - 1].upperBound;
        }
        return {leastTime: leastTime / 1000, greatestTime: greatestTime / 1000};
    }

    getHittableRange(accuracyRange: { leastTime: number, greatestTime: number }, receptorTimePosition: number) {
        return {
            leastTime: receptorTimePosition + accuracyRange.leastTime,
            greatestTime: receptorTimePosition + accuracyRange.greatestTime
        };
    }

    private getEarliestUnhitNoteIndexInRange(trackNumber: number, noteIndexRange: {startIndex: number, endIndexNotInclusive: number}) {
        for (let i = noteIndexRange.startIndex; i < noteIndexRange.endIndexNotInclusive; i++) {
            if (this.noteManager.tracks[trackNumber][i].state == NoteState.DEFAULT) {
                return i;
            }
        }
        return null;
    }

    getAccuracyEventName(timeDifferenceInMilliseconds: number): string {
        if (this.config.accuracySettings[0].lowerBound == null &&
            timeDifferenceInMilliseconds < this.config.accuracySettings[0].upperBound) {
            return this.config.accuracySettings[0].name; // Handle miss if it exists
        }
        if (this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound == null &&
            timeDifferenceInMilliseconds >= this.config.accuracySettings[this.config.accuracySettings.length - 1].lowerBound) {
            return this.config.accuracySettings[this.config.accuracySettings.length - 1].name; // Handle boo if it exists
        }
        for (let i = 0; i < this.config.accuracySettings.length; i++) {
            let accuracy: Accuracy = this.config.accuracySettings[i];
            if (accuracy.lowerBound != null && accuracy.upperBound != null) {
                if (accuracy.lowerBound < timeDifferenceInMilliseconds && timeDifferenceInMilliseconds <= accuracy.upperBound) {
                    return accuracy.name;
                }
            }
        }
        return "ERROR: Unknown accuracy";
    }

    isConfiguredForBoos(): boolean {
        return this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound == null;
    }

    tryToReleaseNote(currentTimeInSeconds: number, trackNumber: number) {
        let noteIndex = this.getEarliestHittableUnhitNoteIndex(currentTimeInSeconds, trackNumber);
        if (noteIndex != null) {
            let note = this.noteManager.tracks[trackNumber][noteIndex];
            if (note.type == NoteType.TAIL) {
                let hold = this.noteManager.tracks[trackNumber][noteIndex - 1]; // get the hold belonging to this tail
                hold.state = NoteState.HIT; // change the hold state from HELD to HIT
                note.state = NoteState.HIT; // hit the tail of the hold
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                handleAccuracyEvent("Release " + this.getAccuracyEventName(accuracy), trackNumber, accuracy,
                    currentTimeInSeconds, note.type, this.accuracyRecording);
            }
        } else { // let go too early
            // Could this return -1?
            let holdStartIndex = this.noteManager.findIndexOfFirstNoteAfterTime(currentTimeInSeconds, this.noteManager.tracks[trackNumber]);
            let hold = this.noteManager.tracks[trackNumber][holdStartIndex - 1];
            let tail = this.noteManager.tracks[trackNumber][holdStartIndex];
            if (hold.type == NoteType.HOLD_HEAD && tail.type == NoteType.TAIL) {
                this.noteManager.tracks[trackNumber][holdStartIndex - 1].state = NoteState.HIT; // hit the start of the hold
                this.noteManager.tracks[trackNumber][holdStartIndex].state = NoteState.HIT; // hit the tail of the hold
                handleAccuracyEvent("Release " + this.getAccuracyEventName(Infinity), trackNumber, Infinity,
                    currentTimeInSeconds, NoteType.NONE, this.accuracyRecording);
            } else {
                // TODO: It's possible that this is something like a race condition between the key event and the animation loop. Don't throw an error for now
                // throw "Error: Release miss failed to trigger on note index " + (holdStartIndex - 1) + ", track index " + trackNumber + " at time " + currentTimeInSeconds;
            }
        }
    }
}