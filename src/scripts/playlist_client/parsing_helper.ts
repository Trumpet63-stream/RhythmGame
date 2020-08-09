import {Note, NoteState, NoteType} from "../parsing/parse_sm";

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
            typeString: "N/A",
            trackNumber: trackNumber
        };
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
