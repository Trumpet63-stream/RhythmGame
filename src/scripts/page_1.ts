import * as p5 from "p5";
import {DOMWrapper, drawHeading, setElementCenterPositionRelative, createFileInput} from "./ui_util";
import {global} from "./index";
import {StepfileState} from "./stepfile";
import {AudioFileState} from "./audio_file";
import {getModeOptionsForDisplay} from "./util";
import {PlayingDisplay} from "./playing_display";
import {Mode, Note} from "./parsing";
import {PageManager, PAGES} from "./page_manager";

export abstract class Page1 {
    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;

        let stepfileInput = createFileInput(getStepfileInputLabel(), "Choose Stepfile (.sm)", "stepfileInput",
            global.stepfile.load.bind(global.stepfile)).element;
        setElementCenterPositionRelative(stepfileInput, 0.25, 0.3);

        let audioFileInput = createFileInput(getAudioFileInputLabel(), "Choose Audio File (.mp3)", "audioFileInput",
            global.audioFile.load.bind(global.audioFile)).element;
        setElementCenterPositionRelative(audioFileInput, 0.75, 0.3);

        let playButtonId = "playButton";
        let modeRadioId = "modeRadio";
        if (isFilesReady()) {
            let modeRadio = drawModeSelect(p, modeRadioId);
            if (modeRadio.value() !== "") { // user has selected a mode
                let playButton = DOMWrapper.create(() => {
                    return p.createButton("Play");
                }, playButtonId).element;
                setElementCenterPositionRelative(playButton, 0.5, 0.8);
                playButton.mouseClicked(() => {
                    let selectedMode: Mode = getSelectedMode(modeRadio);
                    global.stepfile.finishParsing(selectedMode.id);
                    initPlayingDisplay(global.stepfile.fullParse.tracks);
                    PageManager.setCurrentScene(PAGES.PAGE_3);
                });
            } else {
                DOMWrapper.removeElementById(playButtonId);
            }
        } else {
            DOMWrapper.removeElementById(modeRadioId);
            DOMWrapper.removeElementById(playButtonId);
        }
    }
}

// https://discourse.processing.org/t/how-to-organize-radio-buttons-in-separate-lines/10041/5
function encloseEachInputLabelPairIntoASubDiv(p: p5, radioDivP5Element: p5.Element) {
    // @ts-ignore
    const inputs = p.selectAll('input', radioDivP5Element);
    // @ts-ignore
    const labels = p.selectAll('label', radioDivP5Element);
    const len = inputs.length;

    for (let i = 0; i < len; ++i)
        p.createDiv().parent(radioDivP5Element).child(inputs[i]).child(labels[i]);
}

// https://discourse.processing.org/t/how-to-organize-radio-buttons-in-separate-lines/10041/5
function fixRadioDivElement(radioDivP5Element: p5.Element) {
    // @ts-ignore
    radioDivP5Element._getInputChildrenArray = function () {
        return this.elt.getElementsByTagName('input');
    }
}

function drawModeSelect(p: p5, uniqueId: string): p5.Element {
    p.push();
    if (global.page1ModeOptions === undefined) {
        global.page1ModeOptions = getModeOptionsForDisplay(global.stepfile.partialParse.modes);
    }
    let modeRadioCreateResult = DOMWrapper.create(() => {
        return p.createRadio();
    }, uniqueId);
    let modeRadio = modeRadioCreateResult.element;
    p.textAlign(p.CENTER);
    if (!modeRadioCreateResult.alreadyExists) {
        for (let i = 0; i < global.page1ModeOptions.length; i++) {
            let mode = global.page1ModeOptions[i];
            let radioLabel = mode.type + ", " + mode.difficulty + ", " + mode.meter;
            // @ts-ignore
            let radioOption = modeRadio.option(radioLabel);

            // setting the value this way because the two-argument .option method wasn't working
            // setting the value is necessary so we can access the selected mode
            radioOption.value = i;
        }

        // This style is being set on the div containing the radio elements to make it a scrollable box
        modeRadio.style("border:2px solid #ccc;");
        modeRadio.style("width:300px;");
        modeRadio.style("height:80px;");
        modeRadio.style("overflow-y: scroll;");

        encloseEachInputLabelPairIntoASubDiv(p, modeRadio);
        fixRadioDivElement(modeRadio);
    }
    setElementCenterPositionRelative(modeRadio, 0.5, 0.7);
    p.pop();
    return modeRadio;
}

function isFilesReady() {
    let stepfileReady = global.stepfile.state === StepfileState.PARTIALLY_PARSED ||
        global.stepfile.state === StepfileState.FULLY_PARSED;
    let audioFileReady = global.audioFile.state === AudioFileState.BUFFERED;
    return stepfileReady && audioFileReady;
}

function initPlayingDisplay(tracks: Note[][]) {
    global.playingDisplay = new PlayingDisplay(tracks, global.config, global.p5Scene);
}

function getSelectedMode(modeRadio: p5.Element) {
    return global.page1ModeOptions[modeRadio.value()];
}

function getStepfileInputLabel() {
    switch(global.stepfile.state) {
        case StepfileState.NO_SIMFILE:
            return "No file chosen";
            break;
        case StepfileState.DONE_READING:
        case StepfileState.PARTIALLY_PARSED:
        case StepfileState.FULLY_PARSED:
            return truncateFileNameIfTooLong(global.stepfile.file.name, 21);
            break;
        default:
            return "Error";
    }
}

function getAudioFileInputLabel() {
    switch(global.audioFile.state) {
        case AudioFileState.NO_AUDIO_FILE:
            return "No file chosen";
            break;
        case AudioFileState.DONE_READING:
        case AudioFileState.BUFFERED:
            return truncateFileNameIfTooLong(global.audioFile.file.name, 21);
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