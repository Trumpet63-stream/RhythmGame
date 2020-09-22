import {DisplayConfig} from "./display_manager";
import {ScrollDirection} from "./scroll_direction";
import {Config} from "./config";

export class PlayingConfig implements DisplayConfig {
    private readonly noteSize: number;
    private readonly noteSpacing: number;
    private readonly pixelsPerSecond: number;
    private readonly receptorYPercent: number;
    private readonly scrollDirection: ScrollDirection;
    private readonly receptorSizes: number[];

    constructor(config: Config, numTracks: number) {
        this.noteSize = config.noteSize;
        this.noteSpacing = config.noteSpacing;
        this.pixelsPerSecond = config.pixelsPerSecond;
        this.receptorYPercent = config.receptorYPercent;
        this.scrollDirection = config.scrollDirection;
        this.receptorSizes = [];
        for (let i = 0; i < numTracks; i++) {
            this.receptorSizes.push(config.noteSize);
        }
    }

    getNoteSize(): number {
        return this.noteSize;
    }

    getNoteSpacing(): number {
        return this.noteSpacing;
    }

    getPixelsPerSecond(): number {
        return this.pixelsPerSecond;
    }

    getReceptorSizes(): number[] {
        return this.receptorSizes;
    }

    getReceptorYPercent(): number {
        return this.receptorYPercent;
    }

    getScrollDirection(): ScrollDirection {
        return this.scrollDirection;
    }

    setReceptorSize(trackNumber: number, receptorSize: number): void {
        this.receptorSizes[trackNumber] = receptorSize;
    }
}