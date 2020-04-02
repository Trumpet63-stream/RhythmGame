import {saveAccuracy} from "./util";
import {NoteType} from "./parsing";

export interface AccuracyEvent {
    time: number,
    accuracyInMilliseconds: number,
    noteType: NoteType
}

//TODO: animations for accuracy events
export function handleAccuracyEvent(accuracyName: string, trackNumber: number, accuracy: number, currentTime: number,
                                    noteType: NoteType, accuracyRecording: AccuracyEvent[][]) {
    saveAccuracy(accuracyRecording, trackNumber, accuracy, currentTime, noteType);
    console.log("Track #" + (trackNumber + 1) + " " + accuracyName + (Math.abs(accuracy) == Infinity ? "" : " (" + Math.round(accuracy) + " ms)"));
}