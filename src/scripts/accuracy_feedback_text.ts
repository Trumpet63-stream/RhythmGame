import * as p5 from "p5";
import {global} from "./index";
import {AccuracyRecording, AccuracyRecordingEntry} from "./accuracy_recording";
import {Config} from "./config";
import {AccuracyUtil} from "./accuracy_util";

export class AccuracyFeedbackText {
    private accuracyRecording: AccuracyRecording;
    private centerX: number;
    private centerY: number;
    private config: Config;

    constructor(accuracyRecording: AccuracyRecording, centerX: number, centerY: number, config: Config) {
        this.accuracyRecording = accuracyRecording;
        this.centerX = centerX;
        this.centerY = centerY;
        this.config = config;
    }

    public draw(currentTimeInSeconds: number) {
        let lastEvent: AccuracyRecordingEntry = this.getMostRecentAccuracyRecordingEntry();
        if (lastEvent === null) {
            return;
        }
        let timeSinceLastEvent = currentTimeInSeconds - lastEvent.timeInSeconds;
        let textSize = AccuracyFeedbackText.getFontSize(timeSinceLastEvent);
        if (textSize <= 0) {
            return;
        }
        let eventName = AccuracyUtil.getAccuracyEventName(lastEvent.accuracyMillis, this.config);
        this.drawEventText(eventName, textSize);
    }

    private getMostRecentAccuracyRecordingEntry(): AccuracyRecordingEntry {
        let mostRecentTrack: AccuracyRecordingEntry[] = [];
        let greatestTime = Number.NEGATIVE_INFINITY;
        for (let trackNumber = 0; trackNumber < this.accuracyRecording.recording.length; trackNumber++) {
            let track = this.accuracyRecording.recording[trackNumber];
            if (track.length > 0) {
                let lastEventTime = this.accuracyRecording.recording[trackNumber][track.length - 1].timeInSeconds;
                if (lastEventTime > greatestTime) {
                    greatestTime = lastEventTime;
                    mostRecentTrack = track;
                }
            }
        }
        if (mostRecentTrack.length === 0) {
            return null;
        }
        return mostRecentTrack[mostRecentTrack.length - 1];
    }

    private static getFontSize(time: number): number {
        let maxFontSize = 30;
        if (time < 0.1) {
            return time / 0.1 * maxFontSize;
        } else if (time >= 0.1 && time < 0.4) {
            return maxFontSize;
        } else if (time >= 0.4 && time < 0.7) {
            return (1 - (time - 0.4) / (0.7 - 0.4)) * maxFontSize;
        }
        return 0;
    }

    private drawEventText(text: string, textSize: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.textAlign(p.CENTER, p.CENTER);
        p.fill("white");
        p.textSize(textSize);
        p.text(text, this.centerX, this.centerY);
        p.pop();
    }
}
