import * as p5 from "p5";
import {FullParse, getFullParse, getPartialParse, PartialParse} from "../scripts/parsing";
import {Mode} from "../scripts/index";

export enum SimfileState {
    NO_SIMFILE,
    DONE_READING,
    PARTIALLY_PARSED,
    FULLY_PARSED,
}

export class Simfile {
    public state: SimfileState;
    public file: File;
    public partialParse: PartialParse;
    public fullParse: FullParse;

    public constructor() {
        this.state = SimfileState.NO_SIMFILE;
    }

    public load(file: p5.File) {
        this.file = file.file; // this unwraps the p5.File wrapper to get the original DOM file
        loadTextFile(this.file, ((event: ProgressEvent<FileReader>) => {
            this.state = SimfileState.DONE_READING;
            this.partialParse = getPartialParse(<string>event.target.result);
            this.state = SimfileState.PARTIALLY_PARSED;
        }));
    }

    public finishParsing(mode: Mode) {
        if (this.state === SimfileState.PARTIALLY_PARSED) {
            // this.fullParse = getFullParse();
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