import * as p5 from "p5";
import {global} from "./index";
import {Config} from "./config";
import {Point2D} from "./point_2d";
import {AccuracyEvent} from "./accuracy_event";
import {AccuracyObserver} from "./accuracy_observer";
import {Drawable} from "./drawable";
import {lerp} from "./util";

export class AccuracyFeedbackText implements AccuracyObserver, Drawable {
    private config: Config;
    private lastEvent: AccuracyEvent;
    private defaultCenter: Point2D;
    private center: Point2D;
    private textSize: number = 30;
    private alpha: number;

    constructor(center: Point2D, config: Config) {
        this.defaultCenter = new Point2D(center.x, center.y);
        this.center = new Point2D(center.x, center.y);
        this.config = config;
    }

    public update(accuracyEvent: AccuracyEvent) {
        this.lastEvent = accuracyEvent;
    }

    public draw(currentTimeInSeconds: number) {
        if (this.lastEvent === undefined) {
            return;
        }
        let timeSinceLastEvent = currentTimeInSeconds - this.lastEvent.timeInSeconds;
        this.alpha = this.getAlpha(timeSinceLastEvent);
        this.center.y = this.defaultCenter.y - this.getTextShift(timeSinceLastEvent);
        if (this.alpha <= 0) {
            return;
        }
        this.drawEventText(this.lastEvent.accuracyName);
    }

    private getTextShift(time: number): number {
        let maxShift = this.textSize * 0.2;
        if (time < 0.1) {
            return lerp(0, maxShift, time / 0.1);
        }
        return maxShift;
    }

    private getAlpha(time: number): number {
        if (time < 0.6) {
            return 1;
        } else if (time >= 0.6 && time < 0.7) {
            let ratio = (time - 0.6) / (0.7 - 0.6);
            return lerp(1, 0, ratio);
        }
        return 0;
    }

    private drawEventText(text: string) {
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.textAlign(p.CENTER, p.CENTER);
        p.fill('rgba(255,255,255, ' + this.alpha + ')');
        p.textSize(this.textSize);
        p.text(text, this.center.x, this.center.y);
        p.pop();
    }
}