import * as p5 from "p5";
import {ScrollDirection} from "../scripts/scroll_direction";
import {global} from "./index";
import {PageManager, PAGES} from "./page_manager";
import {enumToStringArray, getKeyBindingButtonId, getKeyString, setConfigKeyBinding} from "../scripts/util";

export function drawHeading() {
    let p: p5 = global.p5Scene.sketchInstance;

    let scene1Button = DOMWrapper.create(() => {
        return p.createButton("Play From File");
    }, "scene1Button").element;
    setCenterPositionRelative(scene1Button, 0.3, 0.05);
    scene1Button.mousePressed(() => {
        PageManager.setCurrentScene(PAGES.PAGE_1);
    });

    let scene2Button = DOMWrapper.create(() => {
        return p.createButton("Options");
    }, "scene2Button").element;
    setCenterPositionRelative(scene2Button, 0.7, 0.05);
    scene2Button.mousePressed(() => {
        PageManager.setCurrentScene(PAGES.PAGE_2);
    });
}

// Expects relativeX and relative Y to be between 0 and 1
export function setCenterPositionRelative(element: p5.Element, relativeX: number, relativeY: number) {
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

export function createLabelledInput(labelString: string, uniqueId: string, initialValue: string, labelFontSize: number,
                             labelX: number, labelY: number) {
    let p: p5 = global.p5Scene.sketchInstance;
    p.push();
    p.textSize(labelFontSize);
    p.text(labelString, labelX, labelY);
    // @ts-ignore
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    let input = DOMWrapper.create(() => {
        return p.createInput(initialValue);
    }, uniqueId).element;

    let inputFontSize = labelFontSize * 0.9;
    let inputRelativeLength = 8.0;
    let relativeSpacing = 1.0;
    input.style("font-size", inputFontSize + "px");
    input.size(inputRelativeLength * inputFontSize);
    let inputSize: { width?: number, height?: number } = input.size();
    input.position(canvasPosition.x + labelX + p.textWidth(labelString) + relativeSpacing * labelFontSize,
        canvasPosition.y + labelY - (inputSize.height / 2) - (p.textAscent() * 0.35));
    p.pop();
    return input;
}

// TODO: check that optionsEnum is actually an Enum, and initialEnumValue is a value for that enum
export function createLabelledSelect(labelString: string, uniqueId: string, optionsEnum: any, initialEnumValue: any,
                              labelFontSize: number, labelX: number, labelY: number) {
    let p: p5 = global.p5Scene.sketchInstance;
    p.push();
    p.textSize(labelFontSize);
    p.text(labelString, labelX, labelY);
    // @ts-ignore
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    let createResult = DOMWrapper.create(() => {
        return p.createSelect();
    }, uniqueId);
    let select = createResult.element;
    if (!createResult.alreadyExists) {
        let initialOptions = enumToStringArray(optionsEnum);
        for (let i = 0; i < initialOptions.length; i++) {
            // @ts-ignore
            select.option(initialOptions[i]);
        }
        // @ts-ignore
        select.selected(ScrollDirection[initialEnumValue as keyof typeof ScrollDirection].toString());
    }

    let inputFontSize = labelFontSize * 0.9;
    let inputRelativeLength = 8.0;
    let relativeSpacing = 1.0;
    select.style("font-size", inputFontSize + "px");
    select.size(inputRelativeLength * inputFontSize);
    let inputSize: { width?: number, height?: number } = select.size();
    select.position(canvasPosition.x + labelX + p.textWidth(labelString) + relativeSpacing * labelFontSize,
        canvasPosition.y + labelY - (inputSize.height / 2) - (p.textAscent() * 0.35));
    p.pop();
    return select;
}

export function createKeyBindingInput(trackNumber: number, numTracks: number, labelFontSize: number, labelX: number, labelY: number) {
    let p: p5 = global.p5Scene.sketchInstance;
    p.push();
    p.textSize(labelFontSize);
    let labelString = "Track " + (trackNumber + 1);
    labelString += ":";
    p.text(labelString, labelX, labelY);

    let trackBindingInfo = findBindingInfoForTrack(trackNumber, global.config.keyBindings.get(numTracks));
    let keyString = trackBindingInfo.string;
    let labelToKeyRelativeSpacing = 1.0;
    let keyStringX = labelX + p.textWidth(labelString) + labelToKeyRelativeSpacing * labelFontSize;
    p.text(keyString, keyStringX, labelY);

    // @ts-ignore
    let canvasPosition: { x: number, y: number } = p._renderer.position();
    let button = DOMWrapper.create(() => {
        return p.createButton("Set");
    }, getKeyBindingButtonId(trackNumber, numTracks)).element;

    button.mousePressed(() => {
        global.keyboardEventManager.bindKeyToAction(-1, () => {
            setConfigKeyBinding(trackNumber, numTracks,
                {trackNumber: trackNumber, keyCode: p.keyCode, string: getKeyString(p)});
            global.keyboardEventManager.unbindKey(-1);
        });
    });

    let inputFontSize = labelFontSize * 0.9;
    let inputRelativeLength = 3.3;
    let relativeSpacing = 1.0;
    button.style("font-size", inputFontSize + "px");
    button.size(inputRelativeLength * inputFontSize);
    let inputSize: { width?: number, height?: number } = button.size();
    let minimumKeyStringSpace = p.textWidth("LShift"); // Nothing special about LShift here, just seems like a good long string
    let inputX = canvasPosition.x + keyStringX + Math.max(minimumKeyStringSpace, p.textWidth(keyString)) + relativeSpacing * labelFontSize;
    let inputY = canvasPosition.y + labelY - (inputSize.height / 2) - (p.textAscent() * 0.35);
    button.position(inputX, inputY);
    p.pop();
    return button;
}

function findBindingInfoForTrack(trackNumber: number, bindings: {trackNumber: number, keyCode: number, string: string}[]) {
    for(let i = 0; i < bindings.length; i++) {
        if (bindings[i].trackNumber === trackNumber) {
            return bindings[i];
        }
    }
    return undefined;
}