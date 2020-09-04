import {AccuracyRecording, AccuracyRecordingEntry, Replay} from "./accuracy_recording";
import {Note, NoteType} from "./parsing/parse_sm";
import {SHA3} from "sha3";
import {NoteManager} from "./note_manager";

interface LocalStorageNote {
    noteType: NoteType;
    timeInSeconds: number;
    trackNumber: number;
}

export abstract class LocalStorage {
    public static saveReplay(recording: AccuracyRecording, noteManager: NoteManager): void {
        let key: string = this.getSongKey(noteManager.tracks);
        let replay: Replay = {
            numTracks: noteManager.tracks.length,
            numNotes: noteManager.getTotalNotes(),
            entries: this.censor(recording.linearRecording)
        };
        let replayString: string = JSON.stringify(replay);
        window.localStorage.setItem(key, replayString);
        console.log("replay saved");
        console.log(key);
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

    public static loadReplay(tracks: Note[][]): Replay | null {
        let key: string = this.getSongKey(tracks);
        console.log(key);
        let replayString: string = window.localStorage.getItem(key);
        if (replayString !== null) {
            console.log("loaded replay");
            let replay: any = JSON.parse(replayString);
            replay.entries = this.uncensor(replay.entries);
            return replay
        } else {
            console.log("no replay to load");
        }
        return null;
    }

    private static getSongKey(tracks: Note[][]) {
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
}