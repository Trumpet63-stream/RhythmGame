import {NoteManager} from "../../note_manager";
import {AccuracyObserver} from "../../accuracy_observer";
import {Drawable} from "../../drawable";
import {AccuracyEvent} from "../../accuracy_event";
import {Note, NoteState, NoteType} from "../../note";
import {clampValueToRange, getEmpty2dArray, getRandomIntInclusive, mean, stdDev} from "../../util";
import {global} from "../../index";
import * as p5 from "p5";
import {ScoreProvider} from "../../score_provider";
import {AccuracyUtil} from "../../accuracy_util";
import {Config} from "../../config";
import {NpsGraph} from "../../nps_graph";
import {ExponentialGraph} from "../../exponential_graph";

export class NoteGenerator implements AccuracyObserver, Drawable {
    private noteManager: NoteManager;
    private numTracks: number = 4;
    private lastNoteTimeInSeconds: number = 1.0;
    private maxNoteSpacingInSeconds: number = 2;
    private targetNoteSpacingInSeconds: number;
    private currentNoteSpacingInSeconds: number;
    private lastDrawTimeInSeconds: number = 0;
    private readonly maxNpsChangePerSecond: number = 0.3;
    private lastNoteTrack: number = -1;
    private scoreProvider: ScoreProvider;
    private scoreMemory: number[];
    private accuracyMemory: number[];
    private npsMemory: number[][]
    private config: Config;
    private generatorState: number = 0;
    private graph: NpsGraph;
    private recording: any[];
    private generationMode = 1;
    private a: number = 20;
    private b: number = 1.5;
    private c: number = -0.28;
    private dataBuckets: any[];
    private dataBucketStep: number = 1;
    private maxBucketSize: number = 40;
    private exponentialModelGraph: ExponentialGraph;
    private currentPattern: number[] = [1, 2, 0, 3, 2];
    private currentPatternIndex: number = -1;
    private numPatternIterations = -1;

    constructor(noteManager: NoteManager) {
        this.noteManager = noteManager;
        this.targetNoteSpacingInSeconds = this.maxNoteSpacingInSeconds;
        this.currentNoteSpacingInSeconds = this.maxNoteSpacingInSeconds;
        this.scoreProvider = new ScoreProvider(global.config, undefined);
        this.scoreMemory = [];
        this.accuracyMemory = [];
        this.npsMemory = getEmpty2dArray(this.numTracks);
        this.config = global.config;
        this.graph = new NpsGraph();
        this.recording = []
        global.saveToFile = this.saveToFile.bind(this);
        this.dataBuckets = [{range: {lowerBound: 0.5, upperBound: 0.5 + this.dataBucketStep}, data: []}];
        this.exponentialModelGraph = new ExponentialGraph();
    }

