import * as p5 from "p5";
import {
    drawHeading,
    setElementCenterPositionRelative,
    createFileInput,
    encloseEachInputLabelPairIntoASubDiv, fixRadioDivElement, styleRadioOptions
} from "../ui_util";
import {global} from "../index";
import {StepfileState} from "../stepfile";
import {AudioFileState} from "../audio_file";
import {getModeOptionsForDisplay, initPlayingDisplay, isFilesReady} from "../util";
import {Mode} from "../parse_sm";
import {PageManager, PAGES} from "../page_manager";
import {DOMWrapper} from "../dom_wrapper";

export abstract class PlayFromFile {
    public static PLAY_FROM_FILE_CLASS: string = "play-from-file";
    public static MODE_RADIO_ID: string = "modeRadio";

    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        let stepfileInput = createFileInput(getStepfileInputLabel(), "Choose Stepfile (.sm)", "stepfileInput",
            loadStepfileAndUpdateModeOptions, PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(stepfileInput, 0.43, 0.3, 268, 34);

        let audioFileInput = createFileInput(getAudioFileInputLabel(), "Choose Audio File (.mp3, .ogg)", "audioFileInput",
            global.audioFile.loadFile.bind(global.audioFile), PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(audioFileInput, 0.43, 0.45, 325, 34);

        let playButtonId = "playButton";
        if (isFilesReady()) {
            let modeRadio = drawModeSelect(p, PlayFromFile.MODE_RADIO_ID);
            if (modeRadio.value() !== "") { // if user has selected a mode
                let playButton = DOMWrapper.create(() => {
                    return p.createButton("Play");
                }, playButtonId);
                setElementCenterPositionRelative(playButton.element, 0.5, 0.88, 60, 34);
                if (!playButton.alreadyExists) {
                    playButton.element.addClass(global.globalClass);
                    playButton.element.mouseClicked(() => {
                        let selectedMode: Mode = getSelectedMode(modeRadio);
                        global.stepfile.finishParsing(selectedMode.id);
                        initPlayingDisplay(global.stepfile.fullParse.tracks);
                        PageManager.setCurrentScene(PAGES.PLAY);
                    });
                }
            } else {
                DOMWrapper.removeElementById(playButtonId);
            }
        } else {
            DOMWrapper.removeElementById(PlayFromFile.MODE_RADIO_ID);
            DOMWrapper.removeElementById(playButtonId);
        }
    }
}

function loadStepfileAndUpdateModeOptions(file: p5.File) {
    global.stepfile.load.call(global.stepfile, file);
    global.stepfileModeOptions = undefined;
    DOMWrapper.removeElementById(PlayFromFile.MODE_RADIO_ID);
}

function drawModeSelect(p: p5, uniqueId: string): p5.Element {
    p.push();
    if (global.stepfileModeOptions === undefined) {
        global.stepfileModeOptions = getModeOptionsForDisplay(global.stepfile.partialParse.modes);
    }

    let modeRadioClass = "mode-radio"
    let modeRadioOptionClass = "mode-radio-option";
    let modeRadioCreateResult = DOMWrapper.create(() => {
        return p.createRadio();
    }, uniqueId);
    let modeRadio = modeRadioCreateResult.element;
    if (!modeRadioCreateResult.alreadyExists) {
        for (let i = 0; i < global.stepfileModeOptions.length; i++) {
            let mode = global.stepfileModeOptions[i];
            let radioLabel = mode.type + ", " + mode.difficulty + ", " + mode.meter;
            // @ts-ignore
            let radioOption = modeRadio.option(radioLabel);

            // setting the value this way because the two-argument .option method wasn't working
            // setting the value is necessary so we can access the selected mode
            radioOption.value = i;
        }

        // This style is being set on the div containing the radio elements to make it a scrollable box
        modeRadio.addClass(modeRadioClass);
        modeRadio.addClass(global.globalClass);

        encloseEachInputLabelPairIntoASubDiv(p, modeRadio);
        fixRadioDivElement(modeRadio);
        styleRadioOptions(p, modeRadio, [modeRadioOptionClass, global.globalClass]);
    }
    setElementCenterPositionRelative(modeRadio, 0.5, 0.7, 302, 120);
    p.pop();
    return modeRadio;
}

function getSelectedMode(modeRadio: p5.Element) {
    return global.stepfileModeOptions[modeRadio.value()];
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

function getAudioFileInputLabel() {
    switch(global.audioFile.state) {
        case AudioFileState.NO_AUDIO_FILE:
            return "No file chosen";
            break;
        case AudioFileState.DONE_READING:
        case AudioFileState.BUFFERED:
            return truncateFileNameIfTooLong(global.audioFile.file.name, 30);
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