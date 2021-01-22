import {NoteManager} from "../../note_manager";
import {AccuracyObserver} from "../../accuracy_observer";
import {Drawable} from "../../drawable";
import {AccuracyEvent} from "../../accuracy_event";
import {Note, NoteState, NoteType} from "../../note";
import {getEmpty2dArray, getRandomIntInclusive, lerp, mean} from "../../util";
import {global} from "../../index";
import * as p5 from "p5";
import {ScoreProvider} from "../../score_provider";
import {AccuracyUtil} from "../../accuracy_util";
import {Config} from "../../config";
import {LineGraph} from "../../line_graph";

/* Keep a record of the note spacing (or NPS) per track, so accuracy events can be associated with the instantaneous
 NPS. Then use that to update a player's expected NPS.
 From Elo: New rating = old rating + K * (actual score - expected score)
 */
export class NoteGenerator implements AccuracyObserver, Drawable {
    private noteManager: NoteManager;
    private numTracks: number = 4;
    private lastNoteTimeInSeconds: number = 1.0;
    private maxNoteSpacingInSeconds: number = 2;
    private targetNoteSpacingInSeconds: number;
    private currentNoteSpacingInSeconds: number;
    private lastDrawTimeInSeconds: number = 0;
    private readonly spacingEasing: number = 0.85;
    private lastNoteTrack: number = -1;
    private scoreProvider: ScoreProvider;
    private scoreMemory: number[];
    private npsMemory: number[][]
    private config: Config;
    private tooEasyNps: number = 0.5;
    private tooHardNps: number = 0.5;
    private generatorState: number = 0;
    private graph: LineGraph;

    constructor(noteManager: NoteManager) {
        this.noteManager = noteManager;
        this.targetNoteSpacingInSeconds = this.maxNoteSpacingInSeconds;
        this.currentNoteSpacingInSeconds = this.maxNoteSpacingInSeconds;
        this.scoreProvider = new ScoreProvider(global.config, undefined);
        this.scoreMemory = [];
        this.npsMemory = getEmpty2dArray(this.numTracks);
        this.config = global.config;
        this.graph = new LineGraph();
    }

    public update(accuracyEvent: AccuracyEvent): void {
        if (!AccuracyUtil.eventIsABoo(accuracyEvent, this.config)) {
            let eventNps: number = this.npsMemory[accuracyEvent.trackNumber].shift();
            this.graph.addDataPoint(accuracyEvent.timeInSeconds, eventNps);
            let eventScore: number = this.scoreProvider.scoreEntry(accuracyEvent);
            // console.log(eventNps.toFixed(4) + "," + eventScore.toFixed(4));
            this.scoreMemory.push(eventScore);
            let maxLength = 5;
            if (this.scoreMemory.length > maxLength) {
                this.scoreMemory.shift();
            }
            let averageScore = mean(this.scoreMemory);
            let hardScore = 45;

            // let updateIncrement = this.targetNoteSpacingInSeconds * 0.2 * this.targetNoteSpacingInSeconds;
            // let incrementRatio = mapLinear(maxPositive, maxNegative, -1, 1, scoreDifference);
            // let noteSpacingDelta = updateIncrement * incrementRatio;
            let noteSpacingDelta = 0;

            switch (this.generatorState) {
                case 0:
                    if (averageScore > hardScore || this.scoreMemory.length < maxLength) {
                        noteSpacingDelta -= this.targetNoteSpacingInSeconds * 0.2 * this.targetNoteSpacingInSeconds;
                    } else {
                        this.generatorState = 1;
                    }
                    break;
                case 1:
                    if (averageScore <= hardScore) {
                        noteSpacingDelta += this.targetNoteSpacingInSeconds * 0.1 * this.targetNoteSpacingInSeconds;
                    } else {
                        this.generatorState = 2;
                    }
                    break;
                case 2:
                    if (averageScore > hardScore) {
                        noteSpacingDelta -= this.targetNoteSpacingInSeconds * 0.05 * this.targetNoteSpacingInSeconds;
                    } else {
                        this.generatorState = 1;
                    }
                    break;
            }

            // let maxPositive = this.scoreProvider.scoreEntry({accuracyMillis: 0}) - hardScore;
            // let maxNegative = -10;

            // if (eventScore > hardScore) {
            //     let easyConfidence = (eventScore - hardScore) / maxPositive;
            //     if (eventNps > this.tooEasyNps) {
            //         this.tooEasyNps = this.tooEasyNps + easyConfidence / 100 * (eventNps - this.tooEasyNps);
            //     }
            //     if (eventNps > this.tooHardNps) {
            //         this.tooHardNps = this.tooHardNps + easyConfidence / 10 * (eventNps - this.tooHardNps);
            //     }
            // } else {
            //     let hardConfidence = Math.max(hardScore - eventScore, hardScore) / hardScore;
            //     if (eventNps < this.tooEasyNps) {
            //         this.tooEasyNps = this.tooEasyNps - hardConfidence / 10 * (this.tooEasyNps - eventNps);
            //     }
            //     if (eventNps < this.tooHardNps) {
            //         this.tooHardNps = this.tooHardNps - hardConfidence / 100 * (this.tooHardNps - eventNps);
            //     }
            // }
            // console.log(this.tooEasyNps.toFixed(4) + " - " + this.tooHardNps.toFixed(4));

            // let scoreDifference = averageScore - hardScore;
            // scoreDifference = clampValueToRange(scoreDifference, maxNegative, maxPositive);

            // let extraReward = 1;
            // let extraPenalty = 2.2;
            // if (incrementRatio > 0) {
            //     incrementRatio *= extraPenalty;
            // } else if (incrementRatio < 0) {
            //     incrementRatio *= extraReward;
            // }

            this.targetNoteSpacingInSeconds += noteSpacingDelta;
            if (this.targetNoteSpacingInSeconds > this.maxNoteSpacingInSeconds) {
                this.targetNoteSpacingInSeconds = this.maxNoteSpacingInSeconds;
            }
        }
    }


    public draw(currentTimeInSeconds: number): void {
        this.graph.draw(currentTimeInSeconds);

        this.moveTowardsTargetNoteSpacing(currentTimeInSeconds);
        this.drawText();
        if (this.lastNoteTimeInSeconds - currentTimeInSeconds < 2) {
            let nextNoteTrack: number;
            do {
                nextNoteTrack = getRandomIntInclusive(0, this.numTracks - 1);
            } while (nextNoteTrack == this.lastNoteTrack);

            this.addNote(nextNoteTrack, this.lastNoteTimeInSeconds + this.currentNoteSpacingInSeconds);
            this.npsMemory[nextNoteTrack].push(1 / this.currentNoteSpacingInSeconds);
            this.lastNoteTrack = nextNoteTrack;
            this.lastNoteTimeInSeconds += this.currentNoteSpacingInSeconds;
        }
        this.lastDrawTimeInSeconds = currentTimeInSeconds;
    }

    private moveTowardsTargetNoteSpacing(currentTimeInSeconds: number) {
        let timeDifferenceInSeconds = currentTimeInSeconds - this.lastDrawTimeInSeconds;
        let ratio: number = timeDifferenceInSeconds / this.spacingEasing;
        this.currentNoteSpacingInSeconds =
            lerp(this.currentNoteSpacingInSeconds, this.targetNoteSpacingInSeconds, ratio);
    }

    private drawText() {
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.fill("white");
        p.text((1 / this.currentNoteSpacingInSeconds).toFixed(2), 200, 10);
        p.text((1 / this.targetNoteSpacingInSeconds).toFixed(2), 200, 30);
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