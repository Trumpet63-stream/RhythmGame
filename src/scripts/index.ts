import {Config} from "./config";
import {P5Scene} from "./p5_scene";
import {OnlinePlaylist} from "./pages/play_from_online/online_playlist";

export const global: any = {};
global.p5Scene = new P5Scene();
global.config = Config.load();
global.globalClass = "game";
global.onlinePlaylist = new OnlinePlaylist();