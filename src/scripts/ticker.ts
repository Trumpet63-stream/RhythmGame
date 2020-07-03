import * as p5 from "p5";
import {DOMWrapper} from "./dom_wrapper";
import {global} from "./index";

export enum TickerState {
    INFORMATION,
    ERROR,
}

export abstract class Ticker {
    private static readonly informationClass = "ticker-info";
    private static readonly errorClass = "ticker-error";
    private static div: p5.Element;
    private static span: p5.Element;
    private static state: TickerState;

    public static create(defaultMessage: string, customClass: string) {
        let p: p5 = global.p5Scene.sketchInstance;
        let tickerSpan = DOMWrapper.create(() => {
            return p.createElement("span", defaultMessage);
        }, "tickerSpan");
        let tickerDiv = DOMWrapper.create(() => {
            return p.createDiv();
        }, "tickerDiv");
        if (this.isInitializing(tickerDiv, tickerSpan)) {
            this.initialize(tickerDiv.element, tickerSpan.element);
        }
        this.setStyle(customClass);
        return tickerDiv;
    }

    private static isInitializing(element1: {alreadyExists: boolean}, element2: {alreadyExists: boolean}): boolean {
        return !element1.alreadyExists || !element2.alreadyExists;
    }

    private static initialize(div: p5.Element, span: p5.Element) {
        this.state = TickerState.INFORMATION;
        div.child(span);
        this.div = div;
        this.span = span;
    }

    public static setMessage(message: string, tickerState: TickerState) {
        this.span.html(message);
        this.state = tickerState;
    }

    private static setStyle(customClass: string) {
        if (this.state === TickerState.INFORMATION) {
            setElementClasses(this.div, global.globalClass, customClass, this.informationClass);
        } else if (this.state === TickerState.ERROR) {
            setElementClasses(this.div, global.globalClass, customClass, this.errorClass);
        }
    }
}

function setElementClasses(element: p5.Element, ...classes: string[]) {
    element.class(classes.join(" "));
}