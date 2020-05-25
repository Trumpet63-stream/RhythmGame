import {global} from "../index";
import * as p5 from "p5";
import {createFileInput, setElementCenterPositionRelative} from "../ui_util";
import {StepfileState} from "../stepfile";

export abstract class PlayFromSwf {
    public static PLAY_FROM_FILE_CLASS: string = "play-from-file";

    public static draw() {
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        let stepfileInput = createFileInput(getStepfileInputLabel(), "Choose Level (.swf)", "stepfileInput",
            global.stepfile.loadSwf.bind(global.stepfile), PlayFromSwf.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(stepfileInput, 0.43, 0.5, 268, 34);
    }
}

function getStepfileInputLabel() {
    switch(global.stepfile.state) {
        case StepfileState.NO_SIMFILE:
            return "No file chosen";
            break;
        case StepfileState.DONE_READING:
        case StepfileState.PARTIALLY_PARSED:
        case StepfileState.FULLY_PARSED:
            return truncateFileNameIfTooLong(global.stepfile.file.name, 30);
            break;
        default:
            return "Error";
    }
}

function truncateFileNameIfTooLong(fullFileName: string, maxLength: number) {
    if (fullFileName.length <= maxLength) {
        return fullFileName;
    }
    return fullFileName.substr(0, maxLength - 11) +
        "..." +
        fullFileName.substr(fullFileName.length - 10);
}