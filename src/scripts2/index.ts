import * as p5 from "p5";
import {Config} from "../scripts2/config";
import {PreviewDisplay} from "../scripts/preview_display";
import {NoteState, NoteType} from "../scripts/parsing";
import {KeyboardEventManager} from "./keyboard_event_manager";
import {PageManager} from "./page_manager";
import {Simfile} from "./simfile";
import {AudioFile} from "./audio_file";
import {AccuracyRecording} from "./accuracy_recording";

let width = 720;
let height = 480;

class P5Scene {
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
                global.previewDisplay = new PreviewDisplay(global.previewNotes, global.config, global.p5Scene);
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

export const global: any = {};
global.p5Scene = new P5Scene();
global.config = new Config({});
global.simfile = new Simfile();
global.audioFile = new AudioFile();
global.previewNotes = [
    [{type: NoteType.NORMAL, timeInSeconds: 0.1, state: NoteState.DEFAULT}, {
        type: NoteType.NONE,
        timeInSeconds: 0.35,
        state: NoteState.DEFAULT
    }],
    [{type: NoteType.HOLD_HEAD, timeInSeconds: 0.2, state: NoteState.DEFAULT}, {
        type: NoteType.TAIL,
        timeInSeconds: 0.5,
        state: NoteState.DEFAULT
    }],
    [{type: NoteType.MINE, timeInSeconds: 0.3, state: NoteState.DEFAULT}],
    [{type: NoteType.ROLL_HEAD, timeInSeconds: 0.4, state: NoteState.DEFAULT}, {
        type: NoteType.TAIL,
        timeInSeconds: 0.55,
        state: NoteState.DEFAULT
    }]
];
global.playingNotes = [
    [
        {type: NoteType.NORMAL, timeInSeconds: 1.1, state: NoteState.DEFAULT},
        {type: NoteType.NORMAL, timeInSeconds: 1.3, state: NoteState.DEFAULT},
        {type: NoteType.NORMAL, timeInSeconds: 1.5, state: NoteState.DEFAULT},
        {type: NoteType.NORMAL, timeInSeconds: 1.7, state: NoteState.DEFAULT},
        {type: NoteType.NORMAL, timeInSeconds: 1.9, state: NoteState.DEFAULT},
    ],
    [
        {type: NoteType.HOLD_HEAD, timeInSeconds: 2.2, state: NoteState.DEFAULT},
        {type: NoteType.TAIL, timeInSeconds: 2.5, state: NoteState.DEFAULT}
    ],
    [
        {type: NoteType.MINE, timeInSeconds: 2.3, state: NoteState.DEFAULT}
    ],
    [
        {type: NoteType.ROLL_HEAD, timeInSeconds: 2.4, state: NoteState.DEFAULT},
        {type: NoteType.TAIL, timeInSeconds: 2.55, state: NoteState.DEFAULT}
    ]
];