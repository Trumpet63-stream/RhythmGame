import {DisplayManager} from "./display_manager";
import {Config} from "./config";
import * as p5 from "p5";
import {global} from "./index";
import {AccuracyEvent} from "./accuracy_event";
import {AccuracyUtil} from "./accuracy_util";
import {AccuracyObserver} from "./accuracy_observer";
import {Drawable} from "./drawable";

export class AccuracyFeedbackFlash implements AccuracyObserver, Drawable {
    private config: Config;
    private displayManager: DisplayManager;
    private numTracks: number;
    private numColoredAccuracyRanks: number;
    private static flashDurationInSeconds: number = 0.1;
    private accuracyColors: [number, number, number, number][];
    private lastEvents: AccuracyEvent[];

    constructor(config: Config, displayManager: DisplayManager, numTracks: number) {
        this.config = config;
        this.displayManager = displayManager;
        this.numTracks = numTracks;
        this.numColoredAccuracyRanks = AccuracyUtil.countDifferentHitAccuracies(this.config);
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
        this.lastEvents = [];
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    public update(accuracyEvent: AccuracyEvent) {
        this.lastEvents[accuracyEvent.trackNumber] = accuracyEvent;
    }

    public draw(currentTimeInSeconds: number) {
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            this.drawFlashForTrack(trackNumber, currentTimeInSeconds);
        }
    }

    private drawFlashForTrack(trackNumber: number, currentTimeInSeconds: number) {
        let lastEvent: AccuracyEvent = this.lastEvents[trackNumber];
        if (this.isFlashHappening(currentTimeInSeconds, lastEvent)) {
            let centerX = this.displayManager.getNoteCenterX(trackNumber, this.numTracks);
            let centerY = this.displayManager.getNoteCenterY(currentTimeInSeconds, currentTimeInSeconds);
            let flashColor: p5.Color = this.getFlashColor(lastEvent);
            let elapsedTimeInSeconds = this.getElapsedTimeInSeconds(currentTimeInSeconds, lastEvent);
            this.drawFlash(elapsedTimeInSeconds, centerX, centerY, flashColor);
        }
    }

    private isFlashHappening(currentTimeInSeconds: number, accuracyEvent: AccuracyEvent) {
        if (accuracyEvent === undefined) {
            return false;
        }

        if (!AccuracyUtil.eventIsAHit(accuracyEvent, this.config)) {
            return false;
        }

        let elapsedTimeInSeconds = this.getElapsedTimeInSeconds(currentTimeInSeconds, accuracyEvent);
        return elapsedTimeInSeconds <= AccuracyFeedbackFlash.flashDurationInSeconds;
    }

    private getElapsedTimeInSeconds(currentTimeInSeconds: number, accuracyEvent: AccuracyEvent) {
        return currentTimeInSeconds - accuracyEvent.timeInSeconds;
    }

    // Assumes symmetrical accuracy settings
    private getFlashColor(accuracyEvent: AccuracyEvent) {
        let accuracyRank = AccuracyUtil.getAccuracyRank(accuracyEvent, this.config);
        let colorValues = this.accuracyColors[accuracyRank - 1];
        let p: p5 = global.p5Scene.sketchInstance;
        return p.color(colorValues[0], colorValues[1], colorValues[2], colorValues[3]);
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