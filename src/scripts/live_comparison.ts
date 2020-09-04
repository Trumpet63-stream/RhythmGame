import {AccuracyObserver} from "./accuracy_observer";
import {Drawable} from "./drawable";
import {AccuracyEvent} from "./accuracy_event";
import {AccuracyRecording, AccuracyRecordingEntry, Replay} from "./accuracy_recording";
import {Score, ScoreProvider} from "./score_provider";
import {lerp} from "./util";
import * as p5 from "p5";
import {global} from "./index";
import {Rectangle} from "./rectangle";

export interface LiveComparisonEvent {
    isPositive: boolean;
    timeInSeconds: number;
}

/* The live comparison waits for an accuracy event from the user before deciding whether they are behind or ahead of
 the compared score, with exception to boos */
export class LiveComparison implements AccuracyObserver, Drawable {
    private readonly personalBest: AccuracyRecording;
    private currentPBScore: Score;
    private currentScore: Score;
    private readonly maxTotalScore: number;
    private readonly scoreProvider: ScoreProvider;
    private actualScoreDifference: Score;
    private drawnScoreDifference: Score;
    private lastDrawTimeInSeconds: number = 0;
    private readonly animationEasing: number = 0.2;
    private readonly spectrum: { percentScore: number, color: p5.Color }[];
    private readonly bounds: Rectangle;

    constructor(pbReplay: Replay, scoreProvider: ScoreProvider) {
        this.personalBest = AccuracyRecording.ofReplay(pbReplay);
        this.scoreProvider = scoreProvider;
        this.maxTotalScore = scoreProvider.getMaxScore();
        this.currentScore = new Score(0, 0);
        this.currentPBScore = new Score(0, 0);
        this.actualScoreDifference = new Score(0, 0);
        this.drawnScoreDifference = new Score(0, 0);
        this.bounds = Rectangle.fromTopLeft(520, 110, 20, 240);

        let pbScore: Score = scoreProvider.score(this.personalBest.linearRecording);
        let colorUnit = (100 - pbScore.percentScore) / 2;
        let p: p5 = global.p5Scene.sketchInstance;
        let gold: p5.Color = p.color(255, 215, 0);
        let green: p5.Color = p.color(0, 199, 43);
        let blue: p5.Color = p.color(46, 108, 199);
        let red: p5.Color = p.color(255, 0, 0);
        let black: p5.Color = p.color(0, 0, 0);
        let spectrum: { percentScore: number, color: p5.Color }[] = [];
        let percent: number = 2 * colorUnit;
        spectrum.push({percentScore: percent, color: gold});
        percent -= colorUnit;
        spectrum.push({percentScore: percent, color: green});
        percent -= colorUnit;
        spectrum.push({percentScore: percent, color: blue});
        percent -= 2 * colorUnit;
        spectrum.push({percentScore: percent, color: red});
        percent -= 2 * colorUnit;
        spectrum.push({percentScore: percent, color: black});
        this.spectrum = spectrum;
    }

    public update(accuracyEvent: AccuracyEvent): void {
        if (!this.entryIsABoo(accuracyEvent)) {
            let matchingEntry: AccuracyRecordingEntry = this.removeMatchingPBEntry(accuracyEvent);
            if (matchingEntry !== undefined) {
                this.updatePBScore(matchingEntry);
            } else {
                console.error("@" +
                    accuracyEvent.timeInSeconds.toFixed(3) +
                    "s No matching entry found: track " +
                    accuracyEvent.trackNumber);
            }
        }
        this.updateCurrentScore(accuracyEvent);
        this.updateActualScoreDifference(accuracyEvent.timeInSeconds);
    }

    private removeMatchingPBEntry(accuracyEvent: AccuracyEvent) {
        let trackNumber: number = accuracyEvent.trackNumber;
        let noteIndex: number = 0;
        while (true) {
            let trackRecording: AccuracyRecordingEntry[] = this.personalBest.perTrackRecording[trackNumber];
            let mostRecentEntry = trackRecording[noteIndex];
            if (mostRecentEntry === undefined) {
                break;
            }
            if (!this.entryIsABoo(mostRecentEntry)) {
                trackRecording.splice(noteIndex, 1);
                return mostRecentEntry;
            }
            noteIndex++;
        }
        return undefined;
    }

    public draw(currentTimeInSeconds: number): void {
        this.handleBoos(currentTimeInSeconds);
        this.updateDrawnScoreDifference(currentTimeInSeconds);
        this.drawGradient();
        this.drawTickMarks();
        this.drawMeterNeedle();
        this.drawScoreDifference();
        this.lastDrawTimeInSeconds = currentTimeInSeconds;
    }

    private drawMeterNeedle() {
        let p: p5 = global.p5Scene.sketchInstance;
        let width = 120;
        let height = width / 430 * 120;
        let rect = Rectangle.fromTopLeft(
            this.bounds.topLeftX + this.bounds.width / 2,
            this.bounds.centerY - height / 2,
            width,
            height
        );
        p.image(global.meterNeedle, rect.topLeftX, rect.topLeftY, rect.width, rect.height);
    }

