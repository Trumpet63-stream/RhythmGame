import {DisplayConfig, DisplayManager} from "../../display_manager";
import {NoteManager} from "../../note_manager";
import {P5Scene} from "../../p5_scene";
import {ScrollManager} from "../../scroll_manager";
import {Note} from "../../stepfile";
import {Config} from "../../config";
import {Rectangle} from "../../rectangle";

export class PreviewDisplay {
    private scene: P5Scene;
    private readonly config: Config;
    private readonly noteManager: NoteManager;
    private scrollManager: ScrollManager;
    private displayManager: DisplayManager;
    private readonly displayConfig: DisplayConfig;
    protected bounds: Rectangle = Rectangle.fromTopLeft(
        45,
        46,
        240,
        400
    );

    constructor(tracks: Note[][], config: Config, scene: P5Scene) {
        this.config = config;
        this.scene = scene;
        this.noteManager = new NoteManager(tracks);
        this.scrollManager = new ScrollManager(this.config, this.scene.sketchInstance, this.bounds);
        this.displayConfig = this.getDisplayConfig(this.config, this.noteManager.tracks.length);
        this.displayManager = new DisplayManager(this.noteManager, this.displayConfig, this.scene.sketchInstance,
            this.bounds);
    }

    draw() {
        let currentTimeInSeconds = this.scrollManager.getCurrentTimeInSeconds();
        this.displayManager.draw(currentTimeInSeconds);
    }

    // We need the display config to update when any changes are made to the Config
    private getDisplayConfig(config: Config, numTracks: number): DisplayConfig {
        return {
            getNoteSize: () => {
                return config.noteSize;
            },
            getNoteSpacing: () => {
                return config.noteSpacing;
            },
            getPixelsPerSecond: () => {
                return config.pixelsPerSecond;
            },
            getReceptorYPercent: () => {
                return config.receptorYPercent;
            },
            getScrollDirection: () => {
                return config.scrollDirection;
            },
            getReceptorSizes: () => {
                let receptorSizes: number[] = [];
                for (let i = 0; i < numTracks; i++) {
                    receptorSizes.push(config.noteSize);
                }
                return receptorSizes;
            },
            setReceptorSize: (trackNumber: number, receptorSize: number) => {
            }
        };
    }
}
