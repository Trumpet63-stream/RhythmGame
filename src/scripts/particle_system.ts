import {Particle} from "./particle";
import * as p5 from "p5";
import {global} from "./index";

export class ParticleSystem {
    private particles: Particle[];
    private particleLifetimeInSeconds: number;
    private constantAcceleration: p5.Vector;
    private static velocityAngleVariationInDegrees: number = 30;
    private static velocityMagnitudeVariationInPercent: number = 30;
    private static colorVariation: number = 30;

    constructor(particleLifetimeInSeconds: number, constantAcceleration: p5.Vector) {
        this.particleLifetimeInSeconds = particleLifetimeInSeconds;
        this.constantAcceleration = constantAcceleration;
        this.particles = [];
    }

    public draw(currentTimeInSeconds: number) {
        while (this.oldestParticleAge(currentTimeInSeconds) > this.particleLifetimeInSeconds) {
            this.removeOldestParticle();
        }
        for (let i = 0; i < this.particles.length; i++) {
            let particle: Particle = this.particles[i];
            let alphaAdjustedColor: p5.Color = this.getAlphaAdjustedColor(particle, currentTimeInSeconds);
            particle.draw(currentTimeInSeconds, alphaAdjustedColor);
        }
    }

    private oldestParticleAge(currentTimeInSeconds: number) {
        if (this.particles.length > 0) {
            return this.particles[0].getElapsedTimeInSeconds(currentTimeInSeconds);
        } else {
            return -1;
        }
    }

    private removeOldestParticle() {
        this.particles.shift();
    }

    private getAlphaAdjustedColor(particle: Particle, currentTimeInSeconds: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        let baseColor = particle.color;
        let particleAge = particle.getElapsedTimeInSeconds(currentTimeInSeconds);
        let lifeRemainingPercent = (this.particleLifetimeInSeconds - particleAge) / this.particleLifetimeInSeconds;
        let alpha = this.interpolate(0, 255, lifeRemainingPercent);
        let newColor: p5.Color = p.color(baseColor);
        newColor.setAlpha(alpha);
        return newColor;
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

    public addRandomizedParticles(initialPosition: p5.Vector, initialVelocity: p5.Vector, creationTimeInSeconds: number,
                                  numParticles: number, color: p5.Color) {
        let p: p5 = global.p5Scene.sketchInstance;
        for (let i = 0; i < numParticles; i++) {
            let newInitalVelocity = this.randomizeVector(p, initialVelocity);
            let newColor = this.randomizeColor(p, color);
            this.addParticle(initialPosition, newInitalVelocity, creationTimeInSeconds, newColor);
        }
    }

    private randomizeVector(p: p5, baseVector: p5.Vector) {
        let directionRandomized: p5.Vector = this.randomizeVectorDirection(p, baseVector);
        return this.randomizeVectorMagnitude(p, directionRandomized);
    }

    private randomizeVectorDirection(p: p5, baseVector: p5.Vector) {
        p.push();
        p.angleMode(p.DEGREES);
        let angleInDegrees = baseVector.heading();
        let angleChangeInDegrees = p.random(-ParticleSystem.velocityAngleVariationInDegrees / 2,
            ParticleSystem.velocityAngleVariationInDegrees / 2);
        let finalAngleInRadians = p.radians(angleInDegrees + angleChangeInDegrees);
        let magnitude = baseVector.mag();
        p.pop();
        return p5.Vector.fromAngle(finalAngleInRadians, magnitude);
    }

    private randomizeVectorMagnitude(p: p5, baseVector: p5.Vector) {
        let magnitudeChangeInPercent = p.random(-ParticleSystem.velocityMagnitudeVariationInPercent / 2,
            ParticleSystem.velocityMagnitudeVariationInPercent / 2);
        let finalMagnitude = baseVector.mag() * (100 + magnitudeChangeInPercent) / 100;
        return baseVector.setMag(finalMagnitude);
    }

    private randomizeColor(p: p5, baseColor: p5.Color) {
        let newRed = this.boundedRandomize(p, p.red(baseColor), ParticleSystem.colorVariation, 0, 255);
        let newGreen = this.boundedRandomize(p, p.green(baseColor), ParticleSystem.colorVariation, 0, 255);
        let newBlue = this.boundedRandomize(p, p.blue(baseColor), ParticleSystem.colorVariation, 0, 255);
        return p.color(newRed, newGreen, newBlue);
    }

    private boundedRandomize(p: p5, value: number, variation: number, lowerBound: number, upperBound: number) {
        let newValue = value + p.random(-variation / 2, variation / 2);
        if (newValue <= lowerBound) {
            return lowerBound;
        } else if (lowerBound < newValue && newValue < upperBound) {
            return newValue;
        } else {
            return upperBound;
        }
    }

    public addParticle(initialPosition: p5.Vector, initialVelocity: p5.Vector, creationTimeInSeconds: number,
                       color: p5.Color) {
        this.particles.push(
            new Particle(initialPosition, initialVelocity, this.constantAcceleration, creationTimeInSeconds, color));
    }
}