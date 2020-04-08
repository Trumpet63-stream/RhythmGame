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
        p.push();
        p.textAlign(p.CENTER);

        let modeRadioCreateResult = DOMWrapper.create(() => {
            return p.createRadio();
        }, "modeRadio");
        let modeRadio = modeRadioCreateResult.element;
        let div = modeRadio;
        if (!modeRadioCreateResult.alreadyExists) {
            for (let i = 1; i <= 20; i++) {
                // @ts-ignore
                let option = modeRadio.option("Option" + i, i);
                // option.style("vertical-align: middle;");
            }
            div.style("border:2px solid #ccc;");
            div.style("width:300px;");
            div.style("height: 100px;");
            div.style("overflow-y: scroll;");
            encloseEachInputLabelPairIntoASubDiv(p, modeRadio);
            fixRadioDivElement(modeRadio);
        }
        setElementCenterPositionRelative(div, 0.5, 0.4);

        // let stepfileInput = DOMWrapper.create(() => {
        //     return p.createFileInput(global.simfile.load.bind(global.simfile), "false");
        // }, "setfileInputButton").element;
        // setElementCenterPositionRelative(stepfileInput, 0.35, 0.3);
        //
        // let audioFileInput = DOMWrapper.create(() => {
        //     return p.createFileInput(global.audioFile.load.bind(global.audioFile), "false");
        // }, "audioFileInputButton").element;
        // setElementCenterPositionRelative(audioFileInput, 0.65, 0.3);
        //
        // if (isFilesReady()) {
        //     let modeRadio = drawModeSelect(p);
        //     if (modeRadio.value() !== "") {
        //         let playButton = DOMWrapper.create(() => {
        //             return p.createButton("Play");
        //         }, "playButton").element;
        //         setElementCenterPositionRelative(playButton, 0.5, 0.8);
        //         playButton.mouseClicked(() => {
        //             let selectedMode: Mode = getSelectedMode(modeRadio);
        //             global.simfile.finishParsing(selectedMode.id);
        //             readyPlayingDisplay(global.simfile.fullParse.tracks);
        //             PageManager.setCurrentScene(PAGES.PAGE_3);
        //         });
        //     }
        // }
        p.pop();
    }
}

// https://discourse.processing.org/t/how-to-organize-radio-buttons-in-separate-lines/10041/5
function encloseEachInputLabelPairIntoASubDiv(p: p5, radioDivElement: p5.Element) {
    const inputs = p.selectAll('input', radioDivElement.html()),
        labels = p.selectAll('label', radioDivElement.html()),
        len = inputs.length;

    for (let i = 0; i < len; ++i)
        p.createDiv().parent(radioDivElement).child(inputs[i]).child(labels[i]);
}

// https://discourse.processing.org/t/how-to-organize-radio-buttons-in-separate-lines/10041/5
function fixRadioDivElement(radioDivP5Element: p5.Element) {
    // @ts-ignore
    radioDivP5Element._getInputChildrenArray = function () {
        return this.elt.getElementsByTagName('input');
    }
}

function drawModeSelect(p: p5): p5.Element {
    if (global.page1ModeOptions === undefined) {
        global.page1ModeOptions = getModeOptionsForDisplay(global.simfile.partialParse.modes);
    }
    let modeRadioCreateResult = DOMWrapper.create(() => {
        return p.createRadio();
    }, "modeRadio");
    let modeRadio = modeRadioCreateResult.element;
    setElementCenterPositionRelative(modeRadio, 0.5, 0.6);
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
    }
    return modeRadio;
}

function isFilesReady() {
    return global.simfile.state === SimfileState.PARTIALLY_PARSED &&
        global.audioFile.state === AudioFileState.BUFFERED;
}

function readyPlayingDisplay(tracks: Note[][]) {
    global.playingDisplay = new PlayingDisplay(tracks, global.config, global.p5Scene);
}

function getSelectedMode(modeRadio: p5.Element) {
    return global.page1ModeOptions[modeRadio.value()];
}
