import * as p5 from "p5";
import {global} from "./index";
import {Config} from "./config";
import {DisplayManager} from "./display_manager";

export class HoldGlow {
    private config: Config;
    private numTracks: number;
    private displayManager: DisplayManager;
    private glowStartTimes: number[];
    private static dontDrawFlag: number = -1;
    private static glowPeriodInSeconds: number = 0.3;

    constructor(config: Config, numTracks: number, displayManager: DisplayManager) {
        this.config = config;
        this.numTracks = numTracks;
        this.displayManager = displayManager;

        this.glowStartTimes = [];
        for (let i = 0; i < numTracks; i++) {
            this.glowStartTimes.push(HoldGlow.dontDrawFlag);
        }
    }

    public draw(currentTimeInSeconds: number) {
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            if (this.glowStartTimes[trackNumber] !== HoldGlow.dontDrawFlag) {
                let p: p5 = global.p5Scene.sketchInstance;
                let elapsedTime = currentTimeInSeconds - this.glowStartTimes[trackNumber];
                let centerX = this.displayManager.getNoteCenterX(trackNumber, this.numTracks);
                let centerY = this.displayManager.getNoteCenterY(currentTimeInSeconds, currentTimeInSeconds);
                let glowAlpha = this.getGlowAlpha(elapsedTime);
                let glowColor = p.color(0, 255, 0, glowAlpha);
                let glowSize = this.getGlowSize(elapsedTime);
                this.drawGlow(p, centerX, centerY, glowSize, glowSize / 2, glowColor);
            }
        }
    }

    private drawGlow(p: p5, centerX: number, centerY: number, width: number, height: number, color: p5.Color) {
        p.push();
        p.noStroke();
        p.fill(color);
        p.ellipse(centerX, centerY, width, height);
        p.pop();
    }

    private getGlowAlpha(elapsedTimeInSeconds: number) {
        let animationTime = elapsedTimeInSeconds % HoldGlow.glowPeriodInSeconds;
        let animationRatio = animationTime / HoldGlow.glowPeriodInSeconds;
        return this.biLerp(0, 50, animationRatio);
    }

    private getGlowSize(elapsedTimeInSeconds: number) {
        let animationTime = elapsedTimeInSeconds % HoldGlow.glowPeriodInSeconds;
        let animationRatio = animationTime / HoldGlow.glowPeriodInSeconds;
        let maxSize = this.config.noteSize;
        return this.biLerp(0, maxSize, animationRatio);
    }

    private biLerp(minValue: number, maxValue: number, ratio: number) {
        if (ratio < 0.5) {
            return this.lerp(minValue, maxValue, 1 - ratio / 0.5);
        } else {
            return this.lerp(minValue, maxValue, 2 * ratio - 1);
        }
    }

    private lerp(minValue: number, maxValue: number, ratio: number) {
        if (ratio <= 0) {
            return minValue;
        } else if (ratio > 0 && ratio < 1) {
            return minValue + (maxValue - minValue) * ratio;
        } else {
            return maxValue;
        }
    }

    public holdTrack(trackNumber: number, currentTimeInSeconds: number) {
        this.glowStartTimes[trackNumber] = currentTimeInSeconds;
    }

    public unholdTrack(trackNumber: number) {
        this.glowStartTimes[trackNumber] = HoldGlow.dontDrawFlag;
    }
}