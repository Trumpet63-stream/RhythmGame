import * as p5 from "p5";
import {DOMWrapper, drawHeading, setElementCenterPositionRelative} from "./ui_util";
import {global} from "./index";
import {SimfileState} from "./simfile";
import {AudioFileState} from "./audio_file";
import {getModeOptionsForDisplay} from "../scripts/util";
import {Mode} from "../scripts/index";

export abstract class Page1 {
    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;

        let stepfileInput = DOMWrapper.create(() => {
            return p.createFileInput(global.simfile.load.bind(global.simfile), "false");
        }, "setfileInputButton").element;
        setElementCenterPositionRelative(stepfileInput, 0.35, 0.3);

        let audioFileInput = DOMWrapper.create(() => {
            return p.createFileInput(global.audioFile.load.bind(global.audioFile), "false");
        }, "audioFileInputButton").element;
        setElementCenterPositionRelative(audioFileInput, 0.65, 0.3);

        if (isFilesReady()) {
            drawModeSelect(p);
        }
    }
}

function drawModeSelect(p: p5) {
    let sortedModes: Mode[] = getModeOptionsForDisplay(global.simfile.partialParse.modes);
    let modeRadioCreateResult = DOMWrapper.create(() => {
        return p.createRadio();
    }, "modeRadio");
    let modeRadio = modeRadioCreateResult.element;
    setElementCenterPositionRelative(modeRadio, 0.5, 0.6);
    if (!modeRadioCreateResult.alreadyExists) {
        for (let i = 0; i < sortedModes.length; i++) {
            let mode = sortedModes[i];
            let radioLabel = mode.type + ", " + mode.difficulty + ", " + mode.meter;
            // @ts-ignore
            modeRadio.option(radioLabel);
        }
    }
}

function isFilesReady() {
    return global.simfile.state === SimfileState.PARTIALLY_PARSED &&
        global.audioFile.state === AudioFileState.BUFFERED;
}
