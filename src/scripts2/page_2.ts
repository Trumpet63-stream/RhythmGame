import * as p5 from "p5";
import {ScrollDirection} from "../scripts/scroll_direction";
import {KeyBindingHelper} from "./key_binding_helper";
import {
    createKeyBindingInput,
    createLabelledInput,
    createScrollDirectionSelect,
    DOMWrapper, drawHeading
} from "./ui_util";
import {global} from "./index";
import {getKeyBindingButtonId, initializeKeyBindings, isKeyBindingsDefined} from "../scripts/util";

export abstract class Page2 {
    public static draw() {
        drawHeading();
        let currentY = 70;
        let p: p5 = global.p5Scene.sketchInstance;

        // let scrollDiv = DOMWrapper.create(() => {
        //     return p.createDiv();
        // }, "scrollDiv").element;

        // let labeledInput = newLabeledInput("Label", "inputId", "initial");
        // setOnInputUnlessItAlreadyExists(labeledInput, () => {
        //     console.log(labeledInput.element.value());
        // });

        let pauseAtStartInSecondsInput = newLabeledInput("Pause at Start (sec)", "pauseAtStartInSeconds",
            global.config.pauseAtStartInSeconds.toString());
        // @ts-ignore
        pauseAtStartInSecondsInput.input(() => {
            let value: string | number = pauseAtStartInSecondsInput.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value >= 0) {
                global.config.pauseAtStartInSeconds = value;
            }
        });
        // pauseAtStartInSecondsInput.parent(scrollDiv);

        let scrollSpeedInput = newLabeledInput("Scroll Speed (px/sec)", "scrollSpeedInput",
            global.config.pixelsPerSecond.toString());
        // @ts-ignore
        scrollSpeedInput.input(() => {
            let value: string | number = scrollSpeedInput.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value > 0) {
                global.config.pixelsPerSecond = value;
            }
        });
        // scrollSpeedInput.parent(scrollDiv);

        let scrollDirectionSelect = createScrollDirectionSelect("Scroll Direction", "scrollDirectionSelect",
            ScrollDirection, global.config.scrollDirection, 15, 400, currentY += 30);
        // @ts-ignore
        scrollDirectionSelect.changed(() => {
            let value: string = String(scrollDirectionSelect.value());
            let enumOfValue = ScrollDirection[value as keyof typeof ScrollDirection];
            if (enumOfValue !== undefined) {
                global.config.scrollDirection = enumOfValue;
            }
        });

        let receptorPositionInput = newLabeledInput("Receptor Position (%)", "receptorPositionInput",
            global.config.receptorYPercent.toString());
        // @ts-ignore
        receptorPositionInput.input(() => {
            let value: string | number = receptorPositionInput.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                global.config.receptorYPercent = value;
            }
        });

        let additionalOffsetInSecondsInput = newLabeledInput("Accuracy Offset (sec)", "additionalOffsetInSecondsInput",
            global.config.additionalOffsetInSeconds.toString());
        // @ts-ignore
        additionalOffsetInSecondsInput.input(() => {
            let value: string | number = additionalOffsetInSecondsInput.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value > 0) {
                global.config.additionalOffsetInSeconds = value;
            }
        });

        drawKeyBindingsSectionText(18, 400, currentY += 40);

        if (global.previewNumTracks == undefined) {
            global.previewNumTracks = 4;
        }
        let previewNumTracks = newLabeledInput("Number of Tracks", "previewNumTracksInput",
            global.previewNumTracks.toString());
        // @ts-ignore
        previewNumTracks.input(() => {
            let value: string | number = previewNumTracks.value();
            if (typeof value === "string") {
                value = parseInt(value);
            }
            if (!isNaN(value) && value > 0 && Number.isInteger(value)) {
                removeOldBindingButtons(global.previewNumTracks);
                global.previewNumTracks = value;
            }
        });

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

function setOnInputUnlessItAlreadyExists(inputElement: {element: p5.Element, alreadyExists: boolean}, onInput: () => void) {
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

    let createResult = DOMWrapper.create(() => {
        let container = p.createDiv();
        let labelHtml = '<label for="' + inputId + '" style="margin-right:15px;">' + labelString + '</label>';
        container.html(labelHtml);
        let myInput = p.createInput(inputInitialValue);
        myInput.parent(container);
        myInput.id(inputId);
        return container;
    }, inputId + "container");

    let container = createResult.element;
    // @ts-ignore
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    container.position(canvasPosition.x, canvasPosition.y);

    let myInput = getFirstInputInDiv(container);
    return {element: myInput, alreadyExists: createResult.alreadyExists};
}

function getFirstInputInDiv(div: p5.Element): p5.Element {
    let childrenNodes = div.child();
    for (let i = 0; i < childrenNodes.length; i++) {
        let node: Node = childrenNodes[i];
        // @ts-ignore
        if (node.tagName === "INPUT") {
            // @ts-ignore
            return new p5.Element(node);
        }
    }
    return undefined;
}

let run = true;

function test(labelString: string, inputId: string, inputInitialValue: string, containerX: number, containerY: number) {
    if (run) {
        let p: p5 = global.p5Scene.sketchInstance;
        let myBiggerDiv = p.createDiv();
        for (let i = 0; i < 20; i++) {
            let id = inputId + i;
            let myDiv = p.createDiv();
            let labelHtml = '<label for="' + id + '">' + labelString + '</label>';
            myDiv.html(labelHtml);
            let myInput = p.createInput(inputInitialValue);
            myInput.parent(myDiv);
            myInput.id(id);
            // @ts-ignore
            myDiv.parent(myBiggerDiv);
        }
        // @ts-ignore
        let canvasPosition: { x: number, y: number } = p._renderer.position();
        // myBiggerDiv.style("border:2px solid #ccc;");
        myBiggerDiv.style("width:300px;");
        myBiggerDiv.style("height:80px;");
        myBiggerDiv.style("overflow-y: scroll;");
        myBiggerDiv.position(canvasPosition.x + containerX, canvasPosition.y + containerY);
        myBiggerDiv.remove();

        run = false;
    }
}