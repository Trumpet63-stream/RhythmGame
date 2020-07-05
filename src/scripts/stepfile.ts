import {FullParse, getFullParse, getPartialParse, Note, PartialParse} from "./parsing/parse_sm";
import {ParsingHelper} from "./playlist_client/parsing_helper";

export enum StepfileState {
    NO_STEPFILE,
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
        this.state = StepfileState.NO_STEPFILE;
    }

    public loadFile(file: File) {
        this.file = file;
        this.loadTextFile(this.file, ((event: ProgressEvent<FileReader>) => {
            this.state = StepfileState.DONE_READING;
            this.partialParse = getPartialParse(<string>event.target.result);
            if (this.partialParse.modes.length < 1) {
                this.state = StepfileState.ERROR;
            } else {
                this.state = StepfileState.PARTIALLY_PARSED;
            }
        }));
    }

    public loadFfrBeatmap(beatmap: [number, string, string][]) {
        let tracks: Note[][] = ParsingHelper.beatmapToTrackArray(beatmap);

        let partialParse = new PartialParse();
        partialParse.modes = [new Map<string, string>()];
        partialParse.metaData = new Map<string, string>();
        this.partialParse = partialParse;

        let fullParse = new FullParse(partialParse);
        fullParse.tracks = tracks;
        this.fullParse = fullParse;

        this.state = StepfileState.FULLY_PARSED;
    }

    public finishParsing(modeIndex: number) {
        if (this.state === StepfileState.PARTIALLY_PARSED || this.state === StepfileState.FULLY_PARSED) {
            this.fullParse = getFullParse(modeIndex, this.partialParse);
            this.state = StepfileState.FULLY_PARSED;
        }
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
}