    private saveToFile(filename = "temp.csv") {
        let file = new Blob([this.recording.join("\n")], {type: "string"});
        let a = document.createElement("a");
        let url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    public update(accuracyEvent: AccuracyEvent): void {
        switch (this.generationMode) {
            case 0:
                this.mode0(accuracyEvent);
                break;
            case 1:
                this.mode1(accuracyEvent);
                break;
            case 2:
                this.mode2(accuracyEvent);
                break
        }
    }

    private mode0(accuracyEvent: AccuracyEvent): void {
        if (!AccuracyUtil.eventIsABoo(accuracyEvent, this.config)) {
            let eventNps: number = this.npsMemory[accuracyEvent.trackNumber].shift();
            let eventScore: number = this.scoreProvider.scoreEntry(accuracyEvent);
            let recordString = accuracyEvent.noteIndex + "," + accuracyEvent.trackNumber + "," +
                accuracyEvent.timeInSeconds + "," + accuracyEvent.accuracyName + "," +
                accuracyEvent.accuracyMillis + "," + eventScore + "," + eventNps;
            this.recording.push(recordString);
            this.graph.addDataPoint(accuracyEvent.timeInSeconds, eventNps);
            // console.log(eventNps.toFixed(4) + "," + eventScore.toFixed(4));
            this.scoreMemory.push(eventScore);
            let maxLength = 5;
            if (this.scoreMemory.length > maxLength) {
                this.scoreMemory.shift();
            }
            let averageScore = mean(this.scoreMemory);
            let hardScore = 45;

            let noteSpacingDelta = 0;

            switch (this.generatorState) {
                case 0: // initial speedup
                    if (averageScore > hardScore || this.scoreMemory.length < maxLength) {
                        noteSpacingDelta -= this.targetNoteSpacingInSeconds * 0.05 * this.targetNoteSpacingInSeconds;
                    } else {
                        this.generatorState = 1;
                    }
                    break;
                case 1: // slowdown
                    if (averageScore <= hardScore) {
                        noteSpacingDelta += this.targetNoteSpacingInSeconds * 0.1 * this.targetNoteSpacingInSeconds;
                    } else {
                        this.generatorState = 2;
                    }
                    break;
                case 2: // normal speedup
                    if (averageScore > hardScore) {
                        noteSpacingDelta -= this.targetNoteSpacingInSeconds * 0.05 * this.targetNoteSpacingInSeconds;
                    } else {
                        this.generatorState = 1;
                    }
                    break;
            }

            this.targetNoteSpacingInSeconds += noteSpacingDelta;
            if (this.targetNoteSpacingInSeconds > this.maxNoteSpacingInSeconds) {
                this.targetNoteSpacingInSeconds = this.maxNoteSpacingInSeconds;
            }
        }
    }

    private mode1(accuracyEvent: AccuracyEvent): void {
        if (!AccuracyUtil.eventIsABoo(accuracyEvent, this.config)) {
            let eventNps: number = this.npsMemory[accuracyEvent.trackNumber].shift();
            let eventScore: number = this.scoreProvider.scoreEntry(accuracyEvent);
            let recordString = accuracyEvent.noteIndex + "," + accuracyEvent.trackNumber + "," +
                accuracyEvent.timeInSeconds + "," + accuracyEvent.accuracyName + "," +
                accuracyEvent.accuracyMillis + "," + eventScore + "," + eventNps;
            this.recording.push(recordString);
            this.graph.addDataPoint(accuracyEvent.timeInSeconds, eventNps);
            let accuracyMillis: number = accuracyEvent.accuracyMillis;
            if (accuracyMillis === -Infinity) {
                accuracyMillis = AccuracyUtil.getLatestMillis(this.config);
            }
            this.addToBucket(eventNps, accuracyMillis);

            this.scoreMemory.push(accuracyMillis);
            let maxLength: number = 15;
            if (this.scoreMemory.length > maxLength) {
                this.scoreMemory.shift();
            }

            let modelsToTry = [
                {a: this.a, b: this.b, c: this.c},
                {a: this.a * 1.005, b: this.b, c: this.c},
                {a: this.a, b: this.b * 1.005, c: this.c},
                {a: this.a, b: this.b, c: this.c * 1.001},
                {a: this.a * 0.995, b: this.b, c: this.c},
                {a: this.a, b: this.b * 0.995, c: this.c},
                {a: this.a, b: this.b, c: this.c * 0.999}
            ]
            let bestModel = modelsToTry[0];
            let bestError = this.getError();
            let bestIndex = 0;
            for (let i = 1; i < modelsToTry.length; i++) {
                let currentModel: any = modelsToTry[i];
                let currentError: number = this.getError(currentModel);
                if (currentError < bestError) {
                    bestError = currentError;
                    bestModel = currentModel;
                    bestIndex = i;
                }
            }
            this.a = bestModel.a;
            this.b = bestModel.b;
            this.c = bestModel.c;
            this.exponentialModelGraph.setDataBuckets(this.dataBuckets);
            this.exponentialModelGraph.setModelParameters(this.a, this.b, this.c);

            let hardStdDev = 35;
            let targetNps = this.inverseModel(hardStdDev);

            if (this.accuracyMemory.length === maxLength) {
                let currentStdDev = stdDev(this.accuracyMemory);
                let expectedStdDev = this.exponentialModel(eventNps);
                if (currentStdDev != expectedStdDev) {
                    console.log(targetNps, this.inverseModel(currentStdDev));
                    targetNps += (targetNps - this.inverseModel(currentStdDev)) / 2;
                }
            }
            targetNps = clampValueToRange(targetNps, 0.5, 30);
            this.targetNoteSpacingInSeconds = 1 / targetNps;
        }
    }

    private mode2(accuracyEvent: AccuracyEvent): void {
        if (!AccuracyUtil.eventIsABoo(accuracyEvent, this.config)) {
            let eventNps: number = this.npsMemory[accuracyEvent.trackNumber].shift();
            let eventScore: number = this.scoreProvider.scoreEntry(accuracyEvent);
            let recordString = accuracyEvent.noteIndex + "," + accuracyEvent.trackNumber + "," +
                accuracyEvent.timeInSeconds + "," + accuracyEvent.accuracyName + "," +
                accuracyEvent.accuracyMillis + "," + eventScore + "," + eventNps;
            this.recording.push(recordString);
            this.graph.addDataPoint(accuracyEvent.timeInSeconds, eventNps);
            let accuracyMillis: number = accuracyEvent.accuracyMillis;
            if (accuracyMillis === -Infinity) {
                accuracyMillis = AccuracyUtil.getLatestMillis(this.config);
            }
            this.addToBucket(eventNps, accuracyMillis);

            this.scoreMemory.push(accuracyMillis);
            let maxLength: number = 15;
            if (this.scoreMemory.length > maxLength) {
                this.scoreMemory.shift();
            }

            let modelsToTry = [
                {a: this.a, b: this.b, c: this.c},
                {a: this.a * 1.005, b: this.b, c: this.c},
                {a: this.a, b: this.b * 1.005, c: this.c},
                {a: this.a, b: this.b, c: this.c * 1.001},
                {a: this.a * 0.995, b: this.b, c: this.c},
                {a: this.a, b: this.b * 0.995, c: this.c},
                {a: this.a, b: this.b, c: this.c * 0.999}
            ]
            let bestModel = modelsToTry[0];
            let bestError = this.getError();
            let bestIndex = 0;
            for (let i = 1; i < modelsToTry.length; i++) {
                let currentModel: any = modelsToTry[i];
                let currentError: number = this.getError(currentModel);
                if (currentError < bestError) {
                    bestError = currentError;
                    bestModel = currentModel;
                    bestIndex = i;
                }
            }
            this.a = bestModel.a;
            this.b = bestModel.b;
            this.c = bestModel.c;
            this.exponentialModelGraph.setDataBuckets(this.dataBuckets);
            this.exponentialModelGraph.setModelParameters(this.a, this.b, this.c);

            let hardStdDev = 35;
            let targetNps = this.inverseModel(hardStdDev);

            if (this.accuracyMemory.length === maxLength) {
                let currentStdDev = stdDev(this.accuracyMemory);
                let expectedStdDev = this.exponentialModel(eventNps);
                if (currentStdDev != expectedStdDev) {
                    console.log(targetNps, this.inverseModel(currentStdDev));
                    targetNps += (targetNps - this.inverseModel(currentStdDev)) / 2;
                }
            }
            targetNps = clampValueToRange(targetNps, 0.5, 30);
            this.targetNoteSpacingInSeconds = 1 / targetNps;
        }
    }

    private addToBucket(nps: number, accuracyMillis: number): void {
        let foundBucket: boolean = false;
        for (let i = 0; i < this.dataBuckets.length; i++) {
            let bucket = this.dataBuckets[i];
            if (bucket.range.lowerBound <= nps && nps < bucket.range.upperBound) {
                foundBucket = true;
                bucket.data.push(accuracyMillis);
                if (bucket.data.length > this.maxBucketSize) {
                    bucket.data.shift();
                }
                foundBucket = true;
                break
            }
        }
        while (!foundBucket) {
            let lastUpperBound: number = this.dataBuckets[this.dataBuckets.length - 1].range.upperBound;
            let newBucket: any = {
                range: {lowerBound: lastUpperBound, upperBound: lastUpperBound + this.dataBucketStep},
                data: []
            };
            this.dataBuckets.push(newBucket);
            let bucket = newBucket;
            console.log("added new bucket " + newBucket.range.lowerBound + "," + newBucket.range.upperBound);
            if (bucket.range.lowerBound <= nps && nps < bucket.range.upperBound) {
                foundBucket = true;
                bucket.data.push(accuracyMillis);
                if (bucket.data.length > this.maxBucketSize) {
                    bucket.data.shift();
                }
                foundBucket = true;
                break
            }
        }
    }

    private exponentialModel(x: number, param = {a: this.a, b: this.b, c: this.c}): number {
        return param.a + param.b * Math.exp(-param.c * x);
    }

    private inverseModel(y: number, param = {a: this.a, b: this.b, c: this.c}): number {
        return -1 / param.c * Math.log(Math.max(y - param.a, 0.01) / param.b);
    }

    private getResidual(x: number, targetValue: number, param = {a: this.a, b: this.b, c: this.c}) {
        return Math.abs(this.exponentialModel(x, param) - targetValue);
    }

    private getError(param = {a: this.a, b: this.b, c: this.c}): number {
        let sum: number = 0;
        let numSummed: number = 0;
        for (let i = 0; i < this.dataBuckets.length; i++) {
            let bucket = this.dataBuckets[i];
            if (bucket.data.length > 2) {
                let s: number = stdDev(bucket.data);
                let nps: number = (bucket.range.lowerBound + bucket.range.upperBound) / 2
                sum += Math.pow(this.getResidual(nps, s, param), 2);
                numSummed++;
            }
        }
        return sum / numSummed;
    }

    public draw(currentTimeInSeconds: number): void {
        this.graph.draw(currentTimeInSeconds);
        this.exponentialModelGraph.draw(currentTimeInSeconds);

        this.moveTowardsTargetNoteSpacing(currentTimeInSeconds);
        this.drawText();
        if (this.lastNoteTimeInSeconds - currentTimeInSeconds < 2) {
            // do {
            //     nextNoteTrack = getRandomIntInclusive(0, this.numTracks - 1);
            // } while (nextNoteTrack == this.lastNoteTrack);
            this.currentPatternIndex = (this.currentPatternIndex + 1) % this.currentPattern.length;
            if (this.currentPatternIndex === 0) {
                this.numPatternIterations++;
            }
            if (this.numPatternIterations === 8) {
                this.numPatternIterations = 0;
                let newPattern = [];
                for (let i = 0; i < this.currentPattern.length; i++) {
                    newPattern.push(getRandomIntInclusive(0, this.numTracks - 1));
                }
                this.currentPattern = newPattern;
            }
            let nextNoteTrack = this.currentPattern[this.currentPatternIndex];


            this.addNote(nextNoteTrack, this.lastNoteTimeInSeconds + this.currentNoteSpacingInSeconds);
            this.npsMemory[nextNoteTrack].push(1 / this.currentNoteSpacingInSeconds);
            this.lastNoteTrack = nextNoteTrack;
            this.lastNoteTimeInSeconds += this.currentNoteSpacingInSeconds;
        }
        this.lastDrawTimeInSeconds = currentTimeInSeconds;
    }

    private moveTowardsTargetNoteSpacing(currentTimeInSeconds: number) {
        let timeDifferenceInSeconds = currentTimeInSeconds - this.lastDrawTimeInSeconds;
        if (this.targetNoteSpacingInSeconds > this.currentNoteSpacingInSeconds) {
            this.currentNoteSpacingInSeconds = this.currentNoteSpacingInSeconds /
                (1 - timeDifferenceInSeconds * this.currentNoteSpacingInSeconds * this.maxNpsChangePerSecond);
            if (this.currentNoteSpacingInSeconds > this.targetNoteSpacingInSeconds) {
                this.currentNoteSpacingInSeconds = this.targetNoteSpacingInSeconds;
            }
        } else if (this.targetNoteSpacingInSeconds < this.currentNoteSpacingInSeconds) {
            this.currentNoteSpacingInSeconds = this.currentNoteSpacingInSeconds /
                (1 + timeDifferenceInSeconds * this.currentNoteSpacingInSeconds * this.maxNpsChangePerSecond)
            if (this.currentNoteSpacingInSeconds < this.targetNoteSpacingInSeconds) {
                this.currentNoteSpacingInSeconds = this.targetNoteSpacingInSeconds;
            }
        }
    }

    private drawText() {
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.fill("white");
        p.text((1 / this.currentNoteSpacingInSeconds).toFixed(2), 200, 10);
        p.text((1 / this.targetNoteSpacingInSeconds).toFixed(2), 200, 30);
        p.text(this.a.toFixed(1), 200, 60);
        p.text(this.b.toFixed(2), 200, 80);
        p.text(this.c.toFixed(3), 200, 100);
        p.pop();
    }

    private addNote(trackNumber: number, noteTime: number): void {
        let note: Note = {
            type: NoteType.NORMAL,
            state: NoteState.DEFAULT,
            timeInSeconds: noteTime,
            trackNumber: trackNumber,
            beatFraction: 4
        };

        this.noteManager.tracks[trackNumber].push(note);
    }
}