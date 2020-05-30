import {DisplayManager} from "./display_manager";
import {AccuracyRecordingEntry, AccuracyRecording} from "./accuracy_recording";
import {Config} from "./config";
import * as p5 from "p5";
import {global} from "./index";
import {Accuracy} from "./accuracy_manager";

export class AccuracyFeedbackFlash {
    private accuracyRecording: AccuracyRecording;
    private config: Config;
    private displayManager: DisplayManager;
    private numTracks: number;
    private numColoredAccuracyRanks: number;
    private static flashDurationInSeconds: number = 0.1;
    private accuracyColors: [number, number, number, number][];

    constructor(accuracyRecording: AccuracyRecording, config: Config, displayManager: DisplayManager, numTracks: number) {
        this.accuracyRecording = accuracyRecording;
        this.config = config;
        this.displayManager = displayManager;
        this.numTracks = numTracks;
        this.numColoredAccuracyRanks = this.getNumColoredAccuracyRanks(this.config.accuracySettings);
        this.accuracyColors = [
            [178, 94, 247, 180],
            [30, 217, 124, 160],
            [196, 199, 30, 140],
            [245, 213, 221, 120]
        ];
        while (this.numColoredAccuracyRanks > this.accuracyColors.length) {
            this.accuracyColors.push(
                [this.getRandomInt(255), this.getRandomInt(255), this.getRandomInt(255), 100]
            );
        }
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    public draw(currentTimeInSeconds: number) {
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            this.drawFlashForTrack(trackNumber, currentTimeInSeconds);
        }
    }

    private drawFlashForTrack(trackNumber: number, currentTimeInSeconds: number) {
        let mostRecentAccuracyRecordingEntry = this.getTrackMostRecentAccuracyRecordingEntry(trackNumber);
        if (this.isFlashHappening(currentTimeInSeconds, mostRecentAccuracyRecordingEntry)) {
            let centerX = this.displayManager.getNoteCenterX(trackNumber, this.numTracks);
            let centerY = this.displayManager.getNoteCenterY(currentTimeInSeconds, currentTimeInSeconds);
            let flashColor: p5.Color = this.getFlashColor(mostRecentAccuracyRecordingEntry);
            let elapsedTimeInSeconds = this.getElapsedTimeInSeconds(currentTimeInSeconds, mostRecentAccuracyRecordingEntry);
            this.drawFlash(elapsedTimeInSeconds, centerX, centerY, flashColor);
        }
    }

    private isFlashHappening(currentTimeInSeconds: number, accuracyEvent: AccuracyRecordingEntry) {
        if (accuracyEvent === null) {
            return false;
        }

        let accuracies = this.config.accuracySettings;
        if (accuracies[0].lowerBound == null &&
            accuracyEvent.accuracyMillis < accuracies[0].upperBound) {
            return false; // Handle miss if it exists
        }
        if (accuracies[accuracies.length - 1].upperBound == null &&
            accuracyEvent.accuracyMillis >= accuracies[accuracies.length - 1].lowerBound) {
            return false; // Handle boo if it exists
        }

        let elapsedTimeInSeconds = this.getElapsedTimeInSeconds(currentTimeInSeconds, accuracyEvent);
        if (elapsedTimeInSeconds > AccuracyFeedbackFlash.flashDurationInSeconds) {
            return false;
        }

        return true;
    }

    private getElapsedTimeInSeconds(currentTimeInSeconds: number, accuracyEvent: AccuracyRecordingEntry) {
        return currentTimeInSeconds - accuracyEvent.timeInSeconds;
    }

    private getTrackMostRecentAccuracyRecordingEntry(trackNumber: number): AccuracyRecordingEntry {
        let track = this.accuracyRecording.recording[trackNumber];
        if (track.length > 0) {
            return this.accuracyRecording.recording[trackNumber][track.length - 1];
        } else {
            return null;
        }
    }

