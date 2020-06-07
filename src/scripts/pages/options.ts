import * as p5 from "p5";
import {ScrollDirection} from "../scroll_direction";
import {KeyBindingHelper} from "../key_binding_helper";
import {
    booleanToYesNo,
    createKeyBindingInput,
    createLabeledInput,
    createLabeledSelect,
    createLabeledTextArea,
    drawHeading,
    YesNo
} from "../ui_util";
import {global} from "../index";
import {generatePreviewNotes, getKeyBindingContainerId, initializeKeyBindings, isKeyBindingsDefined} from "../util";
import {Accuracy} from "../accuracy_manager";
import {PreviewDisplay} from "../preview_display";
import {DOMWrapper} from "../dom_wrapper";

export abstract class Options {
    public static OPTIONS_CLASS: string = "options";

    public static draw() {
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.optionsBackground);
        drawHeading();

        let scrollDiv = DOMWrapper.create(() => {
            return p.createDiv();
        }, "scrollDiv");
        if (!scrollDiv.alreadyExists) {
            scrollDiv.element.addClass("options-scroll-div");
            scrollDiv.element.addClass(Options.OPTIONS_CLASS);
            scrollDiv.element.addClass(global.globalClass);
        }
        // @ts-ignore
        let canvasPosition: { x: number, y: number } = p._renderer.position();
        scrollDiv.element.position(canvasPosition.x + 335, canvasPosition.y + 45);

        let pauseAtStartInSecondsInput = createLabeledInput("Pause at Start (sec)", "pauseAtStartInSecondsInput",
            global.config.pauseAtStartInSeconds.toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(pauseAtStartInSecondsInput, () => {
            let value: string | number = pauseAtStartInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value >= 0) {
                global.config.pauseAtStartInSeconds = value;
                global.config.save();
            }
        });
        if (!pauseAtStartInSecondsInput.alreadyExists) {
            scrollDiv.element.child(pauseAtStartInSecondsInput.element.parent());
        }

        let scrollSpeedInput = createLabeledInput("Scroll Speed (px/sec)", "scrollSpeedInput",
            global.config.pixelsPerSecond.toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(scrollSpeedInput, () => {
            let value: string | number = scrollSpeedInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value > 0) {
                global.config.pixelsPerSecond = value;
                global.config.save();
            }
        });
        if (!scrollSpeedInput.alreadyExists) {
            scrollDiv.element.child(scrollSpeedInput.element.parent());
        }

