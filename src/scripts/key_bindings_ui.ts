import * as p5 from "p5";
import {DOMWrapper} from "./dom_wrapper";
import {global} from "./index";
import {KeyBindingHelper} from "./key_binding_helper";
import {
    findBindingInfoForTrack, generatePreviewNotes, getFirstElementByTagName,
    getKeyString,
    initializeKeyBindings,
    isKeyBindingsDefined,
    setConfigKeyBinding
} from "./util";
import {createLabel, createLabeledInput, setOnInputUnlessItAlreadyExists} from "./ui_util";
import {PreviewDisplay} from "./preview_display";
import {Options} from "./pages/options";

export abstract class KeyBindingsUi {
    private static SET_BUTTON_INACTIVE_TEXT: string = "Set";
    private static SET_BUTTON_ACTIVE_TEXT: string = "Press Any Key";
    private static numTracks: number = 4;

    public static draw(p: p5, parentElement: p5.Element, pageStyleClass: string) {
        let keyBindingsSectionHeader = this.createKeyBindingsSectionHeader();
        if (!keyBindingsSectionHeader.alreadyExists) {
            parentElement.child(keyBindingsSectionHeader.element);
        }

        if (this.numTracks == undefined) {
            this.numTracks = 4;
        }
        let previewNumTracks = createLabeledInput("Number of Tracks", "previewNumTracksInput",
            this.numTracks.toString(), Options.OPTIONS_CLASS);
        // @ts-ignore
        setOnInputUnlessItAlreadyExists(previewNumTracks, () => {
            let value: string | number = previewNumTracks.element.value();
            if (typeof value === "string") {
                value = parseInt(value);
            }
            if (Number.isInteger(value) && value > 0 && value <= 26) {
                KeyBindingsUi.removeOldBindingButtons(this.numTracks);
                this.numTracks = value;
                global.previewDisplay = new PreviewDisplay(generatePreviewNotes(value), global.config, global.p5Scene);
            }
        });
        if (!previewNumTracks.alreadyExists) {
            parentElement.child(previewNumTracks.element.parent());
        }

        let keyBindingsQuickstartButton = DOMWrapper.create(() => {
            return p.createButton("Key-Bindings Quickstart");
        }, "keyBindingsQuickstartButton");
        if (!keyBindingsQuickstartButton.alreadyExists) {
            let keyBindingsQuickstartId = "keybindings-quickstart";
            keyBindingsQuickstartButton.element.addClass(pageStyleClass);
            keyBindingsQuickstartButton.element.addClass("keybindings-quickstart");
            keyBindingsQuickstartButton.element.addClass(global.globalClass);
            keyBindingsQuickstartButton.element.id(keyBindingsQuickstartId);

            keyBindingsQuickstartButton.element.mousePressed(() => {
                let keybindingHelper = new KeyBindingHelper(this.numTracks);
                this.scrollKeyBindingIntoView(0);
                this.indicateWaitingForKey(p, 0);

                // Bind this action to the "-1" key so that it happens on any key press
                global.keyboardEventManager.bindKeyToAction(-1, () => {
                    // Ignore this code because it's used to indicate input that's not yet finished processing
                    if (p.keyCode !== 229) {
                        keybindingHelper.bindNext(p, keyBindingsQuickstartId);
                    }
                });
            });

            parentElement.child(keyBindingsQuickstartButton.element);
        }

        if (!isKeyBindingsDefined(this.numTracks)) {
            initializeKeyBindings(this.numTracks);
        }
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            let keyBindingInput = this.createKeyBindingInput(trackNumber, this.numTracks, pageStyleClass);
            if (!keyBindingInput.alreadyExists) {
                parentElement.child(keyBindingInput.element);
            }
        }
    }

    private static createKeyBindingsSectionHeader(): { element: p5.Element, alreadyExists: boolean } {
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

    private static createKeyBindingInput(trackNumber: number, numTracks: number, customClass: string)
        : { element: p5.Element, alreadyExists: boolean } {
        let p: p5 = global.p5Scene.sketchInstance;

        let setButtonId = this.getKeyBindingButtonId(trackNumber, numTracks);
        let keybindingInputClass = "keybinding-input";
        let container = DOMWrapper.create(() => {
            let container: p5.Element = p.createDiv();
            container.addClass(customClass);
            container.addClass(keybindingInputClass);
            container.addClass(global.globalClass);

            let label = createLabel(p, "");
            label.addClass(customClass);
            label.addClass(keybindingInputClass);
            label.addClass(global.globalClass);
            label.parent(container);

            let setButton = p.createButton("Set");
            setButton.parent(container);
            setButton.id(setButtonId);
            setButton.mousePressed(() => {
                this.indicateWaitingForKey(p, trackNumber);
                global.keyboardEventManager.bindKeyToAction(-1, () => {
                    // Ignore this code because it's used to indicate input that's not yet finished processing
                    if (p.keyCode !== 229) {
                        setConfigKeyBinding(trackNumber, numTracks,
                            {trackNumber: trackNumber, keyCode: p.keyCode, string: getKeyString(p)});
                        this.noLongerWaitingForKey(setButton);
                        global.keyboardEventManager.unbindKey(-1);
                    }
                });
            });
            setButton.addClass(customClass);
            setButton.addClass(keybindingInputClass);
            setButton.addClass(global.globalClass);

            return container;
        }, this.getKeyBindingButtonId(trackNumber, numTracks));

        let trackBindingInfo = findBindingInfoForTrack(trackNumber, global.config.keyBindings.get(numTracks));
        let keyString = trackBindingInfo.string;
        let labelString = 'Track ' + (trackNumber + 1) + ': <span class="' +
            keybindingInputClass + " " + customClass + " " + global.globalClass +
            '">' + keyString + '</span>';
        let labelElement = getFirstElementByTagName(container.element, "LABEL");
        labelElement.html(labelString);

        return container;
    }

    public static indicateWaitingForKey(p: p5, trackNumber: number) {
        let setButtons: p5.Element[] = [];
        for (let i = 0; i < this.numTracks; i++) {
            setButtons.push(this.getSetButton(p, i, this.numTracks));
        }

        for (let i = 0; i < this.numTracks; i++) {
            let setButton: p5.Element = setButtons[i];
            if (i === trackNumber) {
                setButton.html(this.SET_BUTTON_ACTIVE_TEXT);
            } else {
                setButton.html(this.SET_BUTTON_INACTIVE_TEXT);
            }
        }
    }

    private static getSetButton(p: p5, trackNumber: number, numTracks: number): p5.Element {
        let setButtonId = this.getKeyBindingButtonId(trackNumber, numTracks);
        return p.select("#" + setButtonId);
    }

    private static noLongerWaitingForKey(setButton: p5.Element) {
        setButton.html(this.SET_BUTTON_INACTIVE_TEXT);
    }

    public static noLongerWaitingForLastKey(p: p5) {
        let setButton: p5.Element = this.getSetButton(p, this.numTracks - 1, this.numTracks);
        setButton.html(this.SET_BUTTON_INACTIVE_TEXT);
    }

    private static getKeyBindingButtonId(trackNumber: number, numTracks: number) {
        return this.getKeyBindingUniqueId(trackNumber, numTracks) + "Button";
    }

    private static getKeyBindingUniqueId(trackNumber: number, numTracks: number) {
        return "track" + trackNumber + "Of" + numTracks + "Binding";
    }

    public static scrollKeyBindingIntoView(trackNumber: number) {
        let keyBindingButtonId = this.getKeyBindingButtonId(trackNumber, this.numTracks);
        document.getElementById(keyBindingButtonId).parentElement.scrollIntoView();
    }

    public static removeOldBindingButtons(numTracks: number) {
        for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
            DOMWrapper.removeElementById(this.getKeyBindingButtonId(trackNumber, numTracks));
        }
    }
}