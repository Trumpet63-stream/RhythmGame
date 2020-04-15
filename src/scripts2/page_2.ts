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

        let pauseAtStartInSecondsInput = createLabelledInput("Pause at Start (sec)", "pauseAtStartInSecondsInput",
            global.config.pauseAtStartInSeconds.toString(), 15, 400, currentY);
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

        let scrollSpeedInput = createLabelledInput("Scroll Speed (px/sec)", "scrollSpeedInput",
            global.config.pixelsPerSecond.toString(), 15, 400, currentY += 30);
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

        let receptorPositionInput = createLabelledInput("Receptor Position (%)", "receptorPositionInput",
            global.config.receptorYPercent.toString(), 15, 400, currentY += 30);
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

        let additionalOffsetInSecondsInput = createLabelledInput("Accuracy Offset (sec)", "additionalOffsetInSecondsInput",
            global.config.additionalOffsetInSeconds.toString(), 15, 400, currentY += 30);
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
        let previewNumTracks = createLabelledInput("Number of Tracks", "previewNumTracksInput",
            global.previewNumTracks.toString(), 15, 400, currentY += 30);
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

        DrawQuickStartKeyBindingsButton(400, currentY += 15);

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
    for(let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
        DOMWrapper.removeElementById(getKeyBindingButtonId(trackNumber, numTracks));
    }
}

function DrawQuickStartKeyBindingsButton(topLeftX: number, topLeftY: number) {
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