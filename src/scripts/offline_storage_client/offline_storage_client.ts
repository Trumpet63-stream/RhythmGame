import {AccuracyRecording, CompressedReplay, Replay} from "../accuracy_recording";
import {NoteManager} from "../note_manager";
import {ScoreProvider} from "../score_provider";
import {StorageUtil} from "../storage_util";
import {OfflineStorage} from "./offline_storage";
import {Config} from "../config";
import {KeyBinding} from "../key_binding_helper";
import {Note} from "../note";
import {ReplayCompressor} from "../replay_compressor";
import {getNowTimestamp} from "../util";

export abstract class OfflineStorageClient {
    private static CONFIG_STORAGE_KEY = "config";

    public static saveReplay(recording: AccuracyRecording, noteManager: NoteManager, songTitle: string): Promise<void> {
        let newReplay: CompressedReplay = {
            songTitle: songTitle,
            numTracks: noteManager.tracks.length,
            numNotes: noteManager.getTotalNotes(),
            timestamp: getNowTimestamp(),
            compressedEntries: ReplayCompressor.compress(recording.linearRecording)
        };
        let key: string = StorageUtil.getKeyFromTracks(noteManager.tracks);
        return this.loadReplaysCompressed(key)
            .then((replays: CompressedReplay[]) => {
                replays.push(newReplay);
                let value: string = this.compressedReplaysToString(replays);
                console.log("saving replay to offline storage with key: \n" + key);
                return OfflineStorage.setItem(key, value);
            })
            .catch((reason) => console.error(reason));
    }

    private static compressedReplaysToString(compressedReplays: CompressedReplay[]): string {
        return JSON.stringify(compressedReplays);
    }

    public static getUncompressedReplay(compressedReplay: CompressedReplay): Replay {
        return {
            songTitle: compressedReplay.songTitle,
            numTracks: compressedReplay.numTracks,
            numNotes: compressedReplay.numNotes,
            timestamp: compressedReplay.timestamp,
            entries: ReplayCompressor.uncompress(compressedReplay.compressedEntries)
        }
    }

    public static loadPBReplay(identifier: Note[][] | number | string, scoreProvider: ScoreProvider): Promise<Replay | null> {
        return this.loadReplays(identifier)
            .then((replays: Replay[]) => {
                if (replays.length === 0) {
                    return null;
                } else {
                    return this.getBestReplay(replays, scoreProvider);
                }
            });
    }

    public static getBestReplay(replays: Replay[], scoreProvider: ScoreProvider): Replay {
        let bestScore: number = Number.NEGATIVE_INFINITY;
        let pbIndex: number = -1;
        for (let i = 0; i < replays.length; i++) {
            let score: number = scoreProvider.score(replays[i].entries).totalScore;
            if (score > bestScore) {
                bestScore = score;
                pbIndex = i;
            }
        }
        return replays[pbIndex];
    }

    public static loadReplays(identifier: Note[][] | number | string): Promise<Replay[]> {
        return this.getKeyFromIdentifier(identifier)
            .then((key: string) => OfflineStorage.getItem(key))
            .then((replayString: string) => {
                if (replayString !== null) {
                    console.log("loaded replays");
                    return this.stringToReplays(replayString);
                } else {
                    console.log("no replays to load");
                    return [];
                }
            });
    }

    public static loadReplaysCompressed(key: string): Promise<CompressedReplay[]> {
        return OfflineStorage.getItem(key)
            .then((replayString: string) => {
                if (replayString !== null) {
                    console.log("loaded replays");
                    return this.stringToCompressedReplays(replayString);
                } else {
                    console.log("no replays to load");
                    return [];
                }
            });
    }

    private static getKeyFromIdentifier(identifier: Note[][] | number | string): Promise<string> {
        if (this.isTracks(identifier)) {
            return Promise.resolve(StorageUtil.getKeyFromTracks(<Note[][]>identifier));
        } else if (typeof identifier === "number") {
            return OfflineStorage.key(<number>identifier);
        } else {
            return Promise.resolve(<string>identifier);
        }
    }

    private static isTracks(object: any): boolean {
        try {
            let firstNote: Note = object[0][0];
            return firstNote.trackNumber !== undefined;
        } catch (e) {
            return false;
        }
    }

    public static iterate(iteratee: (value: string, key: string, iterationNumber: number) => void): Promise<void> {
        return OfflineStorage.iterate(iteratee);
    }

    public static stringToReplays(s: string): Replay[] {
        let compressedReplays: CompressedReplay[] = JSON.parse(s);
        let replays: Replay[] = [];
        for (let i = 0; i < compressedReplays.length; i++) {
            replays.push(this.getUncompressedReplay(compressedReplays[i]));
        }
        return replays;
    }

    private static stringToCompressedReplays(s: string): CompressedReplay[] {
        return JSON.parse(s);
    }

    public static saveConfig(config: Config): Promise<void> {
        let configString = this.getConfigAsString(config);
        console.log("saving config to offline storage");
        return OfflineStorage.setItem(OfflineStorageClient.CONFIG_STORAGE_KEY, configString);
    }

    private static getConfigAsString(config: Config) {
        let string: string = JSON.stringify(config);
        string = string.replace(',"keyBindings":{},',
            ',"keyBindings":' + this.stringifyKeyBindings(config) + ',');
        return string;
    }

    private static stringifyKeyBindings(config: Config): string {
        let string = "[";
        config.keyBindings.forEach((value: KeyBinding[], key: number) => {
            string += "[" + key + "," + JSON.stringify(value) + "]";
        })
        string += "]";
        return string;
    }

    public static loadConfig(): Promise<Config> {
        return OfflineStorage.getItem(OfflineStorageClient.CONFIG_STORAGE_KEY)
            .then((configString: string) => {
                let configJSON = JSON.parse(configString);
                configJSON.keyBindings = new Map(configJSON.keyBindings);
                let config: Config = new Config(configJSON);
                console.log("Config loaded from offline storage");
                console.log(config);
                return config;
            }).catch(() => {
                console.log("No valid offline storage config found, returning default config");
                return new Config({});
            })
    }
}