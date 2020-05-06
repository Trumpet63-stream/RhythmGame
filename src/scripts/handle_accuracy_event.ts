import {NoteType} from "./parsing";
import {AccuracyRecording} from "./accuracy_recording";

//TODO: animations for accuracy events
export function handleAccuracyEvent(accuracyName: string, trackNumber: number, accuracy: number, currentTime: number,
                                    noteType: NoteType, accuracyRecording: AccuracyRecording) {
    accuracyRecording.recordAccuracyEvent(trackNumber, accuracy, currentTime, noteType);
    console.log("Track #" + (trackNumber + 1) + " " + accuracyName +
        (Math.abs(accuracy) == Infinity ? "" : " (" + Math.round(accuracy) + " ms)"));
}
