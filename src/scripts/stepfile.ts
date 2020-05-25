import * as p5 from "p5";
import {FullParse, getFullParse, getPartialParse, PartialParse} from "./parsing";
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

    public loadSwf(file: p5.File) {
        this.file = file.file; // this unwraps the p5.File wrapper to get the original DOM file
        parseSwf(this.file);
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