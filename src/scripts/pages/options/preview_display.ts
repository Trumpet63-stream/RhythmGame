import {DisplayConfig, DisplayManager} from "../../display_manager";
import {NoteManager} from "../../note_manager";
import {P5Scene} from "../../p5_scene";
import {ScrollManager} from "../../scroll_manager";
import {Note} from "../../parsing/parse_sm";
import {Config} from "../../config";
import {Rectangle} from "../../rectangle";

export class PreviewDisplay {
    private scene: P5Scene;
    private config: Config;
    private noteManager: NoteManager;
    private scrollManager: ScrollManager;
    private displayManager: DisplayManager;
    private displayConfig: DisplayConfig;
    protected bounds: Rectangle = Rectangle.fromTopLeft(
        65,
        46,
        200,
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
        let receptorSizes: number[] = [];
        for (let i = 0; i < numTracks; i++) {
            receptorSizes.push(config.noteSize);
        }

        return {
            getNoteSize: () => {
                return config.noteSize;
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
                return receptorSizes;
            },
            setReceptorSize: (trackNumber: number, receptorSize: number) => {
            }
        };
    }
}
