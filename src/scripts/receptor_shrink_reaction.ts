import {Config} from "./config";
import {DisplayConfig} from "./display_manager";

export class ReceptorShrinkReaction {
    private trackHoldStates: boolean[];
    private config: Config;
    private displayConfig: DisplayConfig;
    private numTracks: number;

    constructor(config: Config, displayConfig: DisplayConfig, numTracks: number) {
        this.config = config;
        this.displayConfig = displayConfig;
        this.numTracks = numTracks;
        this.trackHoldStates = [];
        for (let i = 0; i < numTracks; i++) {
            this.trackHoldStates.push(false);
        }
    }

    public holdTrack(trackNumber: number) {
        this.trackHoldStates[trackNumber] = true;
    }

    public releaseTrack(trackNumber: number) {
        this.trackHoldStates[trackNumber] = false;
    }

    public draw() {
        let receptorSizes = this.displayConfig.receptorSizes;
        let shrink = 0.7;
        for (let i = 0; i < receptorSizes.length; i++) {
            let sizeRatio = this.isTrackHeld(i) ? shrink : 1.0;
            receptorSizes[i] = this.config.noteSize * sizeRatio;
        }
    }

    private isTrackHeld(trackNumber: number) {
        return this.trackHoldStates[trackNumber];
    }
}