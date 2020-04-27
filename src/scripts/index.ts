import {Config} from "./config";
import {NoteState, NoteType} from "./parsing";
import {Stepfile} from "./stepfile";
import {AudioFile} from "./audio_file";
import {P5Scene} from "./p5_scene";

export const global: any = {};
global.p5Scene = new P5Scene();
global.config = new Config({});
global.stepfile = new Stepfile();
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