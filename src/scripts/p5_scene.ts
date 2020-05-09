import * as p5 from "p5";
import {KeyboardEventManager} from "./keyboard_event_manager";
import {PreviewDisplay} from "./preview_display";
import {PageManager} from "./page_manager";
import {global} from "./index";
import {generatePreviewNotes} from "./util";
import {NoteSkin} from "./note_skin";

let width = 720;
let height = 480;

export class P5Scene {
    sketchInstance: p5;

    constructor() {
        this.sketchInstance = new p5((p: p5) => {
            let renderer: p5.Renderer;

            function centerCanvas() {
                renderer.center();
            }

            p.preload = function () {
                global.noteSkin = new NoteSkin(
                    p.loadImage("../assets/80_arrow_up_solid.png"),
                    p.loadImage("../assets/80_connector_tile_gradient.png"),
                    p.loadImage("../assets/80_tail_solid.png")
                );
                global.optionsBackground = p.loadImage("../assets/background.jpg");
            }

            p.setup = function () {
                renderer = p.createCanvas(width, height);
                global.keyboardEventManager = new KeyboardEventManager(p);
                global.previewDisplay = new PreviewDisplay(generatePreviewNotes(4), global.config, global.p5Scene);
                renderer.style('display', 'block'); // Makes the canvas be able to fill the whole browser window
                centerCanvas();
            };

            p.draw = function () {
                p.clear();
                PageManager.draw();
            };

            p.windowResized = function () {
                centerCanvas();
            };
        });
    }
}