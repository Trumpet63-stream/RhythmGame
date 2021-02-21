import {Drawable} from "./drawable";
import {Rectangle} from "./rectangle";
import {global} from "./index";
import * as p5 from "p5";
import {mapLinear} from "./util";
import {Point2D} from "./point_2d";

export class NpsGraph implements Drawable {
    private drawSpaceBounds: Rectangle;
    private numberSpaceBounds: Rectangle;
    private memory: { timeInSeconds: number, value: number }[];

    constructor() {
        this.drawSpaceBounds = Rectangle.fromCenter(140, 320, 150, 100);
        this.memory = [];
        this.updateBounds(5);
    }

    private updateBounds(yMax: number) {
        let xMin = 0;
        let xMax = 60;
        let yMin = 0;
        this.numberSpaceBounds = Rectangle.fromTopLeft(xMin, yMax, xMax - xMin, yMax - yMin);
    }

    public addDataPoint(timeInSeconds: number, value: number): void {
        this.memory.push({timeInSeconds: timeInSeconds, value: value});
        if (this.memory.length > 0) {
            while (timeInSeconds - this.memory[0].timeInSeconds > 60) {
                this.memory.shift();
            }
        }
        if (value > this.numberSpaceBounds.topLeftY) {
            this.updateBounds(this.numberSpaceBounds.topLeftY + 5);
        }
    }

    public draw(currentTimeInSeconds: number): void {
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.fill(0, 0);
        p.stroke("white");
        p.rect(this.drawSpaceBounds.topLeftX, this.drawSpaceBounds.topLeftY,
            this.drawSpaceBounds.width, this.drawSpaceBounds.height);

        if (this.memory.length > 1) {
            p.stroke(0, 255, 0);
            p.strokeWeight(2);
            let timeShift = currentTimeInSeconds - 60;

            for (let i = 1; i < this.memory.length; i++) {
                let lastNumberSpacePoint = {
                    value: this.memory[i - 1].value,
                    timeInSeconds: this.memory[i - 1].timeInSeconds - timeShift
                };
                let lastDrawSpacePoint = this.numberSpaceToDrawSpace(lastNumberSpacePoint);

                let currentNumberSpacePoint = {
                    value: this.memory[i].value,
                    timeInSeconds: this.memory[i].timeInSeconds - timeShift
                };
                let currentDrawSpacePoint = this.numberSpaceToDrawSpace(currentNumberSpacePoint);

                p.line(lastDrawSpacePoint.x, lastDrawSpacePoint.y, currentDrawSpacePoint.x, currentDrawSpacePoint.y);
            }
        }

        p.pop();
    }

    private numberSpaceToDrawSpace(numberSpacePoint: { timeInSeconds: number, value: number }): Point2D {
        let x = mapLinear(this.numberSpaceBounds.topLeftX, this.numberSpaceBounds.topLeftX + this.numberSpaceBounds.width,
            this.drawSpaceBounds.topLeftX, this.drawSpaceBounds.topLeftX + this.drawSpaceBounds.width,
            numberSpacePoint.timeInSeconds);
        let y = mapLinear(this.numberSpaceBounds.topLeftY, this.numberSpaceBounds.topLeftY + this.numberSpaceBounds.height,
            this.drawSpaceBounds.topLeftY, this.drawSpaceBounds.topLeftY + this.drawSpaceBounds.height,
            numberSpacePoint.value);
        return new Point2D(x, y);
    }
}