import {DisplayManager} from "./display_manager";
import {NoteManager} from "./note_manager";
import {P5Scene} from "./p5_scene";
import {ScrollManager} from "./scroll_manager";
import {Note} from "./parsing";
import {Config} from "../scripts2/config";

export class PreviewDisplay {
    private scene: P5Scene;
    config: Config;
    noteManager: NoteManager;
    private scrollManager: ScrollManager;
    private displayManager: DisplayManager;

    constructor(tracks: Note[][], config: Config, scene: P5Scene) {
        this.config = config;
        this.scene = scene;
        this.noteManager = new NoteManager(tracks);
        this.scrollManager = new ScrollManager(this.config);
        this.displayManager = new DisplayManager(this.noteManager, this.config, this.scene.sketchInstance);
    }

    draw() {
        this.displayManager.draw(this.scrollManager.getGameTime());
    }

    remove() {
        this.scene.remove();
    }
}
