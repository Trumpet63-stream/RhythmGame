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

            p.setup = function () {
                renderer = p.createCanvas(width, height);
                global.keyboardEventManager = new KeyboardEventManager(p);
                global.previewDisplay = new PreviewDisplay(generatePreviewNotes(4), global.config, global.p5Scene);
                global.noteSkin = new NoteSkin(p.loadImage("../assets/80_arrow_up.png"));
                renderer.style('display', 'block'); // Makes the canvas be able to fill the whole browser window
                centerCanvas();
            };

            p.draw = function () {
                p.clear();
                p.background(200);
                PageManager.draw();
            };

            p.windowResized = function () {
                centerCanvas();
            };
        });
    }
}