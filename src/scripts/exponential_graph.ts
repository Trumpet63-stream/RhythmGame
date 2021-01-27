import {Drawable} from "./drawable";
import {Rectangle} from "./rectangle";
import {global} from "./index";
import * as p5 from "p5";
import {mapLinear, stdDev} from "./util";
import {Point2D} from "./point_2d";

export class ExponentialGraph implements Drawable {
    private drawSpaceBounds: Rectangle;
    private numberSpaceBounds: Rectangle;
    private a: number;
    private b: number;
    private c: number;
    private dataBuckets: { range: { upperBound: number, lowerBound: number }, data: number[] }[];
    private drawCount = 0;

    public constructor() {
        this.drawSpaceBounds = Rectangle.fromCenter(580, 320, 150, 100);
        this.dataBuckets = [];
        this.updateBounds();
    }

    private updateBounds() {
        let xMin = 0;
        let yMin = 5;

        let xMax: number;
        if (this.dataBuckets.length < 1) {
            xMax = 1.5;
        } else {
            xMax = this.dataBuckets[this.dataBuckets.length - 1].range.upperBound;
        }

        let yMax: number;
        if (this.a === undefined) {
            yMax = 20;
        } else {
            yMax = Math.max(this.exponentialModel(xMax) * 1.1, this.numberSpaceBounds.topLeftY);
        }

        this.numberSpaceBounds = Rectangle.fromTopLeft(xMin, yMax, xMax - xMin, yMax - yMin);
    }

    public setModelParameters(a: number, b: number, c: number): void {
        this.a = a;
        this.b = b;
        this.c = c;
        this.updateBounds();
    }

    public setDataBuckets(dataBuckets: { range: { upperBound: number, lowerBound: number }, data: number[] }[]): void {
        this.dataBuckets = dataBuckets;
        this.updateBounds();
    }

    public draw(currentTimeInSeconds: number): void {
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.fill(0, 0);
        p.stroke("white");
        p.rect(this.drawSpaceBounds.topLeftX, this.drawSpaceBounds.topLeftY,
            this.drawSpaceBounds.width, this.drawSpaceBounds.height);
        this.drawExponentialModel(p);
        this.drawData(p);
        p.pop();
    }

    private drawExponentialModel(p: p5): void {
        p.push();
        p.stroke(0, 255, 0);
        p.strokeWeight(2);

        let numberSpaceXRange = this.getRange(this.numberSpaceBounds.topLeftX,
            this.numberSpaceBounds.topLeftX + this.numberSpaceBounds.width, 20);

        for (let i = 1; i < numberSpaceXRange.length; i++) {
            let lastNumberSpacePoint = new Point2D(numberSpaceXRange[i - 1], this.exponentialModel(numberSpaceXRange[i - 1]));
            let lastDrawSpacePoint = this.numberSpaceToDrawSpace(lastNumberSpacePoint);

            let currentNumberSpacePoint = new Point2D(numberSpaceXRange[i], this.exponentialModel(numberSpaceXRange[i]));
            let currentDrawSpacePoint = this.numberSpaceToDrawSpace(currentNumberSpacePoint);

            p.line(lastDrawSpacePoint.x, lastDrawSpacePoint.y, currentDrawSpacePoint.x, currentDrawSpacePoint.y);
        }
        p.pop();
    }

    private getRange(low: number, high: number, numPoints: number): number[] {
        let range: number[] = [];
        for (let i = low; i <= high; i += (high - low) / (numPoints - 1)) {
            range.push(i);
        }
        return range;
    }

    private drawData(p: p5): void {
        p.push();
        for (let i = 0; i < this.dataBuckets.length; i++) {
            let bucket = this.dataBuckets[i]
            let nps: number = (bucket.range.lowerBound + bucket.range.upperBound) / 2
            let s = this.getStdDev(bucket.data);
            if (s != null) {
                let numberSpacePoint = new Point2D(nps, s);
                let drawSpacePoint = this.numberSpaceToDrawSpace(numberSpacePoint);
                p.stroke("purple");
                p.strokeWeight(10);
                p.point(drawSpacePoint.x, drawSpacePoint.y);
            }
        }
        p.pop();
    }

    private getStdDev(data: number[]): number {
        if (data.length > 2) {
            return stdDev(data);
        }
        return null;
    }

    private exponentialModel(x: number, param = {a: this.a, b: this.b, c: this.c}): number {
        return param.a + param.b * Math.exp(-param.c * x);
    }

    private numberSpaceToDrawSpace(numberSpacePoint: Point2D): Point2D {
        let x = mapLinear(this.numberSpaceBounds.topLeftX, this.numberSpaceBounds.topLeftX + this.numberSpaceBounds.width,
            this.drawSpaceBounds.topLeftX, this.drawSpaceBounds.topLeftX + this.drawSpaceBounds.width,
            numberSpacePoint.x);
        let y = mapLinear(this.numberSpaceBounds.topLeftY, this.numberSpaceBounds.topLeftY + this.numberSpaceBounds.height,
            this.drawSpaceBounds.topLeftY, this.drawSpaceBounds.topLeftY + this.drawSpaceBounds.height,
            numberSpacePoint.y);
        return new Point2D(x, y);
    }
}