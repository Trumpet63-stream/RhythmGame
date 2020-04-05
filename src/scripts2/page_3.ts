import * as p5 from "p5";
import {global} from "./index";

export abstract class Page3 {
    public static draw() {
        global.playingDisplay.draw();
    }
}