    private drawScoreDifference() {
        let scoreDifference: string = this.formatNumber(this.drawnScoreDifference.percentScore);
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.textFont(global.meterFont, 18);
        p.fill("white");
        p.textAlign(p.LEFT, p.CENTER);
        p.text(scoreDifference, this.bounds.topLeftX + this.bounds.width + 18, this.bounds.centerY - 2);
        p.pop();
    }

    private drawGradient() {
        let low: number = this.drawnScoreDifference.percentScore - 2;
        let high: number = this.drawnScoreDifference.percentScore + 2;
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        for (let y = this.bounds.topLeftY; y <= this.bounds.topLeftY + this.bounds.height; y++) {
            // bottom is 0%, top is 100%
            let rectPercent = 1 - (y - this.bounds.topLeftY) / this.bounds.height;
            let percentScore = lerp(low, high, rectPercent);
            let color = this.getColorForPercent(percentScore);
            p.stroke(color);
            p.line(this.bounds.topLeftX, y, this.bounds.topLeftX + this.bounds.width, y);
        }
        p.pop();
    }

    private drawTickMarks() {
        let low: number = this.drawnScoreDifference.percentScore - 2;
        let high: number = this.drawnScoreDifference.percentScore + 2;
        let ticksToDraw: number[] = [];
        let x = Math.ceil(low);
        while (x < high) {
            ticksToDraw.push(x);
            x++;
        }

        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.textSize(11);
        p.fill("white");
        p.textAlign(p.LEFT, p.CENTER);
        p.stroke("white");
        for (let i = 0; i < ticksToDraw.length; i++) {
            let percentScore: number = ticksToDraw[i];
            // bottom is 0%, top is 100%
            let ratio: number = (percentScore - low) / (high - low);
            let y = lerp(this.bounds.topLeftY + this.bounds.height, this.bounds.topLeftY, ratio);

            p.line(this.bounds.topLeftX, y, this.bounds.topLeftX + this.bounds.width, y);
            p.text(this.formatNumber(percentScore), this.bounds.topLeftX + this.bounds.width + 2, y);
        }
        p.pop();
    }

    private formatNumber(x: number): string {
        let s: string = x.toFixed(2) + "%";
        if (x > 0) {
            s = "+" + s;
        }
        return s;
    }

    private getColorForPercent(percentScore: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        for (let i = 1; i < this.spectrum.length; i++) {
            let upper = this.spectrum[i - 1];
            let lower = this.spectrum[i];
            if (lower.percentScore <= percentScore && percentScore <= upper.percentScore) {
                let ratio: number = (percentScore - lower.percentScore) / (upper.percentScore - lower.percentScore);
                return p.lerpColor(lower.color, upper.color, ratio);
            }
        }
        return this.spectrum[this.spectrum.length - 1].color;
    }

    private updateDrawnScoreDifference(currentTimeInSeconds: number) {
        let timeDifferenceInSeconds = currentTimeInSeconds - this.lastDrawTimeInSeconds;
        let ratio: number = timeDifferenceInSeconds / this.animationEasing;
        this.drawnScoreDifference.percentScore =
            lerp(this.drawnScoreDifference.percentScore, this.actualScoreDifference.percentScore, ratio);
        this.drawnScoreDifference.totalScore =
            lerp(this.drawnScoreDifference.totalScore, this.actualScoreDifference.totalScore, ratio);
    }

    private handleBoos(currentTimeInSeconds: number) {
        for (let trackNumber = 0; trackNumber < this.personalBest.perTrackRecording.length; trackNumber++) {
            this.handleBoosForTrack(currentTimeInSeconds, trackNumber);
        }
    }

    private handleBoosForTrack(currentTimeInSeconds: number, trackNumber: number) {
        let noteIndex: number = 0;
        while (true) {
            let trackRecording: AccuracyRecordingEntry[] = this.personalBest.perTrackRecording[trackNumber];
            let mostRecentEntry = trackRecording[noteIndex];
            if (mostRecentEntry === undefined) {
                break;
            }
            if (mostRecentEntry.timeInSeconds < currentTimeInSeconds) {
                if (this.entryIsABoo(mostRecentEntry)) {
                    this.updatePBScore(mostRecentEntry);
                    this.updateActualScoreDifference(currentTimeInSeconds);
                    trackRecording.splice(noteIndex, 1);
                    noteIndex--;
                }
            } else {
                break;
            }
            noteIndex++;
        }
    }

    private entryIsABoo(mostRecentEntry: AccuracyRecordingEntry): boolean {
        return mostRecentEntry.accuracyMillis === Infinity;
    }

    private updatePBScore(entry: AccuracyRecordingEntry) {
        this.updateScore(this.currentPBScore, entry);
    }

    private updateCurrentScore(entry: AccuracyRecordingEntry) {
        this.updateScore(this.currentScore, entry);
    }

    private updateScore(score: Score, entry: AccuracyRecordingEntry) {
        let totalScoreChange: number = this.scoreProvider.scoreEntry(entry);
        let percentScoreChange: number = 100 * totalScoreChange / this.maxTotalScore;
        score.totalScore -= totalScoreChange;
        score.percentScore -= percentScoreChange;
    }

    private updateActualScoreDifference(currentTimeInSeconds: number) {
        this.actualScoreDifference.totalScore = this.currentPBScore.totalScore - this.currentScore.totalScore;
        this.actualScoreDifference.percentScore = this.currentPBScore.percentScore - this.currentScore.percentScore;
    }
}