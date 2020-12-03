import {AccuracyRecording, AccuracyRecordingEntry} from "./accuracy_recording";
import {AccuracyEvent} from "./accuracy_event";
import {Config} from "./config";
import {AccuracyUtil} from "./accuracy_util";
import {KeyState, PlayerKeyEvent} from "./player_key_action";
import {HoldManager} from "./hold_manager";
import {NoteType} from "./note";

export class ReplayManager {
    private config: Config;
    private accuracyRecording: AccuracyRecording;
    private lastCheckedEventIndices: number[];
    private holdManager: HoldManager;
    private handleAccuracyEvent: (accuracyEvent: AccuracyEvent) => void;
    private handlePlayerKeyEvent: (playerKeyEvent: PlayerKeyEvent) => void;

    constructor(config: Config, accuracyRecording: AccuracyRecording, holdManager: HoldManager,
                handleAccuracyEvent: (accuracyEvent: AccuracyEvent) => void,
                handlePlayerKeyEvent: (playerKeyEvent: PlayerKeyEvent) => void) {
        this.config = config;
        this.accuracyRecording = accuracyRecording;
        this.holdManager = holdManager;
        this.handleAccuracyEvent = handleAccuracyEvent;
        this.handlePlayerKeyEvent = handlePlayerKeyEvent;
        this.lastCheckedEventIndices = [];
        for (let i = 0; i < accuracyRecording.perTrackRecording.length; i++) {
            this.lastCheckedEventIndices.push(0);
        }
    }

    public update(currentTimeInSeconds: number) {
        for (let trackNumber = 0; trackNumber < this.accuracyRecording.perTrackRecording.length; trackNumber++) {
            this.handleAllNewEventsForTrack(trackNumber, currentTimeInSeconds);
        }
    }

    private handleAllNewEventsForTrack(trackNumber: number, currentTimeInSeconds: number) {
        let indexOfLastCheckedEvent = this.lastCheckedEventIndices[trackNumber];
        let trackEvents: AccuracyRecordingEntry[] = this.accuracyRecording.perTrackRecording[trackNumber];
        while (indexOfLastCheckedEvent < trackEvents.length) {
            let currentEvent = trackEvents[indexOfLastCheckedEvent];
            if (currentTimeInSeconds >= currentEvent.timeInSeconds) {
                this.handleNewEvent(currentEvent);
                indexOfLastCheckedEvent++;
            } else {
                break;
            }
        }
        this.lastCheckedEventIndices[trackNumber] = indexOfLastCheckedEvent;
    }

    private handleNewEvent(entry: AccuracyRecordingEntry) {
        if (AccuracyUtil.MISS_ACCURACY_FLAG === entry.accuracyMillis) {
            this.generateAccuracyEvent(entry);
        } else {
            this.generatePlayerKeyEvents(entry);
        }
    }

    private generateAccuracyEvent(entry: AccuracyRecordingEntry) {
        let event: AccuracyEvent = {
            accuracyName: AccuracyUtil.getAccuracyEventName(entry.accuracyMillis, this.config),
            trackNumber: entry.trackNumber,
            noteIndex: entry.noteType,
            timeInSeconds: entry.timeInSeconds,
            accuracyMillis: entry.accuracyMillis,
            noteType: entry.noteType,
        }
        this.handleAccuracyEvent(event);
    }

    private generatePlayerKeyEvents(entry: AccuracyRecordingEntry) {
        if (this.holdManager.isTrackHeld(entry.trackNumber)) {
            this.generateKeyUpEvent(entry);
        } else {
            this.generateKeyDownEvent(entry);
            if (entry.noteType !== NoteType.HOLD_HEAD && entry.noteType !== NoteType.ROLL_HEAD) {
                this.generateKeyUpEvent(entry);
            }
        }
    }

    private generateKeyUpEvent(entry: AccuracyRecordingEntry) {
        let event = new PlayerKeyEvent(entry.timeInSeconds, entry.trackNumber, KeyState.UP);
        this.handlePlayerKeyEvent(event);
    }

    private generateKeyDownEvent(entry: AccuracyRecordingEntry) {
        let event = new PlayerKeyEvent(entry.timeInSeconds, entry.trackNumber, KeyState.DOWN);
        this.handlePlayerKeyEvent(event);
    }
}