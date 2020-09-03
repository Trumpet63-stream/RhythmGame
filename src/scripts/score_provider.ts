import {AccuracyUtil} from "./accuracy_util";
import {AccuracyRecordingEntry} from "./accuracy_recording";
import {Config} from "./config";

export class Score {
    public totalScore: number;
    public percentScore: number;

    constructor(totalScore: number, percentScore: number) {
        this.totalScore = totalScore;
        this.percentScore = percentScore;
    }
}

export class ScoreProvider {
    private config: Config;
    private numNotes: number;

    constructor(config: Config, numNotes: number) {
        this.config = config;
        this.numNotes = numNotes;
    }

    public score(entries: AccuracyRecordingEntry[]): Score {
        let total = 0;
        for (let i = 0; i < entries.length; i++) {
            total += this.scoreEntry(entries[i]);
        }
        let maxScore = this.getMaxScore();
        return new Score(total, total / maxScore * 100);
    }

    public getMaxScore(): number {
        return this.numNotes * this.scoreHit(0);
    }

    public scoreEntry(entry: AccuracyRecordingEntry): number {
        if (AccuracyUtil.eventIsAHit(entry, this.config)) {
            return this.scoreHit(entry.accuracyMillis);
        } else if (AccuracyUtil.eventIsAMiss(entry, this.config)) {
            return this.scoreMiss();
        } else if (AccuracyUtil.eventIsABoo(entry, this.config)) {
            return this.scoreBoo();
        }
        return undefined;
    }

    private scoreHit(accuracyMillis: number) {
        let a: number = 2.0149
        let b: number = 2.9545
        let s: number = 0.0153;
        let sec: number = accuracyMillis / 1000;
        let scale: number = a / s / Math.sqrt(2 * Math.PI);
        let exponent: number = -Math.pow(Math.abs(sec), b) / 2 / s / s;

        return scale * Math.exp(exponent);
    }

    private scoreMiss() {
        return -10;
    }

    private scoreBoo() {
        return -5;
    }
}