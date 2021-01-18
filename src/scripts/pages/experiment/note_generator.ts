import {NoteManager} from "../../note_manager";
import {AccuracyObserver} from "../../accuracy_observer";
import {Drawable} from "../../drawable";
import {AccuracyEvent} from "../../accuracy_event";
import {Note, NoteState, NoteType} from "../../note";
import {clampValueToRange, getRandomIntInclusive, lerp, mapLinear, mean} from "../../util";
import {global} from "../../index";
import * as p5 from "p5";
import {ScoreProvider} from "../../score_provider";

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

    constructor(noteManager: NoteManager) {
        this.noteManager = noteManager;
        this.targetNoteSpacingInSeconds = this.maxNoteSpacingInSeconds;
        this.currentNoteSpacingInSeconds = this.maxNoteSpacingInSeconds;
        this.scoreProvider = new ScoreProvider(global.config, undefined);
        this.scoreMemory = [];
    }

    public update(accuracyEvent: AccuracyEvent): void {
        let eventScore: number = this.scoreProvider.scoreEntry(accuracyEvent);
        this.scoreMemory.push(eventScore);
        let maxLength = 5;
        if (this.scoreMemory.length > maxLength) {
            this.scoreMemory.shift();
        }
        let currentAverageScore = mean(this.scoreMemory);
        let targetAverageScore = 48;

        let maxPositive = this.scoreProvider.scoreEntry({accuracyMillis: 0}) - targetAverageScore;
        let maxNegative = -10;
        let averageScoreDifference = currentAverageScore - targetAverageScore;
        averageScoreDifference = clampValueToRange(averageScoreDifference, maxNegative, maxPositive);
        console.log(averageScoreDifference);

        let updateIncrement = this.targetNoteSpacingInSeconds * 0.2 * this.targetNoteSpacingInSeconds;
        let incrementRatio = mapLinear(maxPositive, maxNegative, -1, 1, averageScoreDifference);
        console.log(incrementRatio);

        // let extraReward = 1;
        // let extraPenalty = 2.2;
        // if (incrementRatio > 0) {
        //     incrementRatio *= extraPenalty;
        // } else if (incrementRatio < 0) {
        //     incrementRatio *= extraReward;
        // }

        this.targetNoteSpacingInSeconds += updateIncrement * incrementRatio;
        if (this.targetNoteSpacingInSeconds > this.maxNoteSpacingInSeconds) {
            this.targetNoteSpacingInSeconds = this.maxNoteSpacingInSeconds;
        }
    }

    public draw(currentTimeInSeconds: number): void {
        this.moveTowardsTargetNoteSpacing(currentTimeInSeconds);
        this.drawText();
        if (this.lastNoteTimeInSeconds - currentTimeInSeconds < 2) {
            let nextNoteTrack: number;
            do {
                nextNoteTrack = getRandomIntInclusive(0, this.numTracks - 1);
            } while (nextNoteTrack == this.lastNoteTrack);

            this.addNote(nextNoteTrack, this.lastNoteTimeInSeconds + this.currentNoteSpacingInSeconds);
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