import * as p5 from "p5";
import {global} from "./index";
import {PageManager, Pages} from "./page_manager";
import {enumToString, enumToStringArray, getFirstElementByTagName,} from "./util";
import {DOMWrapper} from "./dom_wrapper";
import {Options} from "./pages/options/options";

export function drawHeading() {
    let p: p5 = global.p5Scene.sketchInstance;
    let headingClass = "navigation-heading";
    let y: number = 0;
    let x: number = 50;
    let spacing: number = 52.8;

    let playFromFileButton = DOMWrapper.create(() => {
        return p.createButton("Play From File");
    }, "playFromFileButton");
    setElementPosition(playFromFileButton.element, x, y);
    playFromFileButton.element.mousePressed(() => {
        PageManager.setCurrentPage(Pages.PLAY_FROM_FILE);
    });
    if (!playFromFileButton.alreadyExists) {
        playFromFileButton.element.addClass(headingClass);
        playFromFileButton.element.addClass(global.globalClass);
    }
    x += spacing + 130;

    let playFromOnlineButton = DOMWrapper.create(() => {
        return p.createButton("Play From Online");
    }, "playFromOnlineButton");
    setElementPosition(playFromOnlineButton.element, x, y);
    playFromOnlineButton.element.mousePressed(() => {
        PageManager.setCurrentPage(Pages.PLAY_FROM_ONLINE);
    });
    if (!playFromOnlineButton.alreadyExists) {
        playFromOnlineButton.element.addClass(headingClass);
        playFromOnlineButton.element.addClass(global.globalClass);
    }
    x += spacing + 146;


    let optionsButton = DOMWrapper.create(() => {
        return p.createButton("Options");
    }, "optionsButton");
    setElementPosition(optionsButton.element, x, y);
    optionsButton.element.mousePressed(() => {
        PageManager.setCurrentPage(Pages.OPTIONS);
    });
    if (!optionsButton.alreadyExists) {
        optionsButton.element.addClass(headingClass);
        optionsButton.element.addClass(global.globalClass);
    }
    x += spacing + 90;


    let storageButton = DOMWrapper.create(() => {
        return p.createButton("Storage");
    }, "storageButton");
    setElementPosition(storageButton.element, x, y);
    storageButton.element.mousePressed(() => {
        PageManager.setCurrentPage(Pages.STORAGE);
    });
    if (!storageButton.alreadyExists) {
        storageButton.element.addClass(headingClass);
        storageButton.element.addClass(global.globalClass);
    }
}

export function setElementPosition(element: p5.Element, x: number, y: number) {
    let p = global.p5Scene.sketchInstance;
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    element.position(canvasPosition.x + x, canvasPosition.y + y);
}

// Expects relativeX and relative Y to be between 0 and 1
export function setElementCenterPositionRelative(element: p5.Element, relativeX: number, relativeY: number,
                                                 width: number, height: number) {
    let p = global.p5Scene.sketchInstance;
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    element.position(canvasPosition.x + (relativeX * p.width) - (width / 2),
        canvasPosition.y + (relativeY * p.height) - (height / 2));
}

export function setElementToBottom(element: p5.Element, heightPercent: number, stylingWidth: number, stylingHeight: number) {
    let p = global.p5Scene.sketchInstance;
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    let elementHeight = heightPercent / 100 * p.height;
    element.position(canvasPosition.x, canvasPosition.y + (p.height - elementHeight - stylingHeight));
    element.style("width: " + (p.width - stylingWidth) + "px");
    element.style("height: " + elementHeight + "px");
}

export function createLabeledInput(labelString: string, inputId: string, inputInitialValue: string, customClass: string): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

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

        let input = p.createInput(inputInitialValue);
        input.addClass(customClass);
        input.addClass(labeledInputClass);
        input.addClass(global.globalClass);
        input.parent(container);
        input.id(inputId);

        return container;
    }, inputId + "Container");

    let input = getFirstElementByTagName(container.element, "INPUT");

    return {element: input, alreadyExists: container.alreadyExists};
}

