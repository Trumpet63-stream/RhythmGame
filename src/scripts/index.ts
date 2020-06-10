import {Config} from "./config";
import {Stepfile} from "./stepfile";
import {AudioFile} from "./audio_file";
import {P5Scene} from "./p5_scene";
import {OnlinePlaylist} from "./online_playlist";

export const global: any = {};
global.p5Scene = new P5Scene();
global.config = new Config({});
global.stepfile = new Stepfile();
global.audioFile = new AudioFile();
global.globalClass = "game";
global.onlinePlaylist = new OnlinePlaylist();