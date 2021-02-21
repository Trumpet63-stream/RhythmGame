import {AccuracyObserver} from "./accuracy_observer";
import {Drawable} from "./drawable";
import {AccuracyEvent} from "./accuracy_event";
import {lerp} from "./util";
import * as p5 from "p5";
import {global} from "./index";
import {Rectangle} from "./rectangle";
import {Config} from "./config";
import {Accuracy} from "./accuracy_manager";
import {AccuracyUtil} from "./accuracy_util";
import {ScrollDirection} from "./scroll_direction";

export class ErrorBar implements AccuracyObserver, Drawable {
    private readonly config: Config;
    private actualAverageError: number;
    private drawnAverageError: number;
    private lastDrawTimeInSeconds: number = 0;
    private readonly animationEasing: number = 0.2;
    private readonly maxEventHistory: number = 15;
    private readonly spectrum: p5.Color[];
    private readonly bounds: Rectangle;
    private readonly eventHistory: AccuracyEvent[];

    constructor(config: Config) {
        this.config = config;
        let y: number = this.config.scrollDirection === ScrollDirection.DOWN ? 440 : 40;
        this.bounds = Rectangle.fromCenter(360, y, 260, 16);
        let p: p5 = global.p5Scene.sketchInstance;
        this.spectrum = [
            p.color(80, 10, 145, 200),
            p.color(92, 11, 167, 200),
            p.color(106, 13, 192, 200),
            p.color(122, 15, 221, 200),
            p.color(140, 17, 254, 200)
        ];
        this.eventHistory = [];
        this.actualAverageError = 0;
        this.drawnAverageError = 0;
    }

    public update(accuracyEvent: AccuracyEvent): void {
        this.addToHistory(accuracyEvent);
        this.updateActualAverageError();
    }

    private addToHistory(accuracyEvent: AccuracyEvent): void {
        this.eventHistory.push(accuracyEvent);
        if (this.eventHistory.length > this.maxEventHistory) {
            this.eventHistory.shift();
        }
    }

    private updateActualAverageError(): void {
        if (this.eventHistory.length === 0) {
            return;
        }
        let sum = 0;
        for (let i = 0; i < this.eventHistory.length; i++) {
            sum += this.getNormalizedMillis(this.eventHistory[i]);
        }
        this.actualAverageError = sum / this.eventHistory.length;
    }

    private getNormalizedMillis(accuracyEvent: AccuracyEvent): number {
        let earliestMillis: number = AccuracyUtil.getEarliestMillis(this.config);
        if (accuracyEvent.accuracyMillis > earliestMillis) {
            return earliestMillis;
        }
        let latestMillis: number = AccuracyUtil.getLatestMillis(this.config);
        if (accuracyEvent.accuracyMillis < latestMillis) {
            return latestMillis;
        }
        return accuracyEvent.accuracyMillis;
    }

    public draw(currentTimeInSeconds: number): void {
        if (this.config.isErrorBarBackgroundEnabled) {
            this.drawBarBackground();
        }
        for (let i = 0; i < this.eventHistory.length; i++) {
            this.drawEventTick(i, this.eventHistory[i]);
        }
        this.updateDrawnAverageError(currentTimeInSeconds);
        this.drawAverageErrorTick();
        this.lastDrawTimeInSeconds = currentTimeInSeconds;
    }

    private drawBarBackground(): void {
        let accuracySettings: Accuracy[] = this.config.accuracySettings;
        for (let i = 0; i < accuracySettings.length; i++) {
            let accuracy: Accuracy = accuracySettings[i];
            if (!AccuracyUtil.isBounded(accuracy)) {
                continue;
            }
            let accuracyRank: number = this.accuracyToRank(accuracy);
            this.drawBarSegment(accuracyRank, accuracy.lowerBound, accuracy.upperBound);
        }
    }

    private accuracyToRank(accuracy: Accuracy): number {
        let averageMillis: number = (accuracy.upperBound + accuracy.lowerBound) / 2;
        return AccuracyUtil.getAccuracyRank({accuracyMillis: averageMillis}, this.config);
    }

    private drawBarSegment(accuracyRank: number, lowerAccuracyMillis: number, upperAccuracyMillis: number): void {
        let color: p5.Color = this.getColorForAccuracyRank(accuracyRank);
        let leftX: number = this.getAccuracyX(upperAccuracyMillis);
        let rightX: number = this.getAccuracyX(lowerAccuracyMillis);
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.noStroke();
        p.fill(color);
        p.rect(leftX, this.bounds.topLeftY, rightX - leftX, this.bounds.height);
        p.pop();
    }

    private getColorForAccuracyRank(accuracyRank: number): p5.Color {
        return this.spectrum[(accuracyRank - 1) % 5];
    }

    private updateDrawnAverageError(currentTimeInSeconds: number): void {
        let timeDifferenceInSeconds = currentTimeInSeconds - this.lastDrawTimeInSeconds;
        let ratio: number = timeDifferenceInSeconds / this.animationEasing;
        this.drawnAverageError = lerp(this.drawnAverageError, this.actualAverageError, ratio);
    }

    private drawEventTick(eventIndex: number, accuracyEvent: AccuracyEvent): void {
        let x: number = this.getAccuracyX(accuracyEvent.accuracyMillis);
        let width: number = this.getWidth(eventIndex);
        let opacity: number = this.getOpacity(eventIndex);
        this.drawTick(x, width, opacity);
    }

    private getWidth(eventIndex: number): number {
        if (eventIndex === this.eventHistory.length - 1) {
            return 3;
        }
        return 1;
    }

    private getOpacity(eventIndex: number): number {
        if (eventIndex === this.eventHistory.length - 1) {
            return 0.7;
        }
        let opacityRatio: number = (this.maxEventHistory - eventIndex - 1) / (this.maxEventHistory - 1);
        return lerp(0.2, 0.6, opacityRatio);
    }

    private getAccuracyX(accuracyMillis: number): number {
        let earliestMillis: number = AccuracyUtil.getEarliestMillis(this.config);
        let latestMillis: number = AccuracyUtil.getLatestMillis(this.config);
        let accuracyRatio = (earliestMillis - accuracyMillis) / (earliestMillis - latestMillis);
        return lerp(this.bounds.topLeftX, this.bounds.topLeftX + this.bounds.width, accuracyRatio);
    }

    private drawTick(centerX: number, width: number, opacity: number): void {
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.fill(p.color(255, opacity * 255));
        p.noStroke();
        p.rect(centerX - width / 2, this.bounds.topLeftY, width, this.bounds.height);
        p.pop();
    }

    private drawAverageErrorTick(): void {
        let tickWidth: number = 10;
        let tickHeight: number = 10;
        let tickDistance: number = 3;
        let centerX: number = this.getAccuracyX(this.drawnAverageError);
        let centerY: number = this.bounds.topLeftY - tickDistance;
        let leftX: number = centerX - tickWidth / 2;
        let leftY: number = centerY - tickHeight;
        let rightX: number = centerX + tickWidth / 2;
        let rightY: number = leftY;
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.noStroke();
        p.fill(p.color(255, 200));
        p.triangle(centerX, centerY, leftX, leftY, rightX, rightY);
        p.pop();
    }
}