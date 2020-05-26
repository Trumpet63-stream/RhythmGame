import * as p5 from "p5";
import {FullParse, getFullParse, getPartialParse, Note, NoteState, NoteType, PartialParse} from "./parsing";
import {parseSwf} from "./parse_swf";

export enum StepfileState {
    NO_SIMFILE,
    DONE_READING,
    PARTIALLY_PARSED,
    FULLY_PARSED,
    ERROR,
}

export class Stepfile {
    public state: StepfileState;
    public file: File;
    public partialParse: PartialParse;
    public fullParse: FullParse;

    public constructor() {
        this.state = StepfileState.NO_SIMFILE;
    }

    public load(file: p5.File) {
        this.file = file.file; // this unwraps the p5.File wrapper to get the original DOM file
        loadTextFile(this.file, ((event: ProgressEvent<FileReader>) => {
            this.state = StepfileState.DONE_READING;
            this.partialParse = getPartialParse(<string>event.target.result);
            if (this.partialParse.modes.length < 1) {
                this.state = StepfileState.ERROR;
            } else {
                this.state = StepfileState.PARTIALLY_PARSED;
            }
        }));
    }

    public loadBeatmap(beatmap: [number, string, string][]) {
        let tracks: Note[][] = beatmapToTrackArray(beatmap);

        let partialParse = new PartialParse();
        partialParse.modes = [new Map<string, string>()];
        partialParse.metaData = new Map<string, string>();
        this.partialParse = partialParse;

        let fullParse = new FullParse(partialParse);
        fullParse.tracks = tracks;
        this.fullParse = fullParse;

        this.state = StepfileState.FULLY_PARSED;
        console.log("STEPFILE PARSED!");
    }

    public finishParsing(modeIndex: number) {
        if (this.state === StepfileState.PARTIALLY_PARSED) {
            this.fullParse = getFullParse(modeIndex, this.partialParse);
            this.state = StepfileState.FULLY_PARSED;
        }
    }
}

function loadTextFile(
    file: File,
    listener: (event: ProgressEvent<FileReader>) => any,
    options?: boolean | AddEventListenerOptions
) {
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener("loadend", listener, options);
}

export function beatmapToTrackArray(beatmap: [number, string, string][]) {
    let tracks: Note[][] = [];
    for (let i = 0; i < 4; i++) {
        tracks.push([]);
    }

    for (let i = 0; i < beatmap.length; i++) {
        let beatmapRow = beatmap[i];
        let trackNumber = trackNumberFromDirection(beatmapRow[1]);
        let note = noteFromBeatmapRow(beatmapRow);
        tracks[trackNumber].push(note);
    }

    return tracks;
}

function noteFromBeatmapRow(row: [number, string, string]): Note {
    let timeInSeconds = row[0] / 30;
    return {timeInSeconds: timeInSeconds, type: NoteType.NORMAL, state: NoteState.DEFAULT, typeString: "N/A"};
}

function trackNumberFromDirection(direction: string): number {
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