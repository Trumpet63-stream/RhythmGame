import {AccuracyRecording, AccuracyRecordingEntry, Replay} from "./accuracy_recording";
import {Note, NoteType} from "./parsing/parse_sm";
import {SHA3} from "sha3";
import {NoteManager} from "./note_manager";
import {ScoreProvider} from "./score_provider";

interface LocalStorageNote {
    noteType: NoteType;
    timeInSeconds: number;
    trackNumber: number;
}

export abstract class LocalStorage {
    private static allEntries: { key: string, value: string }[] = [];

    public static saveReplay(recording: AccuracyRecording, noteManager: NoteManager, songTitle: string): void {
        let replays: Replay[] | null = this.loadReplays(noteManager.tracks);
        if (replays === null) {
            replays = [];
        }
        let newReplay: Replay = {
            songTitle: songTitle,
            numTracks: noteManager.tracks.length,
            numNotes: noteManager.getTotalNotes(),
            entries: recording.linearRecording
        };
        replays.push(newReplay);
        let key: string = this.getKeyFromTracks(noteManager.tracks);
        let value: string = this.replaysToString(replays);
        console.log("saving replay to local storage with key: \n" + key);
        this.setItem(key, value);
    }

    private static replaysToString(replays: Replay[]): string {
        let censoredReplays: any[] = [];
        for (let i = 0; i < replays.length; i++) {
            let replay = replays[i];
            censoredReplays.push({
                songTitle: replay.songTitle,
                numTracks: replay.numTracks,
                numNotes: replay.numNotes,
                entries: this.censor(replay.entries)
            })
        }
        return JSON.stringify(censoredReplays);
    }

    private static censor(entries: AccuracyRecordingEntry[]): any[] {
        let censoredEntries: any = [];
        for (let i = 0; i < entries.length; i++) {
            let entry: AccuracyRecordingEntry = entries[i];
            censoredEntries.push({
                trackNumber: entry.trackNumber,
                timeInSeconds: entry.timeInSeconds,
                accuracyMillis: this.censorNumber(entry.accuracyMillis),
                noteType: entry.noteType
            })
        }
        return censoredEntries;
    }

    private static censorNumber(x: number): any {
        if (x === Infinity) {
            return "Infinity";
        } else if (x === -Infinity) {
            return "-Infinity";
        }
        return x;
    }

    private static uncensor(entries: any[]): AccuracyRecordingEntry[] {
        let uncensoredEntries: AccuracyRecordingEntry[] = [];
        for (let i = 0; i < entries.length; i++) {
            let entry: any = entries[i];
            uncensoredEntries.push({
                trackNumber: entry.trackNumber,
                timeInSeconds: entry.timeInSeconds,
                accuracyMillis: this.uncensorNumber(entry.accuracyMillis),
                noteType: entry.noteType
            })
        }
        return uncensoredEntries;
    }

    private static uncensorNumber(x: any): number {
        if (x === "Infinity") {
            return Infinity;
        } else if (x === "-Infinity") {
            return -Infinity;
        }
        return x;
    }

    public static loadPBReplay(identifier: Note[][] | number | string, scoreProvider: ScoreProvider): Replay | null {
        let replays: Replay[] | null = this.loadReplays(identifier);
        if (replays === null) {
            return null;
        }
        return this.getBestReplay(replays, scoreProvider);
    }

    //TODO: move this method out of this class
    public static getBestReplay(replays: Replay[], scoreProvider: ScoreProvider) {
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

    public static loadReplays(identifier: Note[][] | number | string): Replay[] | null {
        let key: string = this.getKeyFromIdentifier(identifier);
        let replayString: string = this.getItem(key);
        if (replayString !== null) {
            console.log("loaded replays");
            return this.stringToReplays(replayString);
        } else {
            console.log("no replays to load");
        }
        return null;
    }

    private static getKeyFromIdentifier(identifier: Note[][] | number | string) {
        if (this.isTracks(identifier)) {
            return this.getKeyFromTracks(<Note[][]>identifier);
        } else if (typeof identifier === "number") {
            return this.key(<number>identifier);
        } else {
            return <string>identifier;
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

    private static stringToReplays(s: string): Replay[] {
        let replays: any[] = JSON.parse(s);
        for (let i = 0; i < replays.length; i++) {
            let replay: any = replays[i];
            replay.entries = this.uncensor(replay.entries);
        }
        return replays;
    }

    private static getKeyFromTracks(tracks: Note[][]) {
        let hash: SHA3 = new SHA3(512);
        let convertedNotes: LocalStorageNote[][] = this.convertNotes(tracks);
        let notesString: string = JSON.stringify(convertedNotes);
        hash.update(notesString);
        return hash.digest("hex");
    }

    private static convertNotes(tracks: Note[][]): LocalStorageNote[][] {
        let convertedNotes: LocalStorageNote[][] = [];
        for (let i = 0; i < tracks.length; i++) {
            convertedNotes.push([]);
            for (let j = 0; j < tracks[i].length; j++) {
                let note: Note = tracks[i][j];
                convertedNotes[i].push({
                    noteType: note.type,
                    timeInSeconds: note.timeInSeconds,
                    trackNumber: note.trackNumber
                });
            }
        }
        return convertedNotes;
    }

    public static getNumEntries(): number {
        return this.allEntries.length;
    }

    public static getEntries(): { key: string, value: string }[] {
        return this.allEntries;
    }

    public static async loadAllEntries() {
        let storageLength: number | null = this.getLength();
        if (storageLength === null) {
            return;
        }
        for (let i = 0; i < storageLength; i++) {
            let key: string = this.key(i);
            let value: string = this.getItem(key);
            LocalStorage.allEntries[i] = {key: key, value: value};
        }
        let extraEntries = LocalStorage.allEntries.length - storageLength;
        if (extraEntries > 0) {
            LocalStorage.allEntries.slice(-extraEntries);
        }
    }

    public static getItem(key: string): string | null {
        if (window.localStorage === null) {
            this.unableToAccessLocalStorage();
            return null;
        }
        return window.localStorage.getItem(key);
    }

    public static setItem(key: string, value: string): void {
        if (window.localStorage === null) {
            this.unableToAccessLocalStorage();
            return;
        }
        window.localStorage.setItem(key, value);
    }

    private static key(index: number): string | null {
        if (window.localStorage === null) {
            this.unableToAccessLocalStorage();
            return null;
        }
        return window.localStorage.key(index);
    }

    private static getLength(): number | null {
        if (window.localStorage === null) {
            this.unableToAccessLocalStorage();
            return null;
        }
        return window.localStorage.length
    }

    private static unableToAccessLocalStorage(): void {
        console.error("Unable to access local storage. Try allowing all cookies for this website.");
    }
}