export function createLabel(p: p5, labelString: string, forId?: string): p5.Element {
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
export function createLabeledSelect(labelString: string, selectId: string, OptionsEnum: any, initialEnumValue: any,
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
        let initialOptions = enumToStringArray(OptionsEnum);
        for (let i = 0; i < initialOptions.length; i++) {
            // @ts-ignore
            select.option(initialOptions[i]);
        }
        // @ts-ignore
        select.selected(enumToString(OptionsEnum, initialEnumValue));

        let options: HTMLCollection = select.elt.children;
        for (let i = 0; i < options.length; i++) {
            options.item(i).setAttribute("class",
                customClass + " " + labeledSelectClass + " " + global.globalClass);
        }
    }

    return {element: select, alreadyExists: container.alreadyExists};
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

export enum YesNo {
    Yes,
    No
}

export function booleanToYesNo(boolean: boolean): YesNo {
    if (boolean) {
        return YesNo.Yes;
    } else {
        return YesNo.No;
    }
}

export function yesNoToBoolean(yesNo: YesNo): boolean {
    if (yesNo === YesNo.Yes) {
        return true;
    } else {
        return false;
    }
}

// https://discourse.processing.org/t/how-to-organize-radio-buttons-in-separate-lines/10041/5
export function encloseEachInputLabelPairIntoASubDiv(p: p5, radioDivP5Element: p5.Element) {
    const inputs: p5.Element[] = selectAll(p, 'input', radioDivP5Element);
    const labels: p5.Element[] = selectAll(p, 'label', radioDivP5Element);
    const len = inputs.length;

    for (let i = 0; i < len; ++i) {
        p.createDiv().parent(radioDivP5Element).child(inputs[i]).child(labels[i]);
    }
}

// https://discourse.processing.org/t/how-to-organize-radio-buttons-in-separate-lines/10041/5
export function fixRadioDivElement(radioDivP5Element: p5.Element) {
    // @ts-ignore
    radioDivP5Element._getInputChildrenArray = function () {
        return this.elt.getElementsByTagName('input');
    }
}

export function styleRadioOptions(p: p5, radioDivP5Element: p5.Element, styleClasses: string[]) {
    let divs: p5.Element[] = selectAll(p, 'div', radioDivP5Element);
    for (let i = 0; i < divs.length; i++) {
        divs[i].addClass(styleClasses.join(" "));
    }

    let inputs: p5.Element[] = selectAll(p, 'input', radioDivP5Element);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addClass(styleClasses.join(" "));
    }

    let labels: p5.Element[] = selectAll(p, 'label', radioDivP5Element);
    for (let i = 0; i < inputs.length; i++) {
        labels[i].addClass(styleClasses.join(" "));
    }
}

function removeAllOccurrencesOfTag(html: string, tagName: string) {
    let tempDiv = document.createElement("div");
    let elements = tempDiv.getElementsByTagName(tagName);
    while (elements[0] !== undefined) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    return tempDiv.innerHTML;
}

export function setOnInputUnlessItAlreadyExists(inputElement: { element: p5.Element, alreadyExists: boolean }, onInput: () => void) {
    if (!inputElement.alreadyExists) {
        // @ts-ignore
        inputElement.element.input(onInput);
    }
}

function selectAll(p: p5, tagName: string, container: p5.Element): p5.Element[] {
    if (container.id() === "") {
        throw "error: container used with selectAll must have an id";
    }
    let id = "#" + container.id();
    return p.selectAll(tagName, id);
}

export function createUserInput(create: () => { element: p5.Element, alreadyExists: boolean },
                                isValidInput: (input: number | string) => boolean,
                                showInfo: () => void,
                                showError: () => void,
                                onValidInput: (input: number | string) => void,
                                parent: p5.Element
): { element: p5.Element, alreadyExists: boolean } {
    let created: { element: p5.Element, alreadyExists: boolean } = create();
    if (!created.alreadyExists) {
        let element = created.element;
        parent.child(element.parent());
        element.mouseClicked(() => {
            let value: string | number = element.value();
            if (isValidInput(value)) {
                showInfo();
            } else {
                showError();
            }
        });
        // @ts-ignore
        element.input(() => {
            let value: string | number = element.value();
            if (isValidInput(value)) {
                showInfo();
                onValidInput(value);
            } else {
                showError();
            }
        });
    }
    return created
}

export function setElementClasses(element: p5.Element, ...classes: string[]) {
    element.class(classes.join(" "));
}