import * as p5 from "p5";
import {KeyboardEventManager} from "./keyboard_event_manager";
import {PreviewDisplay} from "./pages/options/preview_display";
import {PageManager} from "./pages/page_manager";
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
                // renderer.center(); // Disable this for now to make embedding work
            }

            p.preload = function () {
                global.noteSkin = new NoteSkin(
                    p.loadImage("../assets/arrow_blue_v3.png"),
                    p.loadImage("../assets/connector_tile_resize.png"),
                    p.loadImage("../assets/tail_square.png"),
                    p.loadImage("../assets/arrow_receptor.png")
                );
                global.playFromFileBackground = p.loadImage("../assets/play_from_file_background.jpg");
                global.optionsBackground = global.playFromFileBackground;
                global.meterNeedle = p.loadImage("../assets/meter_needle.png");
                global.meterFont = p.loadFont("../assets/RobotoMono-Bold.ttf");
            }

            p.setup = function () {
                renderer = p.createCanvas(width, height);
                renderer.addClass(global.globalClass);
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