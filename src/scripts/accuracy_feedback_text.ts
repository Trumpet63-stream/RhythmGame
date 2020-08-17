import * as p5 from "p5";
import {global} from "./index";
import {Config} from "./config";
import {Point2D} from "./point_2d";
import {AccuracyEvent} from "./accuracy_event";

export class AccuracyFeedbackText {
    private config: Config;
    private lastEvent: AccuracyEvent;
    private center: Point2D;

    constructor(center: Point2D, config: Config) {
        this.center = center;
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
        let textSize = AccuracyFeedbackText.getFontSize(timeSinceLastEvent);
        if (textSize <= 0) {
            return;
        }
        this.drawEventText(this.lastEvent.accuracyName, textSize);
    }

    private static getFontSize(time: number): number {
        let maxFontSize = 30;
        if (time < 0.1) {
            return time / 0.1 * maxFontSize;
        } else if (time >= 0.1 && time < 0.4) {
            return maxFontSize;
        } else if (time >= 0.4 && time < 0.7) {
            return (1 - (time - 0.4) / (0.7 - 0.4)) * maxFontSize;
        }
        return 0;
    }

    private drawEventText(text: string, textSize: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.textAlign(p.CENTER, p.CENTER);
        p.fill("white");
        p.textSize(textSize);
        p.text(text, this.center.x, this.center.y);
        p.pop();
    }
}