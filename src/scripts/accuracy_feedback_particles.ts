import {DisplayManager} from "./display_manager";
import {AccuracyEvent} from "./accuracy_recording";
import {Config} from "./config";
import * as p5 from "p5";
import {global} from "./index";
import {Accuracy} from "./accuracy_manager";
import {ScrollDirection} from "./scroll_direction";
import {ParticleSystem} from "./particle_system";

export class AccuracyFeedbackParticles {
    private config: Config;
    private displayManager: DisplayManager;
    private numTracks: number;
    private numColoredAccuracyRanks: number;
    private static particlesLifetimeInSeconds: number = 1.5;
    private particleSettings: [number, number, number, number][];
    private particleSystems: ParticleSystem[];
    private gravityDirection: number;

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
        this.gravityDirection = config.scrollDirection === ScrollDirection.Down ? 1 : -1;
        let gravity: p5.Vector = p.createVector(0, 2000 * this.gravityDirection);
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
            let initialVelocity = p.createVector(0, -500 * this.gravityDirection);
            let particleSettings: {color: p5.Color, numParticles: number } = this.getParticleSettings(accuracyEvent);
            this.particleSystems[accuracyEvent.trackNumber].addRandomizedParticles(initialPosition, initialVelocity,
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
