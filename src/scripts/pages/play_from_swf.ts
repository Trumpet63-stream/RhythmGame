import {global} from "../index";
import * as p5 from "p5";
import {createFileInput, drawHeading, setElementCenterPositionRelative} from "../ui_util";
import {StepfileState} from "../stepfile";
import {parseSwf} from "../parse_swf";
import {DOMWrapper} from "../dom_wrapper";
import {PageManager, PAGES} from "../page_manager";
import {initPlayingDisplay, isFilesReady} from "./play_from_file";

export abstract class PlayFromSwf {
    public static PLAY_FROM_FILE_CLASS: string = "play-from-file";

    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        let stepfileInput = createFileInput(getStepfileInputLabel(), "Choose Level (.swf)", "stepfileInput",
            loadSwf, PlayFromSwf.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(stepfileInput, 0.43, 0.5, 268, 34);

        let playButtonId = "playButton";
        if (isFilesReady()) {
            let playButton = DOMWrapper.create(() => {
                return p.createButton("Play");
            }, playButtonId);
            setElementCenterPositionRelative(playButton.element, 0.5, 0.88, 60, 34);
            if (!playButton.alreadyExists) {
                playButton.element.addClass(global.globalClass);
                playButton.element.mouseClicked(() => {
                    initPlayingDisplay(global.stepfile.fullParse.tracks);
                    PageManager.setCurrentScene(PAGES.PLAY);
                });
            }
        } else {
            DOMWrapper.removeElementById(playButtonId);
        }
    }
}

function getStepfileInputLabel() {
    switch (global.stepfile.state) {
        case StepfileState.NO_SIMFILE:
            return "No file chosen";
            break;
        case StepfileState.DONE_READING:
        case StepfileState.PARTIALLY_PARSED:
        case StepfileState.FULLY_PARSED:
            return "Filename Unknown";
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

function loadSwf(file: p5.File) {
    let swf = file.file; // this unwraps the p5.File wrapper to get the original DOM file
    parseSwf(swf);
}