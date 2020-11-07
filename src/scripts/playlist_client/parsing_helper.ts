import {Note, NoteState, NoteType} from "../stepfile";

export abstract class ParsingHelper {
    public static beatmapToTrackArray(beatmap: [number, string, string][]) {
        let tracks: Note[][] = [[], [], [], []];
        for (let i = 0; i < beatmap.length; i++) {
            let beatmapRow = beatmap[i];
            let trackNumber = this.trackNumberFromDirection(beatmapRow[1]);
            let note = this.noteFromBeatmapRow(beatmapRow, trackNumber);
            tracks[trackNumber].push(note);
        }

        return tracks;
    }

    private static noteFromBeatmapRow(row: [number, string, string], trackNumber: number): Note {
        let timeInSeconds = row[0] / 30;
        return {
            timeInSeconds: timeInSeconds,
            type: NoteType.NORMAL,
            state: NoteState.DEFAULT,
            trackNumber: trackNumber,
            beatFraction: this.colorToBeatFraction(row[2])
        };
    }

    private static colorToBeatFraction(color: string): number {
        switch (color) {
            case "red":
                return 4;
            case "blue":
                return 8;
            case "purple":
                return 12;
            case "yellow":
                return 16;
            case "pink":
                return 24;
            case "orange":
                return 32;
            case "cyan":
                return 48;
            case "green":
                return 64;
            case "white":
                return 192;
            default:
                return 192;
        }
    }

    private static trackNumberFromDirection(direction: string): number {
        switch (direction) {
            case "L":
                return 0;
                break;
            case "D":
                return 1;
                break;
            case "U":
                return 2;
                break;
            case "R":
                return 3;
                break;
            default:
                throw "Unknown track direction '" + direction + "'";
        }
    }
}
