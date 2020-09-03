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
    private pbScore: Score;
    private currentScore: Score;
    // private pbRemainingScore: Score;
    private readonly maxTotalScore: number;
    private trackIndices: number[];
    private readonly scoreProvider: ScoreProvider;
    // private currentPBScore: Score;
    private actualScoreDifference: Score;
    // private previousScoreDifference: Score;
    private drawnScoreDifference: Score;
    private lastDrawTimeInSeconds: number;
    private readonly animationEasing: number = 0.2;
    private readonly g: [number, p5.Color][];
    private readonly bounds: Rectangle;

    constructor(pbReplay: Replay, scoreProvider: ScoreProvider) {
        this.personalBest = AccuracyRecording.ofReplay(pbReplay);
        this.scoreProvider = scoreProvider;
        this.maxTotalScore = scoreProvider.getMaxScore();
        this.trackIndices = [];
        for (let i = 0; i < pbReplay.numTracks; i++) {
            this.trackIndices.push(0);
        }
        this.currentScore = new Score(0, 0);
        this.pbScore = this.scoreProvider.score(this.personalBest.linearRecording);
        this.actualScoreDifference = new Score(0, 0);
        this.drawnScoreDifference = new Score(0, 0);
        this.bounds = Rectangle.fromTopLeft(500, 120, 20, 240);

        let colorUnit = (100 - this.pbScore.percentScore) / 2;
        let p: p5 = global.p5Scene.sketchInstance;
        let gold: p5.Color = p.color(255, 215, 0);
        let green: p5.Color = p.color(0, 240, 0);
        let blue: p5.Color = p.color(46, 108, 199);
        let red: p5.Color = p.color(255, 0, 0);
        let black: p5.Color = p.color(0, 0, 0);
        let g: [number, p5.Color][] = [];
        let current: number = 100;
        g.push([current, gold]);
        current -= colorUnit;
        g.push([current, green]);
        current -= colorUnit;
        g.push([current, blue]);
        current -= 2 * colorUnit;
        g.push([current, red]);
        current -= 2 * colorUnit;
        g.push([current, black]);
        this.g = g;
    }

    public update(accuracyEvent: AccuracyEvent): void {
        let matchingEntry: AccuracyRecordingEntry = this.getMatchingPBEntry(accuracyEvent);
        if (matchingEntry !== undefined) {
            this.updatePBScore(matchingEntry);
        }
        this.updateCurrentScore(accuracyEvent);
        this.updateActualScoreDifference(accuracyEvent.timeInSeconds);
    }

    private getMatchingPBEntry(accuracyEvent: AccuracyEvent) {
        let trackNumber: number = accuracyEvent.trackNumber;
        let noteIndex: number = this.trackIndices[trackNumber];
        while (true) {
            let trackRecording: AccuracyRecordingEntry[] = this.personalBest.perTrackRecording[trackNumber];
            let mostRecentEntry = trackRecording[noteIndex];
            if (mostRecentEntry === undefined) {
                break;
            }
            if (!this.entryIsABoo(mostRecentEntry)) {
                return mostRecentEntry;
            }
            noteIndex++;
        }
        return undefined;
    }

    public draw(currentTimeInSeconds: number): void {
        this.updateTrackIndicesAndHandleBoos(currentTimeInSeconds);
        this.updateDrawnScoreDifference(currentTimeInSeconds);
        this.drawGradient(this.bounds);
        this.drawScoreDifference(this.bounds);
    }

    private drawScoreDifference(bounds: Rectangle) {
        let scoreDifference: string = this.drawnScoreDifference.percentScore.toFixed(2);
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.textSize(20);
        p.fill("white");
        p.text(scoreDifference, bounds.topLeftX + bounds.width + 8, bounds.centerY);
        p.pop();
    }

    private drawGradient(bounds: Rectangle) {
        let low: number = this.drawnScoreDifference.percentScore - 2;
        let high: number = this.drawnScoreDifference.percentScore + 2;
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        for (let y = bounds.topLeftY; y <= bounds.topLeftY + bounds.height; y++) {
            let rectPercent = (y - bounds.topLeftY) / bounds.height;
            let percentScore = lerp(low, high, rectPercent);
            let color = this.getColorForPercent(percentScore);
            p.stroke(color);
            p.line(bounds.topLeftX, y, bounds.topLeftX + bounds.width, y);
        }
        p.pop();
    }

    private getColorForPercent(percentScore: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        for (let i = 1; i < this.g.length; i++) {
            if (this.g[i - 1][0] <= percentScore && percentScore <= this.g[i][0]) {
                let ratio: number = (percentScore - this.g[i][0]) / (this.g[i - 1][0] - this.g[i][0]);
                return p.lerpColor(this.g[i][1], this.g[i - 1][1], ratio);
            }
        }
        // return this.g[this.g.length - 1][1];
        return p.color("white");
    }

    private updateDrawnScoreDifference(currentTimeInSeconds: number) {
        let timeDifferenceInSeconds = currentTimeInSeconds - this.lastDrawTimeInSeconds;
        let ratio: number = timeDifferenceInSeconds / this.animationEasing;
        this.drawnScoreDifference.percentScore =
            lerp(this.drawnScoreDifference.percentScore, this.actualScoreDifference.percentScore, ratio);
        this.drawnScoreDifference.totalScore =
            lerp(this.drawnScoreDifference.totalScore, this.actualScoreDifference.totalScore, ratio);
    }

    // private getAnimationRatio(timeDifferenceInSeconds: number) {
    //     return 1 / (1 + Math.exp(-5 * (timeDifferenceInSeconds - 1)));
    // }

    private updateTrackIndicesAndHandleBoos(currentTimeInSeconds: number) {
        for (let trackNumber = 0; trackNumber < this.trackIndices.length; trackNumber++) {
            this.updateTrackIndex(currentTimeInSeconds, trackNumber);
        }
    }

    private updateTrackIndex(currentTimeInSeconds: number, trackNumber: number) {
        while (true) {
            let mostRecentEntry = this.getMostRecentEntryInPB(trackNumber);
            if (mostRecentEntry === undefined) {
                break;
            }
            if (mostRecentEntry.timeInSeconds < currentTimeInSeconds) {
                if (this.entryIsABoo(mostRecentEntry)) {
                    this.updatePBScore(mostRecentEntry);
                    this.updateActualScoreDifference(currentTimeInSeconds);
                }
            } else {
                break;
            }
            this.skipToNextEntry(trackNumber);
        }
    }

    private getMostRecentEntryInPB(trackNumber: number) {
        let noteIndex: number = this.trackIndices[trackNumber];
        let trackRecording: AccuracyRecordingEntry[] = this.personalBest.perTrackRecording[trackNumber];
        return trackRecording[noteIndex];
    }

    private entryIsABoo(mostRecentEntry: AccuracyRecordingEntry): boolean {
        return mostRecentEntry.accuracyMillis === Infinity;
    }

    private updatePBScore(entry: AccuracyRecordingEntry) {
        this.updateScore(this.pbScore, entry);
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
        // this.previousScoreDifference = new Score(this.actualScoreDifference.totalScore, this.actualScoreDifference.percentScore)
        this.actualScoreDifference.totalScore = this.currentScore.totalScore - this.pbScore.totalScore;
        this.actualScoreDifference.percentScore = this.currentScore.percentScore - this.pbScore.percentScore;
        // this.lastDifferenceUpdateTime = currentTimeInSeconds;
    }

    private skipToNextEntry(trackNumber: number) {
        this.trackIndices[trackNumber]++;
    }
}