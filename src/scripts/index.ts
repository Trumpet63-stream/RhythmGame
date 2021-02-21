import {P5Scene} from "./p5_scene";
import {OnlinePlaylist} from "./pages/play_from_online/online_playlist";
import {StorageList} from "./pages/storage/storage_list";
import {OfflineStorageClient} from "./offline_storage_client/offline_storage_client";

export const global: any = {};
global.p5Scene = new P5Scene();
global.globalClass = "game";
global.onlinePlaylist = new OnlinePlaylist();
OfflineStorageClient.loadConfig()
    .then((config) => global.config = config)
    .then(() => global.storageList = new StorageList(global.config))
global.experimentConfig = {
    hardStdDev: 35,
    numTracks: 4,
    chordSizeSequence: ["1A"],
    patternSelected: "Stream",
};
