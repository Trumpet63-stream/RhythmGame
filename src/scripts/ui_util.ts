import * as p5 from "p5";
import {global} from "./index";
import {PageManager, PAGES} from "./page_manager";
import {
    enumToStringArray,
    findBindingInfoForTrack,
    getFirstElementByTagName,
    getKeyBindingButtonId,
    getKeyBindingContainerId,
    getKeyString,
    setConfigKeyBinding
} from "./util";
import {DOMWrapper} from "./dom_wrapper";

export function drawHeading() {
    let p: p5 = global.p5Scene.sketchInstance;

    let scene1Button = DOMWrapper.create(() => {
        return p.createButton("Play From File");
    }, "scene1Button").element;
    setElementCenterPositionRelative(scene1Button, 0.3, 0.05);
    scene1Button.mousePressed(() => {
        PageManager.setCurrentScene(PAGES.PLAY_FROM_FILE);
    });

    let scene2Button = DOMWrapper.create(() => {
        return p.createButton("Options");
    }, "scene2Button").element;
    setElementCenterPositionRelative(scene2Button, 0.7, 0.05);
    scene2Button.mousePressed(() => {
        PageManager.setCurrentScene(PAGES.OPTIONS);
    });
}

// Expects relativeX and relative Y to be between 0 and 1
export function setElementCenterPositionRelative(element: p5.Element, relativeX: number, relativeY: number) {
    let p = global.p5Scene.sketchInstance;
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    let elementSize: { width?: number, height?: number } = element.size();
    element.position(canvasPosition.x + (relativeX * p.width) - (elementSize.width / 2),
        canvasPosition.y + (relativeY * p.height) - (elementSize.height / 2));
}

export function createLabeledInput(labelString: string, inputId: string, inputInitialValue: string, customClass: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let input: p5.Element;
    let container = DOMWrapper.create(() => {
        let labeledInputClass = "labeled-input";
        let container: p5.Element = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledInputClass);

        let label = createLabel(p, labelString, inputId);
        label.addClass(customClass);
        label.addClass(labeledInputClass);
        label.parent(container);

        input = p.createInput(inputInitialValue);
        input.parent(container);
        input.id(inputId);
        return container;
    }, inputId + "Container");

    return {element: input, alreadyExists: container.alreadyExists};
}

function createLabel(p: p5, labelString: string, forId?: string): p5.Element {
    let label = p.createElement("label", labelString);
    if (forId !== undefined) {
        label.attribute("for", forId);
    }
    return label;
}

// TODO: check that optionsEnum is actually an Enum, and initialEnumValue is a value for that enum
export function createLabeledSelect(labelString: string, selectId: string, optionsEnum: any, initialEnumValue: any,
                                    customClass: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let select: p5.Element;
    let container = DOMWrapper.create(() => {
        let labeledSelectClass = "labeled-select";
        let container: p5.Element = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledSelectClass);

        let label = createLabel(p, labelString, selectId);
        label.addClass(customClass);
        label.addClass(labeledSelectClass);
        label.parent(container);

        select = p.createSelect();
        select.parent(container);
        select.id(selectId);
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

export function createKeyBindingInput(trackNumber: number, numTracks: number, customClass: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let setButtonId = getKeyBindingButtonId(trackNumber, numTracks);
    let container = DOMWrapper.create(() => {
        let keybindingInputClass = "keybinding-input";
        let container: p5.Element = p.createDiv();
        container.addClass(customClass);
        container.addClass(keybindingInputClass);

        let label = createLabel(p, "", setButtonId);
        label.addClass(customClass);
        label.addClass(keybindingInputClass);
        label.parent(container);

        let setButton = p.createButton("Set");
        setButton.parent(container);
        setButton.id(setButtonId);
        setButton.mousePressed(() => {
            global.keyboardEventManager.bindKeyToAction(-1, () => {
                setConfigKeyBinding(trackNumber, numTracks,
                    {trackNumber: trackNumber, keyCode: p.keyCode, string: getKeyString(p)});
                global.keyboardEventManager.unbindKey(-1);
            });
        });
        setButton.addClass(customClass);
        setButton.addClass(keybindingInputClass);

        return container;
    }, getKeyBindingContainerId(trackNumber, numTracks));

    let trackBindingInfo = findBindingInfoForTrack(trackNumber, global.config.keyBindings.get(numTracks));
    let keyString = trackBindingInfo.string;
    let labelString = 'Track ' + (trackNumber + 1) + ': ' + keyString;
    let labelElement = getFirstElementByTagName(container.element, "LABEL");
    labelElement.html(labelString);

    return container;
}

export function createLabeledTextArea(labelString: string, inputId: string, inputInitialValue: string, customClass: string,
                                      rows: number = 4, cols: number = 40): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let textArea: p5.Element;
    let container = DOMWrapper.create(() => {
        let labeledTextareaClass = "labeled-textarea";
        let container: p5.Element = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledTextareaClass);

        let label = createLabel(p, labelString, inputId);
        label.addClass(customClass);
        label.addClass(labeledTextareaClass);
        label.parent(container);

        textArea = p.createElement("textarea", inputInitialValue);
        textArea.parent(container);
        textArea.id(inputId);
        textArea.attribute("rows", rows.toString());
        textArea.attribute("cols", cols.toString());
        return container;
    }, inputId + "Container");

    return {element: textArea, alreadyExists: container.alreadyExists};
}

export function createFileInput(labelString: string, buttonText: string, uniqueId: string, onFileLoad: () => void,
                                customClass: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let buttonId = uniqueId + "Button";
    let containerId = uniqueId + "Container";
    let container = DOMWrapper.create(() => {
        let fileInputClass = "file-input";
        let container: p5.Element = p.createDiv();
        container.addClass(customClass);
        container.addClass(fileInputClass);

        let fileInput = p.createFileInput(onFileLoad, "false");
        fileInput.parent(container);
        fileInput.hide();

        let button = p.createButton(buttonText);
        button.parent(container);
        button.id(buttonId);
        button.mouseClicked(() => {
            fileInput.elt.click();
        });
        button.addClass(customClass);
        button.addClass(fileInputClass);

        let label = createLabel(p, labelString, buttonId);
        label.addClass(customClass)
        label.addClass(fileInputClass);
        label.parent(container);

        return container;
    }, containerId);

    let label: p5.Element = getFirstElementByTagName(container.element, "LABEL");
    label.html(labelString);

    return container;
}