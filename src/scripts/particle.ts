import * as p5 from "p5";
import {global} from "./index";

export class Particle {
    private initialPosition: p5.Vector;
    private initialVelocity: p5.Vector;
    private constantAcceleration: p5.Vector;
    private creationTimeInSeconds: number;
    public color: p5.Color;
    private static particleSize: number = 2;

    constructor(initialPosition: p5.Vector, initialVelocity: p5.Vector, constantAcceleration: p5.Vector,
                creationTimeInSeconds: number, color: p5.Color) {
        this.initialPosition = initialPosition;
        this.initialVelocity = initialVelocity;
        this.constantAcceleration = constantAcceleration;
        this.creationTimeInSeconds = creationTimeInSeconds;
        this.color = color;
    }

    draw(currentTimeInSeconds: number, color: p5.Color) {
        let p: p5 = global.p5Scene.sketchInstance;
        let elapsedTime = this.getElapsedTimeInSeconds(currentTimeInSeconds);
        let currentPosition: p5.Vector = this.getPosition(p, elapsedTime);
        p.push();
        p.noStroke();
        p.fill(color);
        p.circle(currentPosition.x, currentPosition.y, Particle.particleSize);
        p.pop();
    }

    private getPosition(p: p5, elapsedTimeInSeconds: number) {
        let velocityComponent: p5.Vector = p5.Vector.mult(this.initialVelocity, elapsedTimeInSeconds);
        let accelerationComponent: p5.Vector = p5.Vector.mult(this.constantAcceleration,
            elapsedTimeInSeconds * elapsedTimeInSeconds / 2);
        return p5.Vector.add(p5.Vector.add(this.initialPosition, velocityComponent), accelerationComponent);
    }

    public getElapsedTimeInSeconds(currentTimeInSeconds: number) {
        return currentTimeInSeconds - this.creationTimeInSeconds;
    }
}