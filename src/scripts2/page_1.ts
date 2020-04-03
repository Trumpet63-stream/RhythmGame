import * as p5 from "p5";
import {DOMWrapper, drawHeading, setElementCenterPositionRelative} from "./ui_util";
import {global} from "./index";

let initialized = false;

export abstract class Page1 {
    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;

        let smFileInput = DOMWrapper.create(() => {
            return p.createFileInput(handleSmFileInput, "false");
        }, "button").element;
        setElementCenterPositionRelative(smFileInput, 0.5, 0.5);
        smFileInput.mousePressed(() => {
            p.background(p.random(255));
        });
    }

}

function handleSmFileInput(file: p5.File) {
    backfillFileSubtypeIfUndefined(file);
    console.log(file);
}

function backfillFileSubtypeIfUndefined(file: p5.File) {
    if (file.subtype === undefined) {
        file.subtype = file.name.split(".").pop();
    }
}
