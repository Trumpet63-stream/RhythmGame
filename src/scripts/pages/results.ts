import {global} from "../index";
import {setElementCenterPositionRelative} from "../ui_util";
import * as p5 from "p5";
import {PageManager, PAGES} from "../page_manager";
import {DOMWrapper} from "../dom_wrapper";

export abstract class Results {
    public static draw() {
        let p: p5 = global.p5Scene.sketchInstance;
        p.background("black");

        global.resultsDisplay.draw();

        let returnButton = DOMWrapper.create(() => {
            return p.createButton("Return");
        }, "returnButton");
        setElementCenterPositionRelative(returnButton.element, 0.5, 0.9, 73, 34);
        if (!returnButton.alreadyExists) {
            returnButton.element.addClass(global.globalClass);
            returnButton.element.mouseClicked(() => {
                PageManager.return();
            })
        }
    }
}
