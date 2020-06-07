import {Config} from "./config";
import {Stepfile} from "./stepfile";
import {AudioFile} from "./audio_file";
import {P5Scene} from "./p5_scene";

export const global: any = {};
global.p5Scene = new P5Scene();
global.config = Config.load();
global.stepfile = new Stepfile();
global.audioFile = new AudioFile();
global.globalClass = "game";
