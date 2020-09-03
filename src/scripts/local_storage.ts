import {AccuracyRecording, Replay} from "./accuracy_recording";
import {Note} from "./parsing/parse_sm";
import {SHA3} from "sha3";
import {NoteManager} from "./note_manager";

export abstract class LocalStorage {
    public static saveReplay(recording: AccuracyRecording, noteManager: NoteManager): void {
        let key: string = this.getSongKey(noteManager.tracks);
        let replay: Replay = {
            numTracks: noteManager.tracks.length,
            numNotes: noteManager.getTotalNotes(),
            entries: recording.linearRecording
        };
        let replayString: string = JSON.stringify(replay);
        window.localStorage.setItem(key, replayString);
        console.log("replay saved");
        console.log(key);
    }

    public static loadReplay(tracks: Note[][]): Replay {
        let key: string = this.getSongKey(tracks);
        console.log(key);
        let replayString: string = window.localStorage.getItem(key);
        if (replayString !== null) {
            console.log("loaded replay");
        } else {
            console.log("no replay to load");
        }
        return JSON.parse(replayString);
    }

    private static getSongKey(tracks: Note[][]) {
        let hash: SHA3 = new SHA3(512);
        let notesString: string = JSON.stringify(tracks);
        hash.update(notesString);
        return hash.digest("hex");
    }
}