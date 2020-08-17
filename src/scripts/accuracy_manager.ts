import {NoteManager} from "./note_manager";
import {KeyState, PlayerKeyAction} from "./player_key_action";
import {Config} from "./config";
import {HoldManager} from "./hold_manager";
import {Note, NoteState, NoteType} from "./parsing/parse_sm";
import {AccuracyUtil} from "./accuracy_util";
import {AccuracyEvent} from "./accuracy_event";

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
    private holdManager: HoldManager;
    private config: Config;
    private handleAccuracyEvent: (accuracyEvent: AccuracyEvent) => void;

    constructor(noteManager: NoteManager, config: Config, holdManager: HoldManager,
                handleAccuracyEvent: (accuracyEvent: AccuracyEvent) => void) {
        this.noteManager = noteManager;
        this.config = config;
        this.holdManager = holdManager;
        this.handleAccuracyEvent = handleAccuracyEvent;
    }

    public handlePlayerAction(action: PlayerKeyAction): void {
        if (action.keyState === KeyState.DOWN) {
            this.tryToHitNote(action.gameTime, action.track);
        } else if (action.keyState === KeyState.UP) {
            if (this.holdManager.isTrackHeld(action.track)) {
                this.holdManager.unholdTrack(action.track, action.gameTime);
                this.tryToReleaseNote(action.gameTime, action.track);
            }
        }
    }

    private tryToHitNote(currentTimeInSeconds: number, trackNumber: number) {
        let noteIndex = this.getEarliestHittableUnhitNoteIndex(currentTimeInSeconds, trackNumber);
        if (noteIndex !== null) {
            let note: Note = this.noteManager.tracks[trackNumber][noteIndex];
            if (note.type === NoteType.NORMAL) {
                note.state = NoteState.HIT;
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                this.handleAccuracyEvent({
                    accuracyName: AccuracyUtil.getAccuracyEventName(accuracy, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: accuracy,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: note.type,
                });
            } else if (note.type === NoteType.HOLD_HEAD) {
                note.state = NoteState.HELD; // set the note to held so it won't count as a miss
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                this.handleAccuracyEvent({
                    accuracyName: AccuracyUtil.getAccuracyEventName(accuracy, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: accuracy,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: note.type,
                });
                this.holdManager.holdTrack(trackNumber, currentTimeInSeconds);
            }
        } else if (AccuracyUtil.isConfiguredForBoos(this.config)) {
            this.handleAccuracyEvent({
                accuracyName: AccuracyUtil.getAccuracyEventName(Infinity, this.config),
                trackNumber: trackNumber,
                accuracyMillis: Infinity,
                timeInSeconds: currentTimeInSeconds,
                noteType: NoteType.NONE,
            });
        }
    }

    private getEarliestHittableUnhitNoteIndex(currentTimeInSeconds: number, trackNumber: number) {
        let accuracyRange: { leastTime: number, greatestTime: number } = this.getAccuracyRangeInSeconds();
        let hittableTimeRange: { leastTime: number, greatestTime: number } =
            AccuracyManager.getHittableRange(accuracyRange, currentTimeInSeconds);
        let hittableIndexRange: { startIndex: number, endIndexNotInclusive: number } =
            this.noteManager.getNotesByTimeRange(hittableTimeRange.leastTime, hittableTimeRange.greatestTime, trackNumber);
        return this.getEarliestUnhitNoteIndexInRange(trackNumber, hittableIndexRange);
    }

    private getAccuracyRangeInSeconds() {
        let accuracySettings = this.config.accuracySettings;
        let numSettings = accuracySettings.length;
        let leastTime = accuracySettings[0].lowerBound === null ?
            accuracySettings[1].lowerBound : accuracySettings[0].lowerBound;
        let greatestTime;
        if (accuracySettings[numSettings - 1].upperBound === null) {
            greatestTime = accuracySettings[numSettings - 2].upperBound;
        } else {
            greatestTime = accuracySettings[numSettings - 1].upperBound;
        }
        return {leastTime: leastTime / 1000, greatestTime: greatestTime / 1000};
    }

    private static getHittableRange(accuracyRange: { leastTime: number, greatestTime: number }, receptorTimePosition: number) {
        return {
            leastTime: receptorTimePosition + accuracyRange.leastTime,
            greatestTime: receptorTimePosition + accuracyRange.greatestTime
        };
    }

    private getEarliestUnhitNoteIndexInRange(trackNumber: number, noteIndexRange: { startIndex: number, endIndexNotInclusive: number }) {
        for (let i = noteIndexRange.startIndex; i < noteIndexRange.endIndexNotInclusive; i++) {
            if (this.noteManager.tracks[trackNumber][i].state === NoteState.DEFAULT) {
                return i;
            }
        }
        return null;
    }

    private tryToReleaseNote(currentTimeInSeconds: number, trackNumber: number) {
        let noteIndex = this.getEarliestHittableUnhitNoteIndex(currentTimeInSeconds, trackNumber);
        if (noteIndex !== null) {
            let note = this.noteManager.tracks[trackNumber][noteIndex];
            if (note.type === NoteType.TAIL) {
                let hold = this.noteManager.tracks[trackNumber][noteIndex - 1]; // get the hold belonging to this tail
                hold.state = NoteState.HIT; // change the hold state from HELD to HIT
                note.state = NoteState.HIT; // hit the tail of the hold
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                this.handleAccuracyEvent({
                    accuracyName: AccuracyUtil.getAccuracyEventName(accuracy, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: accuracy,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: note.type,
                });
            }
        } else { // let go too early
            // Could this return -1?
            let holdStartIndex = this.noteManager.findIndexOfFirstNoteAfterTime(currentTimeInSeconds, this.noteManager.tracks[trackNumber]);
            let hold = this.noteManager.tracks[trackNumber][holdStartIndex - 1];
            let tail = this.noteManager.tracks[trackNumber][holdStartIndex];
            if (hold.type === NoteType.HOLD_HEAD && tail.type === NoteType.TAIL) {
                this.noteManager.tracks[trackNumber][holdStartIndex - 1].state = NoteState.HIT; // hit the start of the hold
                this.noteManager.tracks[trackNumber][holdStartIndex].state = NoteState.HIT; // hit the tail of the hold
                this.handleAccuracyEvent({
                    accuracyName: AccuracyUtil.getAccuracyEventName(Infinity, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: Infinity,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: NoteType.NONE,
                });
            } else {
                // TODO: It's possible that this is something like a race condition between the key event and the animation loop. Don't throw an error for now
                // throw "Error: Release miss failed to trigger on note index " + (holdStartIndex - 1) + ", track index " + trackNumber + " at time " + currentTimeInSeconds;
            }
        }
    }
}