import * as p5 from "p5";
import {global} from "./index";
import {PageManager, PAGES} from "./page_manager";
import {
    enumToStringArray, findBindingInfoForTrack, getFirstElementByTagName,
    getKeyBindingButtonId,
    getKeyBindingContainerId,
    getKeyString,
    setConfigKeyBinding
} from "../scripts/util";

export function drawHeading() {
    let p: p5 = global.p5Scene.sketchInstance;

    let scene1Button = DOMWrapper.create(() => {
        return p.createButton("Play From File");
    }, "scene1Button").element;
    setElementCenterPositionRelative(scene1Button, 0.3, 0.05);
    scene1Button.mousePressed(() => {
        PageManager.setCurrentScene(PAGES.PAGE_1);
    });

    let scene2Button = DOMWrapper.create(() => {
        return p.createButton("Options");
    }, "scene2Button").element;
    setElementCenterPositionRelative(scene2Button, 0.7, 0.05);
    scene2Button.mousePressed(() => {
        PageManager.setCurrentScene(PAGES.PAGE_2);
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

// Lets us code the DOM UI elements as if it were "immediate", i.e. stateless
export abstract class DOMWrapper {
    private static registry: Map<string, p5.Element> = new Map();

    // uniqueID should be unique within a scene
    public static create(createCall: () => p5.Element, uniqueId: string): { element: p5.Element, alreadyExists: boolean } {
        if (this.registry.has(uniqueId)) {
            return {
                element: this.registry.get(uniqueId),
                alreadyExists: true
            };
        } else {
            let element = createCall();
            this.registry.set(uniqueId, element);
            return {
                element: element,
                alreadyExists: false
            };
        }
    }

    public static clearRegistry() {
        this.registry.forEach((value, key, map) => {
            value.remove();
        });
        this.registry.clear();
    }

    // Returns true if remove was successful, otherwise returns false;
    public static removeElementById(id: string) {
        if (this.registry.has(id)) {
            this.registry.get(id).remove();
            this.registry.delete(id);
            return true;
        } else {
            return false;
        }
    }

    // Returns the element if found, otherwise returns undefined;
    public static getElementById(id: string) {
        return this.registry.get(id);
    }
}

export function createLabeledInput(labelString: string, inputId: string, inputInitialValue: string): { element: p5.Element, alreadyExists: boolean } {
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

// TODO: check that optionsEnum is actually an Enum, and initialEnumValue is a value for that enum
export function createLabeledSelect(labelString: string, selectId: string, optionsEnum: any, initialEnumValue: any):
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

export function createKeyBindingInput(trackNumber: number, numTracks: number): { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let setButtonId = getKeyBindingButtonId(trackNumber, numTracks);
    let container = DOMWrapper.create(() => {
        let container = p.createDiv();
        let labelHtml = getLabelHtml(setButtonId, "");
        container.html(labelHtml);

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

        container.style("margin-top:10px; margin-bottom:10px");
        return container;
    }, getKeyBindingContainerId(trackNumber, numTracks));

    let trackBindingInfo = findBindingInfoForTrack(trackNumber, global.config.keyBindings.get(numTracks));
    let keyString = trackBindingInfo.string;
    let labelString = 'Track ' + (trackNumber + 1) + ': ' + keyString;
    let labelElement = getFirstElementByTagName(container.element, "LABEL");
    labelElement.html(labelString);

    return container;
}

export function createLabeledTextArea(labelString: string, inputId: string, inputInitialValue: string):
    { element: p5.Element, alreadyExists: boolean } {
    let p: p5 = global.p5Scene.sketchInstance;

    let textArea: p5.Element;
    let container = DOMWrapper.create(() => {
        let container = p.createDiv();
        let labelHtml = getLabelHtml(inputId, labelString);
        container.html(labelHtml + "<br>");
        textArea = p.createElement("textarea", inputInitialValue);
        textArea.parent(container);
        textArea.id(inputId);
        container.style("margin-top:10px; margin-bottom:10px");
        return container;
    }, inputId + "Container");

    return {element: textArea, alreadyExists: container.alreadyExists};
}