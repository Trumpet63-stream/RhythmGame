import * as p5 from "p5";
import {
    createFileInput,
    drawHeading,
    encloseEachInputLabelPairIntoASubDiv,
    fixRadioDivElement,
    setElementCenterPositionRelative,
    styleRadioOptions
} from "../../ui_util";
import {global} from "../../index";
import {Stepfile, StepfileState} from "../../stepfile";
import {AudioFile, AudioFileState} from "../../audio/audio_file";
import {getModeOptionsForDisplay, initPlayingDisplay, initSyncGameDisplay, isFilesReady} from "../../util";
import {Mode} from "../../parsing/parse_sm";
import {PageManager, Pages} from "../../page_manager";
import {DOMWrapper} from "../../dom_wrapper";
import {FileDropZone} from "./file_drop_zone";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";

const playFromFileStepfile: Stepfile = new Stepfile();
const playFromFileAudioFile: AudioFile = new HtmlAudioElementHelper();

export abstract class PlayFromFile {
    public static PLAY_FROM_FILE_CLASS: string = "play-from-file";
    public static MODE_RADIO_ID: string = "modeRadio";

    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        FileDropZone.create(playFromFileStepfile, playFromFileAudioFile);

        let stepfileInput = createFileInput(getStepfileInputLabel(), "Choose Stepfile (.sm)", "stepfileInput",
            loadStepfileAndUpdateModeOptions, PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(stepfileInput, 0.43, 0.35, 268, 34);

        let audioFileInput = createFileInput(getAudioFileInputLabel(), "Choose Audio File (.mp3, .ogg)", "audioFileInput",
            loadAudioFile, PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(audioFileInput, 0.43, 0.5, 325, 34);

        let playButtonId = "playButton";
        let syncButtonId = "syncButton";
        if (isFilesReady(playFromFileStepfile, playFromFileAudioFile)) {
            let modeRadio = drawModeSelect(p, PlayFromFile.MODE_RADIO_ID);
            if (modeRadio.value() !== "") { // if user has selected a mode
                let playButton = DOMWrapper.create(() => {
                    return p.createButton("Play");
                }, playButtonId);
                setElementCenterPositionRelative(playButton.element, 0.5, 0.88, 60, 34);
                if (!playButton.alreadyExists) {
                    playButton.element.addClass(global.globalClass);
                    this.setPlayButtonBehavior(playButton.element, modeRadio);
                }

                let syncButton = DOMWrapper.create(() => {
                    return p.createButton("Start Audio Sync Wizard");
                }, syncButtonId);
                setElementCenterPositionRelative(syncButton.element, 0.8, 0.88, 177, 34);
                if (!syncButton.alreadyExists) {
                    syncButton.element.addClass(global.globalClass);
                    this.setSyncButtonBehavior(syncButton.element, modeRadio);
                }
            } else {
                DOMWrapper.removeElementById(playButtonId);
                DOMWrapper.removeElementById(syncButtonId);
            }
        } else {
            DOMWrapper.removeElementById(PlayFromFile.MODE_RADIO_ID);
            DOMWrapper.removeElementById(playButtonId);
            DOMWrapper.removeElementById(syncButtonId);
        }
    }

    private static setSyncButtonBehavior(syncButton: p5.Element, modeRadio: p5.Element) {
        syncButton.mouseClicked(() => {
            let selectedMode: Mode = getSelectedMode(modeRadio);
            playFromFileStepfile.finishParsing(selectedMode.id);
            initSyncGameDisplay(playFromFileStepfile.fullParse.tracks, playFromFileAudioFile, Pages.PLAY_FROM_FILE,
                playFromFileStepfile.songTitle);
            PageManager.setCurrentPage(Pages.SYNC);
        });
    }

    private static setPlayButtonBehavior(playButton: p5.Element, modeRadio: p5.Element) {
        playButton.mouseClicked(() => {
            let selectedMode: Mode = getSelectedMode(modeRadio);
            playFromFileStepfile.finishParsing(selectedMode.id);
            initPlayingDisplay(playFromFileStepfile.fullParse.tracks, playFromFileAudioFile, Pages.PLAY_FROM_FILE,
                playFromFileStepfile.songTitle);
            PageManager.setCurrentPage(Pages.PLAY);
        });
    }

    public static resetModeOptions() {
        global.stepfileModeOptions = undefined;
        DOMWrapper.removeElementById(PlayFromFile.MODE_RADIO_ID);
    }
}

function loadStepfileAndUpdateModeOptions(file: p5.File) {
    playFromFileStepfile.loadFile.call(playFromFileStepfile, file.file);
    PlayFromFile.resetModeOptions();
}

function loadAudioFile(file: p5.File) {
    playFromFileAudioFile.loadFile.call(playFromFileAudioFile, file.file);
}

function drawModeSelect(p: p5, uniqueId: string): p5.Element {
    p.push();
    if (global.stepfileModeOptions === undefined) {
        global.stepfileModeOptions = getModeOptionsForDisplay(playFromFileStepfile.partialParse.modes);
    }

    let modeRadioClass = "mode-radio"
    let modeRadioOptionClass = "mode-radio-option";
    let modeRadioCreateResult = DOMWrapper.create(() => {
        return p.createRadio();
    }, uniqueId);
    let modeRadio = modeRadioCreateResult.element;
    if (!modeRadioCreateResult.alreadyExists) {
        modeRadio.id("radio-div");
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
    switch (playFromFileStepfile.state) {
        case StepfileState.NO_STEPFILE:
            return "No file chosen";
        case StepfileState.DONE_READING:
        case StepfileState.PARTIALLY_PARSED:
        case StepfileState.FULLY_PARSED:
            return truncateFileNameIfTooLong(playFromFileStepfile.file.name, 30);
        default:
            return "Error";
    }
}

function getAudioFileInputLabel() {
    switch (playFromFileAudioFile.getState()) {
        case AudioFileState.NO_AUDIO_FILE:
            return "No file chosen";
        case AudioFileState.DONE_READING:
        case AudioFileState.BUFFERED:
            return truncateFileNameIfTooLong(playFromFileAudioFile.getName(), 30);
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