        let scrollDirectionSelect = createLabeledSelect("Scroll Direction", "scrollDirectionSelect",
            ScrollDirection, global.config.scrollDirection, Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(scrollDirectionSelect, () => {
            let value: string = String(scrollDirectionSelect.element.value());
            let enumOfValue = ScrollDirection[value as keyof typeof ScrollDirection];
            if (enumOfValue !== undefined) {
                global.config.scrollDirection = enumOfValue;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(scrollDirectionSelect.element.parent());
        }

        let receptorPositionInput = createLabeledInput("Receptor Position (%)", "receptorPositionInput",
            global.config.receptorYPercent.toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(receptorPositionInput, () => {
            let value: string | number = receptorPositionInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                global.config.receptorYPercent = value;
                global.config.save();
            }
        });
        if (!receptorPositionInput.alreadyExists) {
            scrollDiv.element.child(receptorPositionInput.element.parent());
        }

        let additionalOffsetInSecondsInput = createLabeledInput("Accuracy Offset (ms)", "additionalOffsetInSecondsInput",
            (global.config.additionalOffsetInSeconds * 1000).toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(additionalOffsetInSecondsInput, () => {
            let value: string | number = additionalOffsetInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                global.config.additionalOffsetInSeconds = value / 1000;
                global.config.save();
            }
        });
        if (!additionalOffsetInSecondsInput.alreadyExists) {
            scrollDiv.element.child(additionalOffsetInSecondsInput.element.parent());
        }

        let accuracySettingsInput = createLabeledTextArea("Accuracy Settings", "accuracySettingsInput",
            JSON.stringify(global.config.accuracySettings, null, 3), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracySettingsInput, () => {
            let value: string | number = accuracySettingsInput.element.value();
            if (typeof value === "string") {
                let newAccuracySettings: Accuracy[] = parseAccuracySettingsJson(value);
                if (newAccuracySettings !== null) {
                    global.config.accuracySettings = newAccuracySettings;
                    global.config.save();
                }
            }
        })
        if (!accuracySettingsInput.alreadyExists) {
            scrollDiv.element.child(accuracySettingsInput.element.parent());
        }

        let accuracyFlashEnabledSelect = createLabeledSelect("Accuracy Flash","accuracyFlashEnabledSelect",
            YesNo, booleanToYesNo(global.config.isAccuracyFlashEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracyFlashEnabledSelect, () => {
            let value: string = String(accuracyFlashEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isAccuracyFlashEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isAccuracyFlashEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyFlashEnabledSelect.element.parent());
        }

        let accuracyParticlesEnabledSelect = createLabeledSelect("Accuracy Particles", "accuracyParticlesEnabledSelect",
            YesNo, booleanToYesNo(global.config.isAccuracyParticlesEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracyParticlesEnabledSelect, () => {
            let value: string = String(accuracyParticlesEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isAccuracyParticlesEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isAccuracyParticlesEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyParticlesEnabledSelect.element.parent());
        }

        let accuracyTextEnabledSelect = createLabeledSelect("Accuracy Text","accuracyTextEnabledSelect",
            YesNo, booleanToYesNo(global.config.isAccuracyTextEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracyTextEnabledSelect, () => {
            let value: string = String(accuracyTextEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isAccuracyTextEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isAccuracyTextEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyTextEnabledSelect.element.parent());
        }

        let holdParticlesEnabledSelect = createLabeledSelect("Hold Particles", "holdParticlesEnabledSelect",
            YesNo, booleanToYesNo(global.config.isHoldParticlesEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(holdParticlesEnabledSelect, () => {
            let value: string = String(holdParticlesEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isHoldParticlesEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isHoldParticlesEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(holdParticlesEnabledSelect.element.parent());
        }

        let holdGlowEnabledSelect = createLabeledSelect("Hold Glow", "holdGlowEnabledSelect",
            YesNo, booleanToYesNo(global.config.isHoldGlowEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(holdGlowEnabledSelect, () => {
            let value: string = String(holdGlowEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isHoldGlowEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isHoldGlowEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(holdGlowEnabledSelect.element.parent());
        }

        let keyBindingsSectionHeader = createKeyBindingsSectionHeader();
        if (!keyBindingsSectionHeader.alreadyExists) {
            scrollDiv.element.child(keyBindingsSectionHeader.element);
        }

        if (global.previewNumTracks == undefined) {
            global.previewNumTracks = 4;
        }
        let previewNumTracks = createLabeledInput("Number of Tracks", "previewNumTracksInput",
            global.previewNumTracks.toString(), Options.OPTIONS_CLASS);
        // @ts-ignore
        setOnInputUnlessItAlreadyExists(previewNumTracks, () => {
            let value: string | number = previewNumTracks.element.value();
            if (typeof value === "string") {
                value = parseInt(value);
            }
            if (Number.isInteger(value) && value > 0 && value <= 26) {
                removeOldBindingButtons(global.previewNumTracks);
                global.previewNumTracks = value;
                global.previewDisplay = new PreviewDisplay(generatePreviewNotes(value), global.config, global.p5Scene);
            }
        });
        if (!previewNumTracks.alreadyExists) {
            scrollDiv.element.child(previewNumTracks.element.parent());
        }

        let keyBindingsQuickstartButton = DOMWrapper.create(() => {
            return p.createButton("KeyBindings Quickstart");
        }, "keyBindingsQuickstartButton");
        if (!keyBindingsQuickstartButton.alreadyExists) {
            keyBindingsQuickstartButton.element.addClass(Options.OPTIONS_CLASS);
            keyBindingsQuickstartButton.element.addClass("keybindings-quickstart");
            keyBindingsQuickstartButton.element.addClass(global.globalClass);


            keyBindingsQuickstartButton.element.mousePressed(() => {
                let keybindingHelper = new KeyBindingHelper(global.previewNumTracks);

                // Bind this action to the "-1" key so that it happens on any key press
                global.keyboardEventManager.bindKeyToAction(-1, () => {
                    // Ignore this code because it's used to indicate input that's not yet finished processing
                    if (p.keyCode !== 229) {
                        keybindingHelper.bindNext(p);
                    }
                });
            });

            scrollDiv.element.child(keyBindingsQuickstartButton.element);
        }

        if (!isKeyBindingsDefined(global.previewNumTracks)) {
            initializeKeyBindings(global.previewNumTracks);
        }
        for (let trackNumber = 0; trackNumber < global.previewNumTracks; trackNumber++) {
            let keyBindingInput = createKeyBindingInput(trackNumber, global.previewNumTracks, Options.OPTIONS_CLASS);
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
        container.addClass("options-free-text");
        container.addClass(Options.OPTIONS_CLASS);
        container.addClass(global.globalClass);
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