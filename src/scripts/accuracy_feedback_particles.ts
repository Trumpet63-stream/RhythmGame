import {DisplayManager} from "./display_manager";
import {AccuracyEvent, AccuracyRecording} from "./accuracy_recording";
import {Config} from "./config";
import * as p5 from "p5";
import {global} from "./index";
import {Accuracy} from "./accuracy_manager";
import {ScrollDirection} from "./scroll_direction";

export class AccuracyFeedbackParticles {
    private config: Config;
    private displayManager: DisplayManager;
    private numTracks: number;
    private numColoredAccuracyRanks: number;
    private static particlesLifetimeInSeconds: number = 1.5;
    private particleSettings: [number, number, number, number][];
    private particleSystems: ParticleSystem[];

    constructor(config: Config, displayManager: DisplayManager, numTracks: number) {
        this.config = config;
        this.displayManager = displayManager;
        this.numTracks = numTracks;
        this.numColoredAccuracyRanks = this.getNumColoredAccuracyRanks(this.config.accuracySettings);

        this.particleSettings = [
            [178, 94, 247, 30],
            [30, 217, 124, 25],
            [196, 199, 30, 20],
            [245, 213, 221, 15]
        ];
        while (this.numColoredAccuracyRanks > this.particleSettings.length) {
            this.particleSettings.push(
                [this.getRandomInt(255), this.getRandomInt(255), this.getRandomInt(255), 20]
            );
        }

        let p: p5 = global.p5Scene.sketchInstance;
        let gravityDirection = config.scrollDirection === ScrollDirection.Down ? 1 : -1;
        let gravity: p5.Vector = p.createVector(0, 2000 * gravityDirection);
        this.particleSystems = [];
        for (let i = 0; i < this.numTracks; i++) {
            this.particleSystems.push(new ParticleSystem(AccuracyFeedbackParticles.particlesLifetimeInSeconds, gravity));
        }
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    public draw(currentTimeInSeconds: number) {
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            this.particleSystems[trackNumber].draw(currentTimeInSeconds);
        }
    }

    public addParticlesForAccuracyEvent(accuracyEvent: AccuracyEvent) {
        let p: p5 = global.p5Scene.sketchInstance;
        if (this.isEventForParticles(accuracyEvent)) {
            let receptorTimePosition = accuracyEvent.timeInSeconds - accuracyEvent.accuracyMillis / 1000;
            let initialPosition = this.getInitialPosition(p, accuracyEvent.trackNumber, this.numTracks,
                receptorTimePosition);
            let initialVelocity = p.createVector(0, -500);
            let particleSettings: {color: p5.Color, numParticles: number } = this.getParticleSettings(accuracyEvent);
            this.particleSystems[accuracyEvent.trackNumber].addParticles(initialPosition, initialVelocity,
                accuracyEvent.timeInSeconds, particleSettings.numParticles, particleSettings.color);
        }
    }

    private getInitialPosition(p: p5, trackNumber: number, numTracks: number, centerTimeInSeconds: number) {
        let centerX = this.displayManager.getNoteCenterX(trackNumber, numTracks);
        let centerY = this.displayManager.getNoteCenterY(centerTimeInSeconds, centerTimeInSeconds);
        return p.createVector(centerX, centerY);
    }

    private isEventForParticles(accuracyEvent: AccuracyEvent) {
        let accuracies = this.config.accuracySettings;
        if (accuracies[0].lowerBound == null &&
            accuracyEvent.accuracyMillis < accuracies[0].upperBound) {
            return false; // Handle miss if it exists
        }
        if (accuracies[accuracies.length - 1].upperBound == null &&
            accuracyEvent.accuracyMillis >= accuracies[accuracies.length - 1].lowerBound) {
            return false; // Handle boo if it exists
        }

        return true;
    }

    // Assumes symmetrical accuracy settings
    private getParticleSettings(accuracyEvent: AccuracyEvent) {
        let accuracies = this.config.accuracySettings;
        let accuracyRank = this.getAccuracyRank(accuracyEvent, accuracies);
        let particleSettings = this.particleSettings[accuracyRank - 1];
        let p: p5 = global.p5Scene.sketchInstance;
        return {color: p.color(particleSettings[0], particleSettings[1], particleSettings[2]),
            numParticles: particleSettings[3]};
    }

    // Assumes symmetrical accuracy settings
    private getNumColoredAccuracyRanks(accuracies: Accuracy[]) {
        let bestAccuracyIndex = this.getBestAccuracyIndex(accuracies);
        let numRanks = 1; // start with 1 because we at least have the best rank
        for (let i = bestAccuracyIndex + 1; i < accuracies.length; i++) {
            let accuracy: Accuracy = accuracies[i];
            if (accuracy.lowerBound !== undefined && accuracy.upperBound !== undefined) {
                numRanks++;
            }
        }
        return numRanks
    }

    private getBestAccuracyIndex(accuracies: Accuracy[]) {
        for (let i = 0; i < accuracies.length; i++) {
            let accuracy: Accuracy = accuracies[i];
            if (accuracy.lowerBound < 0 && 0 <= accuracy.upperBound) {
                return i;
            }
        }
        return null;
    }

    // Returns a rank where 1 is the best
    private getAccuracyRank(accuracyEvent: AccuracyEvent, accuracies: Accuracy[]) {
        if (accuracyEvent.accuracyMillis < 0) {
            accuracies = this.getReversed(accuracies);
        }
        let bestAccuracyIndex = this.getBestAccuracyIndex(accuracies);
        let currentRank = 1;
        for (let i = bestAccuracyIndex; i < accuracies.length; i++) {
            let accuracy = accuracies[i];
            if (accuracy.lowerBound < accuracyEvent.accuracyMillis && accuracyEvent.accuracyMillis <= accuracy.upperBound) {
                return currentRank;
            }
            currentRank++;
        }
    }

    private getReversed(array: any[]) {
        let arrayCopy: any[] = [];
        for (let i = array.length - 1; i >= 0; i--) {
            arrayCopy.push(array[i]);
        }
        return arrayCopy;
    }
}

class Particle {
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

class ParticleSystem {
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
        while(this.oldestParticleAge(currentTimeInSeconds) > this.particleLifetimeInSeconds) {
            this.removeOldestParticle();
        }
        for ( let i = 0; i < this.particles.length; i++) {
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

    public addParticles(initialPosition: p5.Vector, initialVelocity: p5.Vector, creationTimeInSeconds: number,
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
            new Particle(initialPosition, initialVelocity, this.constantAcceleration,creationTimeInSeconds, color));
    }
}