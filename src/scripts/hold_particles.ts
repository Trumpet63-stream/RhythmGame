import {ParticleSystem} from "./particle_system";
import * as p5 from "p5";
import {global} from "./index";
import {ScrollDirection} from "./scroll_direction";
import {Config} from "./config";
import {DisplayManager} from "./display_manager";

export class HoldParticles {
    private numTracks: number;
    private displayManager: DisplayManager;
    private particleSystems: ParticleSystem[];
    private previousParticleTimestamps: number[];
    private static particlesLifetimeInSeconds: number = 1.5;
    private static dontDrawFlag: number = -1;
    private static particlePeriodInSeconds: number = 0.05;

    constructor(config: Config, numTracks: number, displayManager: DisplayManager) {
        this.numTracks = numTracks;
        this.displayManager = displayManager;
        let p: p5 = global.p5Scene.sketchInstance;
        let gravityDirection = config.scrollDirection === ScrollDirection.Down ? 1 : -1;
        let gravity: p5.Vector = p.createVector(0, 2000 * gravityDirection);

        this.particleSystems = [];
        for (let i = 0; i < numTracks; i++) {
            this.particleSystems.push(new ParticleSystem(HoldParticles.particlesLifetimeInSeconds, gravity));
        }

        this.previousParticleTimestamps = [];
        for (let i = 0; i < numTracks; i++) {
            this.previousParticleTimestamps.push(HoldParticles.dontDrawFlag);
        }
    }

    public draw(currentTimeInSeconds: number) {
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            this.addParticlesToTrack(trackNumber, currentTimeInSeconds);
            this.particleSystems[trackNumber].draw(currentTimeInSeconds);
        }
    }

    private addParticlesToTrack(trackNumber: number, currentTimeInSeconds: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        if (this.previousParticleTimestamps[trackNumber] !== HoldParticles.dontDrawFlag) {
            while (this.previousParticleTimestamps[trackNumber] + HoldParticles.particlePeriodInSeconds < currentTimeInSeconds) {
                let newTimestamp = this.previousParticleTimestamps[trackNumber] + HoldParticles.particlePeriodInSeconds;
                let receptorTimePosition = currentTimeInSeconds;
                let initialPosition = this.getInitialPosition(p, trackNumber, this.numTracks, receptorTimePosition);
                let initialVelocity = p.createVector(0, -500);
                this.particleSystems[trackNumber].addRandomizedParticles(initialPosition, initialVelocity, newTimestamp,
                    1, p.color(0, 255, 0, 150));
                this.previousParticleTimestamps[trackNumber] = newTimestamp;
            }
        }
    }

    private getInitialPosition(p: p5, trackNumber: number, numTracks: number, centerTimeInSeconds: number) {
        let centerX = this.displayManager.getNoteCenterX(trackNumber, numTracks);
        let centerY = this.displayManager.getNoteCenterY(centerTimeInSeconds, centerTimeInSeconds);
        return p.createVector(centerX, centerY);
    }

    public holdTrack(trackNumber: number, currentTimeInSeconds: number) {
        this.previousParticleTimestamps[trackNumber] = currentTimeInSeconds;
    }

    public unholdTrack(trackNumber: number) {
        this.previousParticleTimestamps[trackNumber] = HoldParticles.dontDrawFlag;
    }
}