import * as p5 from "p5";
import {ScrollDirection} from "../scripts/scroll_direction";
import {KeyBindingHelper} from "./key_binding_helper";
import {
    createKeyBindingInput,
    DOMWrapper, drawHeading
} from "./ui_util";
import {global} from "./index";
import {enumToStringArray, getKeyBindingButtonId, initializeKeyBindings, isKeyBindingsDefined} from "../scripts/util";

export abstract class Page2 {
    public static draw() {
        drawHeading();
        let currentY = 220;
        let p: p5 = global.p5Scene.sketchInstance;

        let scrollDiv = DOMWrapper.create(() => {
            return p.createDiv();
        }, "scrollDiv");
        if (!scrollDiv.alreadyExists) {
            // @ts-ignore
            let canvasPosition: { x: number, y: number } = p._renderer.position();
            scrollDiv.element.style("border:2px solid #ccc;");
            scrollDiv.element.style("width:380px;");
            scrollDiv.element.style("height:150px;");
            scrollDiv.element.style("overflow-y: scroll;");
            scrollDiv.element.position(canvasPosition.x + 335, canvasPosition.y + 45);
        }

        let pauseAtStartInSecondsInput = newLabeledInput("Pause at Start (sec)", "pauseAtStartInSecondsInput",
            global.config.pauseAtStartInSeconds.toString());
        setOnInputUnlessItAlreadyExists(pauseAtStartInSecondsInput, () => {
            let value: string | number = pauseAtStartInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value >= 0) {
                global.config.pauseAtStartInSeconds = value;
            }
        });
        if (!pauseAtStartInSecondsInput.alreadyExists) {
            scrollDiv.element.child(pauseAtStartInSecondsInput.element.parent());
        }

        let scrollSpeedInput = newLabeledInput("Scroll Speed (px/sec)", "scrollSpeedInput",
            global.config.pixelsPerSecond.toString());
        setOnInputUnlessItAlreadyExists(scrollSpeedInput, () => {
            let value: string | number = scrollSpeedInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value > 0) {
                global.config.pixelsPerSecond = value;
            }
        });
        if (!scrollSpeedInput.alreadyExists) {
            scrollDiv.element.child(scrollSpeedInput.element.parent());
        }

        let scrollDirectionSelect = newCreateLabeledSelect("Scroll Direction", "scrollDirectionSelect",
            ScrollDirection, global.config.scrollDirection);
        setOnInputUnlessItAlreadyExists(scrollDirectionSelect, () => {
            let value: string = String(scrollDirectionSelect.element.value());
            let enumOfValue = ScrollDirection[value as keyof typeof ScrollDirection];
            if (enumOfValue !== undefined) {
                global.config.scrollDirection = enumOfValue;
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(scrollDirectionSelect.element.parent());
        }

        let receptorPositionInput = newLabeledInput("Receptor Position (%)", "receptorPositionInput",
            global.config.receptorYPercent.toString());
        setOnInputUnlessItAlreadyExists(receptorPositionInput, () => {
            let value: string | number = receptorPositionInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                global.config.receptorYPercent = value;
            }
        });
        if (!receptorPositionInput.alreadyExists) {
            scrollDiv.element.child(receptorPositionInput.element.parent());
        }

        let additionalOffsetInSecondsInput = newLabeledInput("Accuracy Offset (sec)", "additionalOffsetInSecondsInput",
            global.config.additionalOffsetInSeconds.toString());
        setOnInputUnlessItAlreadyExists(additionalOffsetInSecondsInput, () => {
            let value: string | number = additionalOffsetInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value > 0) {
                global.config.additionalOffsetInSeconds = value;
            }
        });
        if (!additionalOffsetInSecondsInput.alreadyExists) {
            scrollDiv.element.child(additionalOffsetInSecondsInput.element.parent());
        }

        drawKeyBindingsSectionText(18, 400, currentY += 40);

        if (global.previewNumTracks == undefined) {
            global.previewNumTracks = 4;
        }
        let previewNumTracks = newLabeledInput("Number of Tracks", "previewNumTracksInput",
            global.previewNumTracks.toString());
        // @ts-ignore
        setOnInputUnlessItAlreadyExists(previewNumTracks, () => {
            let value: string | number = previewNumTracks.element.value();
            if (typeof value === "string") {
                value = parseInt(value);
            }
            if (!isNaN(value) && value > 0 && Number.isInteger(value)) {
                removeOldBindingButtons(global.previewNumTracks);
                global.previewNumTracks = value;
            }
        });
        if (!previewNumTracks.alreadyExists) {
            scrollDiv.element.child(previewNumTracks.element.parent());
        }

        drawQuickStartKeyBindingsButton(400, currentY += 15);

        if (!isKeyBindingsDefined(global.previewNumTracks)) {
            initializeKeyBindings(global.previewNumTracks);
        }
        let bindingsStartY = currentY += 45;
        for (let trackNumber = 0; trackNumber < global.previewNumTracks; trackNumber++) {
            createKeyBindingInput(trackNumber, global.previewNumTracks, 15, 400, bindingsStartY + 30 * trackNumber);
        }

        global.previewDisplay.draw();
    }
}

