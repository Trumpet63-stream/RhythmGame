import * as p5 from "p5";
import {ScrollDirection} from "../scripts/scroll_direction";
import {KeyBindingHelper} from "./key_binding_helper";
import {
    createKeyBindingInput, createLabeledInput, createLabeledSelect, createLabeledTextArea,
    DOMWrapper, drawHeading
} from "./ui_util";
import {global} from "./index";
import {
    getKeyBindingContainerId,
    initializeKeyBindings,
    isKeyBindingsDefined
} from "../scripts/util";
import {Accuracy} from "../scripts/accuracy_manager";

export abstract class Page2 {
    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;

        let scrollDiv = DOMWrapper.create(() => {
            return p.createDiv();
        }, "scrollDiv");
        if (!scrollDiv.alreadyExists) {
            // @ts-ignore
            let canvasPosition: { x: number, y: number } = p._renderer.position();
            scrollDiv.element.style("border:2px solid #ccc;");
            scrollDiv.element.style("width:380px;");
            scrollDiv.element.style("height:420px;");
            scrollDiv.element.style("overflow-y: scroll;");
            scrollDiv.element.position(canvasPosition.x + 335, canvasPosition.y + 45);
        }

        let pauseAtStartInSecondsInput = createLabeledInput("Pause at Start (sec)", "pauseAtStartInSecondsInput",
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

        let scrollSpeedInput = createLabeledInput("Scroll Speed (px/sec)", "scrollSpeedInput",
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

        let scrollDirectionSelect = createLabeledSelect("Scroll Direction", "scrollDirectionSelect",
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

        let receptorPositionInput = createLabeledInput("Receptor Position (%)", "receptorPositionInput",
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

        let additionalOffsetInSecondsInput = createLabeledInput("Accuracy Offset (sec)", "additionalOffsetInSecondsInput",
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

        let accuracySettingsInput = createLabeledTextArea("Accuracy Settings", "accuracySettingsInput",
            JSON.stringify(global.config.accuracySettings, null, 3));
        setOnInputUnlessItAlreadyExists(accuracySettingsInput, () => {
            let value: string | number = accuracySettingsInput.element.value();
            if (typeof value === "string") {
                let newAccuracySettings: Accuracy[] = parseAccuracySettingsJson(value);
                if (newAccuracySettings !== null) {
                    global.config.accuracySettings = newAccuracySettings;
                }
            }
        })
        if (!accuracySettingsInput.alreadyExists) {
            scrollDiv.element.child(accuracySettingsInput.element.parent());
        }

        let keyBindingsSectionHeader = createKeyBindingsSectionHeader();
        if (!keyBindingsSectionHeader.alreadyExists) {
            scrollDiv.element.child(keyBindingsSectionHeader.element);
        }

        if (global.previewNumTracks == undefined) {
            global.previewNumTracks = 4;
        }
        let previewNumTracks = createLabeledInput("Number of Tracks", "previewNumTracksInput",
            global.previewNumTracks.toString());
        // @ts-ignore
        setOnInputUnlessItAlreadyExists(previewNumTracks, () => {
            let value: string | number = previewNumTracks.element.value();
            if (typeof value === "string") {
                value = parseInt(value);
            }
            if (Number.isInteger(value) && value > 0 && value <= 26) {
                removeOldBindingButtons(global.previewNumTracks);
                global.previewNumTracks = value;
            }
        });
        if (!previewNumTracks.alreadyExists) {
            scrollDiv.element.child(previewNumTracks.element.parent());
        }

        let keyBindingsQuickstartButton = DOMWrapper.create(() => {
            return p.createButton("KeyBindings Quickstart");
        }, "keyBindingsQuickstartButton");
        if (!keyBindingsQuickstartButton.alreadyExists) {
            keyBindingsQuickstartButton.element.mousePressed(() => {
                let keybindingHelper = new KeyBindingHelper(global.previewNumTracks);

                // Bind this action to the "-1" key so that it happens on any key press
                global.keyboardEventManager.bindKeyToAction(-1, () => {
                    keybindingHelper.bindNext(p);
                });
            });

            scrollDiv.element.child(keyBindingsQuickstartButton.element);
        }

        if (!isKeyBindingsDefined(global.previewNumTracks)) {
            initializeKeyBindings(global.previewNumTracks);
        }
        for (let trackNumber = 0; trackNumber < global.previewNumTracks; trackNumber++) {
            let keyBindingInput = createKeyBindingInput(trackNumber, global.previewNumTracks);
            if (!keyBindingInput.alreadyExists) {
                scrollDiv.element.child(keyBindingInput.element);
            }
        }

        global.previewDisplay.draw();
    }
}

function createKeyBindingsSectionHeader(): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;
    let container = DOMWrapper.create(() => {
        let container = p.createDiv();
        container.html(
            'Key Bindings <span style="font-size:12px">(track 1 is the leftmost track)</span>'
        );
        container.style("margin-top:10px; margin-bottom:10px; font-size:18px");
        return container;
    }, "keyBindingsSectionHeader");

    return container;
}

function setOnInputUnlessItAlreadyExists(inputElement: { element: p5.Element, alreadyExists: boolean }, onInput: () => void) {
    if (!inputElement.alreadyExists) {
        // @ts-ignore
        inputElement.element.input(onInput);
    }
}

function removeOldBindingButtons(numTracks: number) {
    for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
        DOMWrapper.removeElementById(getKeyBindingContainerId(trackNumber, numTracks));
    }
}

function parseAccuracySettingsJson(accuracySettingsJson: string): Accuracy[] {
    try {
        let accuracySettings: Accuracy[] = []
        let jsonArray: Accuracy[] = JSON.parse(accuracySettingsJson);
        for (let i = 0; i < jsonArray.length; i++) {
            let accuracy = jsonArray[i];
            // this fails if the user gave the wrong input
            accuracySettings.push(new Accuracy(accuracy.name, accuracy.lowerBound, accuracy.upperBound));
        }
        return accuracySettings;
    } catch (e) {}
    return null;
}