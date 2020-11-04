import {FullParse, getFullParse, getPartialParse, ParsedNoteInfo, PartialParse} from "./parsing/parse_sm";
import {ParsingHelper} from "./playlist_client/parsing_helper";
import {compareModeOptions, getEmpty2dArray} from "./util";

export enum StepfileState {
    NO_STEPFILE,
    DONE_READING,
    PARTIALLY_PARSED,
    FULLY_PARSED,
    ERROR,
}

export enum NoteType {
    NONE,
    NORMAL,
    HOLD_HEAD,
    TAIL,
    ROLL_HEAD,
    MINE,
    UNKNOWN,
}

function stringToNoteType(string: string): NoteType {
    switch (string) {
        case "1":
            return NoteType.NORMAL;
        case "2":
            return NoteType.HOLD_HEAD;
        case "3":
            return NoteType.TAIL;
        case "4":
            return NoteType.ROLL_HEAD;
        case "M":
            return NoteType.MINE;
        default:
            return NoteType.UNKNOWN;
    }
}

export enum NoteState {
    DEFAULT,
    HIT,
    MISSED,
    HELD,
}

export interface Note {
    type: NoteType,
    timeInSeconds: number,
    trackNumber: number,
    state: NoteState,
    beatFraction: number
}

export interface Mode {
    type: string,
    difficulty: string,
    meter: string,
    id: number
}

export class Stepfile {
    public state: StepfileState;
    public file: File;
    private partialParse: PartialParse;
    private fullParse: FullParse;
    public tracks: Note[][];
    public modes: Mode[];
    public songTitle: string = "song title";

    public constructor() {
        this.state = StepfileState.NO_STEPFILE;
    }

    public loadFile(file: File) {
        this.file = file;
        this.songTitle = this.file.name;
        this.loadTextFile(this.file, ((event: ProgressEvent<FileReader>) => {
            this.state = StepfileState.DONE_READING;
            this.partialParse = getPartialParse(<string>event.target.result);
            if (this.partialParse.modes.length < 1) {
                this.state = StepfileState.ERROR;
            } else {
                this.state = StepfileState.PARTIALLY_PARSED;
                this.modes = this.getOrderedModes(this.partialParse.modes);
            }
        }));
    }

    private loadTextFile(
        file: File,
        listener: (event: ProgressEvent<FileReader>) => any,
        options?: boolean | AddEventListenerOptions
    ) {
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.addEventListener("loadend", listener, options);
    }

    private getOrderedModes(modesMap: Map<string, string>[]): Mode[] {
        let modeOptions: Mode[] = [];
        for (let i = 0; i < modesMap.length; i++) {
            let mode: Map<string, string> = modesMap[i];
            modeOptions.push({
                type: mode.get("type"),
                difficulty: mode.get("difficulty"),
                meter: mode.get("meter"),
                id: i
            });
        }
        modeOptions.sort(compareModeOptions);
        return modeOptions;
    }

    public loadFfrBeatmap(beatmap: [number, string, string][], songTitle: string) {
        this.songTitle = songTitle;
        this.tracks = ParsingHelper.beatmapToTrackArray(beatmap);
        this.state = StepfileState.FULLY_PARSED;
    }

    public finishParsing(modeIndex: number) {
        if (this.state === StepfileState.PARTIALLY_PARSED || this.state === StepfileState.FULLY_PARSED) {
            this.fullParse = getFullParse(modeIndex, this.partialParse);
            this.tracks = this.getNotesFromParsedNotes(this.fullParse.tracks);
            this.state = StepfileState.FULLY_PARSED;
        }
    }

    private getNotesFromParsedNotes(parsedTracks: ParsedNoteInfo[][]): Note[][] {
        let tracks: Note[][] = getEmpty2dArray(parsedTracks.length);
        for (let i = 0; i < parsedTracks.length; i++) {
            for (let j = 0; j < parsedTracks[i].length; j++) {
                tracks[i].push(this.getNoteFromParsedNote(parsedTracks[i][j]));
            }
        }
        return tracks;
    }

    private getNoteFromParsedNote(parsedNote: ParsedNoteInfo): Note {
        return {
            state: NoteState.DEFAULT,
            timeInSeconds: parsedNote.timeInSeconds,
            trackNumber: parsedNote.trackNumber,
            type: stringToNoteType(parsedNote.type),
            beatFraction: parsedNote.measure.fraction
        };
    }
}
