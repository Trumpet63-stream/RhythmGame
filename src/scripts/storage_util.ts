import {SHA3} from "sha3";
import {Note, NoteType} from "./note";

export interface ConvertedNote {
    noteType: NoteType;
    timeInSeconds: number;
    trackNumber: number;
}

export abstract class StorageUtil {
    public static getKeyFromTracks(tracks: Note[][]): string {
        let hash: SHA3 = new SHA3(512);
        let convertedNotes: ConvertedNote[][] = this.convertNotes(tracks);
        let notesString: string = JSON.stringify(convertedNotes);
        hash.update(notesString);
        return hash.digest("hex");
    }

    private static convertNotes(tracks: Note[][]): ConvertedNote[][] {
        let convertedNotes: ConvertedNote[][] = [];
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