function setOnInputUnlessItAlreadyExists(inputElement: { element: p5.Element, alreadyExists: boolean }, onInput: () => void) {
    if (!inputElement.alreadyExists) {
        // @ts-ignore
        inputElement.element.input(onInput);
    }
}

function drawKeyBindingsSectionText(fontsize: number, lineStartX: number, lineStartY: number) {
    let p: p5 = global.p5Scene.sketchInstance;
    p.push();
    p.textSize(fontsize);
    let keyBindingsHeader = "Key Bindings";
    p.text(keyBindingsHeader, lineStartX, lineStartY);
    let nextX = lineStartX + p.textWidth(keyBindingsHeader) + 0.2 * fontsize;
    let nextY = lineStartY - (p.textAscent() * 0.15);
    p.textSize(fontsize * 0.7);
    p.text("(track 1 is the leftmost track)", nextX, nextY);
    p.pop();
}

function removeOldBindingButtons(numTracks: number) {
    for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
        DOMWrapper.removeElementById(getKeyBindingButtonId(trackNumber, numTracks));
    }
}

function drawQuickStartKeyBindingsButton(topLeftX: number, topLeftY: number) {
    let p: p5 = global.p5Scene.sketchInstance;
    let button = DOMWrapper.create(() => {
        return p.createButton("KeyBindings Quickstart");
    }, "keyBindingsQuickstartButton").element;
    // @ts-ignore
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    button.position(canvasPosition.x + topLeftX, canvasPosition.y + topLeftY);
    button.mousePressed(() => {
        let keybindingHelper = new KeyBindingHelper(global.previewNumTracks);

        // Bind this action to the "-1" key so that it happens on any key press
        global.keyboardEventManager.bindKeyToAction(-1, () => {
            keybindingHelper.bindNext(p);
        });
    });
}

function newLabeledInput(labelString: string, inputId: string, inputInitialValue: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let input: p5.Element;
    let container = DOMWrapper.create(() => {
        let container = p.createDiv();
        let labelHtml = getLabelHtml(inputId, labelString);
        container.html(labelHtml);
        input = p.createInput(inputInitialValue);
        input.parent(container);
        input.id(inputId);
        container.style("margin-top:10px; margin-bottom:10px");
        return container;
    }, inputId + "Container");

    return {element: input, alreadyExists: container.alreadyExists};
}

function getLabelHtml(forId: string, labelString: string) {
    return '<label for="' + forId + '" style="margin-right:15px;">' + labelString + '</label>'
}

function newCreateLabeledSelect(labelString: string, selectId: string, optionsEnum: any, initialEnumValue: any):
    { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let select: p5.Element;
    let container = DOMWrapper.create(() => {
        let container = p.createDiv();
        let labelHtml = getLabelHtml(selectId, labelString);
        container.html(labelHtml);
        select = p.createSelect();
        select.parent(container);
        select.id(selectId);
        container.style("margin-top:10px; margin-bottom:10px");
        return container;
    }, selectId + "Container");

    if (!container.alreadyExists) {
        let initialOptions = enumToStringArray(optionsEnum);
        for (let i = 0; i < initialOptions.length; i++) {
            // @ts-ignore
            select.option(initialOptions[i]);
        }
        // @ts-ignore
        select.selected(optionsEnum[initialEnumValue as keyof typeof optionsEnum].toString());
    }

    return {element: select, alreadyExists: container.alreadyExists};
}