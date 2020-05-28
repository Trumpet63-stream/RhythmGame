import {DisplayConfig, DisplayManager} from "./display_manager";
import {NoteManager} from "./note_manager";
import {P5Scene} from "./p5_scene";
import {ScrollManager} from "./scroll_manager";
import {Note} from "./parsing";
import {Config} from "./config";

export class PreviewDisplay {
    private scene: P5Scene;
    config: Config;
    noteManager: NoteManager;
    private scrollManager: ScrollManager;
    private displayManager: DisplayManager;
    private topLeftX = 65;
    private topLeftY = 55;
    private width = 200;
    private height = 400;
    private displayConfig: DisplayConfig;

    constructor(tracks: Note[][], config: Config, scene: P5Scene) {
        this.config = config;
        this.scene = scene;
        this.noteManager = new NoteManager(tracks);
        this.scrollManager = new ScrollManager(this.config, this.scene.sketchInstance, this.getBounds());
        this.displayConfig = new DisplayConfig(this.config, this.noteManager.tracks.length);
        this.displayManager = new DisplayManager(this.noteManager, this.displayConfig, this.scene.sketchInstance,
            this.topLeftX, this.topLeftY, this.width, this.height);
    }

    draw() {
        this.displayManager.draw(this.scrollManager.getGameTime());
    }

    private getBounds() {
        return {topLeftX: this.topLeftX, topLeftY: this.topLeftY, width: this.width, height: this.height};
    }
}