    // Assumes symmetrical accuracy settings
    private getFlashColor(accuracyEvent: AccuracyRecordingEntry) {
        let accuracies = this.config.accuracySettings;
        let accuracyRank = this.getAccuracyRank(accuracyEvent, accuracies);
        let colorValues = this.accuracyColors[accuracyRank - 1];
        let p: p5 = global.p5Scene.sketchInstance;
        return p.color(colorValues[0], colorValues[1], colorValues[2], colorValues[3]);
    }

    // Assumes symmetrical accuracy settings
    private getNumColoredAccuracyRanks(accuracies: Accuracy[]) {
        let bestAccuracyIndex = this.getBestAccuracyIndex(accuracies);
        let numRanks = 1; // start with 1 because we at least have the best rank
        for (let i = bestAccuracyIndex + 1; i < accuracies.length; i++) {
            let accuracy: Accuracy = accuracies[i];
            if (accuracy.lowerBound !== undefined && accuracy.upperBound !== undefined) {
                numRanks++;
            }
        }
        return numRanks
    }

    private getBestAccuracyIndex(accuracies: Accuracy[]) {
        for (let i = 0; i < accuracies.length; i++) {
            let accuracy: Accuracy = accuracies[i];
            if (accuracy.lowerBound < 0 && 0 <= accuracy.upperBound) {
                return i;
            }
        }
        return null;
    }

    // Returns a rank where 1 is the best
    private getAccuracyRank(accuracyEvent: AccuracyRecordingEntry, accuracies: Accuracy[]) {
        if (accuracyEvent.accuracyMillis < 0) {
            accuracies = this.getReversed(accuracies);
        }
        let bestAccuracyIndex = this.getBestAccuracyIndex(accuracies);
        let currentRank = 1;
        for (let i = bestAccuracyIndex; i < accuracies.length; i++) {
            let accuracy = accuracies[i];
            if (accuracy.lowerBound < accuracyEvent.accuracyMillis && accuracyEvent.accuracyMillis <= accuracy.upperBound) {
                return currentRank;
            }
            currentRank++;
        }
    }

    private getReversed(array: any[]) {
        let arrayCopy: any[] = [];
        for (let i = array.length - 1; i >= 0; i--) {
            arrayCopy.push(array[i]);
        }
        return arrayCopy;
    }

    private drawFlash(elapsedTimeInSeconds: number, centerX: number, centerY: number, color: p5.Color) {
        let p: p5 = global.p5Scene.sketchInstance;
        let flashSize: number = this.getFlashSize(elapsedTimeInSeconds, AccuracyFeedbackFlash.flashDurationInSeconds);
        p.push();
        p.translate(centerX, centerY);
        p.fill(color);
        // p.fill(255, 255, 255, 150);
        p.noStroke();
        this.drawStar(p, 0, 0, flashSize, flashSize * 0.4, 4);
        p.pop();
    }

    private getFlashSize(elapsedTimeInSeconds: number, flashDurationInSeconds: number) {
        let flashCompletionRatio = elapsedTimeInSeconds / flashDurationInSeconds;
        let minSize = 0;
        let maxSize = this.config.noteSize;
        return this.interpolate(minSize, maxSize, flashCompletionRatio);
    }

    private interpolate(minValue: number, maxValue: number, ratio: number) {
        if (ratio <= 0) {
            return minValue;
        } else if (ratio > 0 && ratio < 1) {
            return minValue + (maxValue - minValue) * ratio;
        } else {
            return maxValue;
        }
    }

    private drawStar(p: p5, centerX: number, centerY: number, radius1: number, radius2: number, npoints: number) {
        p.push();
        p.angleMode(p.RADIANS);
        let angle = p.TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += angle) {
            let sx = centerX + p.cos(a) * radius2;
            let sy = centerY + p.sin(a) * radius2;
            p.vertex(sx, sy);
            sx = centerX + p.cos(a + halfAngle) * radius1;
            sy = centerY + p.sin(a + halfAngle) * radius1;
            p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
        p.pop();
    }
}
