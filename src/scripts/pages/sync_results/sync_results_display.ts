import {AccuracyRecording, AccuracyRecordingEntry} from "../../accuracy_recording";
import {DOMWrapper} from "../../dom_wrapper";
import * as p5 from "p5";
import {global} from "../../index";
import {setElementCenterPositionRelative} from "../../ui_util";
import {Accuracy, AccuracyManager} from "../../accuracy_manager";
import {Config} from "../../config";
import {AccuracyUtil} from "../../accuracy_util";

export class SyncResultsDisplay {
    private accuracyRecording: AccuracyRecording;
    private accuracyManager: AccuracyManager;
    private config: Config;
    private averageAccuracy: number;
    private accuracyStdDev: number;
    private recommendedOffsetChangeMillis: number;

    constructor(accuracyRecording: AccuracyRecording, accuracyManager: AccuracyManager, config: Config) {
        this.accuracyRecording = accuracyRecording;
        this.accuracyManager = accuracyManager;
        this.config = config;
        this.calculateResults();
    }

    private calculateResults() {
        let events: AccuracyRecordingEntry[] = this.getAllAccuracyEntries();
        this.ignoreBoos(events);
        this.normalizeMissAccuracy(events);
        this.calculateAverageAccuracy(events);
        this.calculateStandardDeviation(events);
        this.calculateRecommendedOffsetChange();
    }

    private getAllAccuracyEntries() {
        let events: AccuracyRecordingEntry[] = [];
        for (let i = 0; i < this.accuracyRecording.recording.length; i++) {
            let trackEvents: AccuracyRecordingEntry[] = this.accuracyRecording.recording[i];
            for (let j = 0; j < trackEvents.length; j++) {
                events.push(trackEvents[j]);
            }
        }
        return events;
    }

    private ignoreBoos(events: AccuracyRecordingEntry[]) {
        if (!AccuracyUtil.isConfiguredForBoos(this.config)) {
            return;
        }
        let boo: Accuracy = this.getLastAccuracy();
        for (let i = 0; i < events.length; i++) {
            if (events[i].accuracyMillis >= boo.lowerBound) {
                events.splice(i, 1);
                i--;
            }
        }
    }

    private getLastAccuracy(): Accuracy {
        return this.config.accuracySettings[this.config.accuracySettings.length - 1];
    }

    private normalizeMissAccuracy(events: AccuracyRecordingEntry[]) {
        let miss: Accuracy = this.getFirstAccuracy();
        for (let i = 0; i < events.length; i++) {
            if (events[i].accuracyMillis < miss.upperBound) {
                events[i].accuracyMillis = miss.upperBound;
            }
        }
    }

    private getFirstAccuracy(): Accuracy {
        return this.config.accuracySettings[0];
    }

    private calculateAverageAccuracy(events: AccuracyRecordingEntry[]) {
        let sum: number = 0;
        for (let i = 0; i < events.length; i++) {
            sum += events[i].accuracyMillis;
        }
        this.averageAccuracy = sum / events.length;
    }

    private calculateStandardDeviation(events: AccuracyRecordingEntry[]) {
        let differencesSum = 0;
        for (let i = 0; i < events.length; i++) {
            differencesSum += Math.pow(events[i].accuracyMillis - this.averageAccuracy, 2);
        }
        this.accuracyStdDev = Math.sqrt(differencesSum / (events.length - 1));
    }

    private calculateRecommendedOffsetChange() {
        let riskiness: number = this.accuracyStdDev / 2;
        if (Math.abs(this.averageAccuracy) < riskiness) {
            this.recommendedOffsetChangeMillis = 0;
        } else {
            let accuracySign: number = Math.sign(this.averageAccuracy);
            this.recommendedOffsetChangeMillis = this.averageAccuracy - accuracySign * riskiness;
        }
    }

    public draw() {
        let p: p5 = global.p5Scene.sketchInstance;
        let myText = DOMWrapper.create(() => {
            return p.createElement("span");
        }, "text");
        setElementCenterPositionRelative(myText.element, 0.5, 0.5, 300, 37);
        if (!myText.alreadyExists) {
            myText.element.addClass(global.globalClass);
            myText.element.html(this.getAccuracyResultsText());
        }
    }

    private getAccuracyResultsText() {
        let accuracyDirection: string = this.averageAccuracy < 0 ? "(late)" : "(early)";
        return "Average = " +
            SyncResultsDisplay.formatNumber(this.averageAccuracy) + " " + accuracyDirection +
            ", StdDev = " + SyncResultsDisplay.formatNumber(this.accuracyStdDev) +
            "<br> Recommended change: " + this.getRecommendedChangeText();
    }

    private static formatNumber(x: number) {
        return x.toFixed(0) + "ms";
    }

    private getRecommendedChangeText(): string {
        if (Math.round(this.recommendedOffsetChangeMillis) === 0) {
            return "none";
        } else {
            let currentOffset = this.config.additionalOffsetInSeconds * 1000;
            let newOffset = currentOffset + this.recommendedOffsetChangeMillis;
            return SyncResultsDisplay.formatNumber(currentOffset) + " => " + SyncResultsDisplay.formatNumber(newOffset);
        }
    }

    public applyRecommendedChange(): void {
        let newOffsetMillis = Math.round(
            this.config.additionalOffsetInSeconds * 1000 + this.recommendedOffsetChangeMillis);
        this.config.additionalOffsetInSeconds = newOffsetMillis / 1000;
    }
}