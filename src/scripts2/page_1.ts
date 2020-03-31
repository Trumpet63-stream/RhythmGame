import * as p5 from "p5";
import {DOMWrapper, drawHeading, setCenterPositionRelative} from "./ui_util";
import {global} from "./index";

export abstract class Page1 {
    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;

        let button = DOMWrapper.create(() => {
            return p.createButton("Click Me!");
        }, "button").element;
        setCenterPositionRelative(button, 0.5, 0.5);
        button.mousePressed(() => {
            p.background(p.random(255));
        });

        global.playingDisplay.draw();
    }
}