import {Config} from "./config";
import {DisplayConfig} from "./display_manager";
import {KeyState, PlayerKeyEvent} from "./player_key_action";

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

    public update(playerKeyEvent: PlayerKeyEvent) {
        this.trackHoldStates[playerKeyEvent.track] = playerKeyEvent.keyState === KeyState.DOWN;
    }

    public draw() {
        let numReceptors = this.displayConfig.getReceptorSizes().length;
        let shrink = 0.7;
        for (let i = 0; i < numReceptors; i++) {
            let sizeRatio = this.isTrackHeld(i) ? shrink : 1.0;
            this.displayConfig.setReceptorSize(i, this.config.noteSize * sizeRatio);
        }
    }

    private isTrackHeld(trackNumber: number) {
        return this.trackHoldStates[trackNumber];
    }
}