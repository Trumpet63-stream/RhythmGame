import * as p5 from "p5";
import {DOMWrapper, drawHeading, setElementCenterPositionRelative} from "./ui_util";
import {global} from "./index";
import {SimfileState} from "./simfile";
import {AudioFileState} from "./audio_file";
import {getModeOptionsForDisplay} from "../scripts/util";
import {Mode} from "../scripts/index";
import {PlayingDisplay} from "../scripts/playing_display";
import {Note} from "../scripts/parsing";
import {PageManager, PAGES} from "./page_manager";

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
            let modeRadio = drawModeSelect(p);
            if (modeRadio.value() !== "") {
                let playButton = DOMWrapper.create(() => {
                    return p.createButton("Play");
                }, "playButton").element;
                setElementCenterPositionRelative(playButton, 0.5, 0.8);
                playButton.mouseClicked(() => {
                    let selectedMode: Mode = getSelectedMode(modeRadio);
                    global.simfile.finishParsing(selectedMode.id);
                    initPlayingDisplay(global.simfile.fullParse.tracks);
                    PageManager.setCurrentScene(PAGES.PAGE_3);
                });
            }
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

function drawModeSelect(p: p5): p5.Element {
    p.push();
    if (global.page1ModeOptions === undefined) {
        global.page1ModeOptions = getModeOptionsForDisplay(global.simfile.partialParse.modes);
    }
    let modeRadioCreateResult = DOMWrapper.create(() => {
        return p.createRadio();
    }, "modeRadio");
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

        // This style is being set on the div containing the radio elements
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
    return global.simfile.state === SimfileState.PARTIALLY_PARSED &&
        global.audioFile.state === AudioFileState.BUFFERED;
}

function initPlayingDisplay(tracks: Note[][]) {
    global.playingDisplay = new PlayingDisplay(tracks, global.config, global.p5Scene);
}

function getSelectedMode(modeRadio: p5.Element) {
    return global.page1ModeOptions[modeRadio.value()];
}
