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
    let headingClass = "navigation-heading";

    let playFromFileButton = DOMWrapper.create(() => {
        return p.createButton("Play From File");
    }, "playFromFileButton");
    setElementCenterPositionRelative(playFromFileButton.element, 0.3, 0.036, 130, 34);
    playFromFileButton.element.mousePressed(() => {
        PageManager.setCurrentScene(PAGES.PLAY_FROM_FILE);
    });
    if (!playFromFileButton.alreadyExists) {
        playFromFileButton.element.addClass(headingClass);
        playFromFileButton.element.addClass(global.globalClass);
    }

    let optionsButton = DOMWrapper.create(() => {
        return p.createButton("Options");
    }, "optionsButton");
    setElementCenterPositionRelative(optionsButton.element, 0.7, 0.036, 90, 34);
    optionsButton.element.mousePressed(() => {
        PageManager.setCurrentScene(PAGES.OPTIONS);
    });
    if (!optionsButton.alreadyExists) {
        optionsButton.element.addClass(headingClass);
        optionsButton.element.addClass(global.globalClass);
    }
}

// Expects relativeX and relative Y to be between 0 and 1
export function setElementCenterPositionRelative(element: p5.Element, relativeX: number, relativeY: number,
                                                 width: number, height: number) {
    let p = global.p5Scene.sketchInstance;
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    element.position(canvasPosition.x + (relativeX * p.width) - (width / 2),
        canvasPosition.y + (relativeY * p.height) - (height / 2));
}

export function createLabeledInput(labelString: string, inputId: string, inputInitialValue: string, customClass: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let input: p5.Element;
    let container = DOMWrapper.create(() => {
        let labeledInputClass = "labeled-input";
        let container: p5.Element = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledInputClass);
        container.addClass(global.globalClass);

        let label = createLabel(p, labelString, inputId);
        label.addClass(customClass);
        label.addClass(labeledInputClass);
        label.addClass(global.globalClass);
        label.parent(container);

        input = p.createInput(inputInitialValue);
        input.addClass(customClass);
        input.addClass(labeledInputClass);
        input.addClass(global.globalClass);
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

function createCheckbox(p: p5, initialState: boolean): p5.Element {
    let checkbox = p.createElement("checkbox");
    checkbox.elt.checked = initialState;
    return checkbox;
}

// TODO: check that optionsEnum is actually an Enum, and initialEnumValue is a value for that enum
export function createLabeledSelect(labelString: string, selectId: string, optionsEnum: any, initialEnumValue: any,
                                    customClass: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let select: p5.Element;
    let labeledSelectClass = "labeled-select";
    let container = DOMWrapper.create(() => {
        let container: p5.Element = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledSelectClass);
        container.addClass(global.globalClass);

        let label = createLabel(p, labelString, selectId);
        label.addClass(customClass);
        label.addClass(labeledSelectClass);
        label.addClass(global.globalClass);
        label.parent(container);

        select = p.createSelect();
        select.addClass(customClass);
        select.addClass(labeledSelectClass);
        select.addClass(global.globalClass);
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

        let options: HTMLCollection = select.elt.children;
        for (let i = 0; i < options.length; i++) {
            options.item(i).setAttribute("class",
                customClass + " " + labeledSelectClass + " " + global.globalClass);
        }
    }

    return {element: select, alreadyExists: container.alreadyExists};
}

export function createKeyBindingInput(trackNumber: number, numTracks: number, customClass: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let setButtonId = getKeyBindingButtonId(trackNumber, numTracks);
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
            global.keyboardEventManager.bindKeyToAction(-1, () => {
                setConfigKeyBinding(trackNumber, numTracks,
                    {trackNumber: trackNumber, keyCode: p.keyCode, string: getKeyString(p)});
                global.keyboardEventManager.unbindKey(-1);
            });
        });
        setButton.addClass(customClass);
        setButton.addClass(keybindingInputClass);
        setButton.addClass(global.globalClass);

        return container;
    }, getKeyBindingContainerId(trackNumber, numTracks));

    let trackBindingInfo = findBindingInfoForTrack(trackNumber, global.config.keyBindings.get(numTracks));
    let keyString = trackBindingInfo.string;
    let labelString = 'Track ' + (trackNumber + 1) + ': <span class="' +
        keybindingInputClass + " " + customClass + " " + global.globalClass +
        '">' + keyString + '</span>';
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
        container.addClass(global.globalClass);

        let label = createLabel(p, labelString, inputId);
        label.addClass(customClass);
        label.addClass(labeledTextareaClass);
        label.addClass(global.globalClass);
        label.parent(container);

        textArea = p.createElement("textarea", inputInitialValue);
        textArea.addClass(customClass);
        textArea.addClass(labeledTextareaClass);
        textArea.addClass(global.globalClass);
        textArea.parent(container);
        textArea.id(inputId);
        textArea.attribute("rows", rows.toString());
        textArea.attribute("cols", cols.toString());

        return container;
    }, inputId + "Container");

    return {element: textArea, alreadyExists: container.alreadyExists};
}

export function createFileInput(labelString: string, buttonText: string, uniqueId: string, onFileLoad: (file: p5.File) => void,
                                customClass: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let buttonId = uniqueId + "Button";
    let containerId = uniqueId + "Container";
    let container = DOMWrapper.create(() => {
        let fileInputClass = "file-input";
        let container: p5.Element = p.createDiv();
        container.addClass(customClass);
        container.addClass(fileInputClass);
        container.addClass(global.globalClass);

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
        button.addClass(global.globalClass);

        let label = createLabel(p, labelString, buttonId);
        label.addClass(customClass)
        label.addClass(fileInputClass);
        label.addClass(global.globalClass);
        label.parent(container);

        return container;
    }, containerId);

    let label: p5.Element = getFirstElementByTagName(container.element, "LABEL");
    label.html(labelString);

    return container;
}

export function createLabeledCheckbox(labelString: string, checkboxId: string, isChecked: boolean, customClass: string):
    { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let checkbox: p5.Element;
    let container = DOMWrapper.create(() => {
        let labeledCheckboxClass = "labeled-checkbox";
        let container: p5.Element = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledCheckboxClass);
        container.addClass(global.globalClass);

        let label = createLabel(p, labelString, checkboxId);
        label.addClass(customClass);
        label.addClass(labeledCheckboxClass);
        label.addClass(global.globalClass);
        label.parent(container);

        checkbox = createCheckbox(p, isChecked);
        checkbox.addClass(customClass);
        checkbox.addClass(labeledCheckboxClass);
        checkbox.addClass(global.globalClass);
        checkbox.parent(container);
        checkbox.id(checkboxId);

        return container;
    }, checkboxId + "Container");

    return {element: checkbox, alreadyExists: container.alreadyExists};
}