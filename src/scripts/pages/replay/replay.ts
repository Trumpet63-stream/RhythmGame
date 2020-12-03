import {global} from "../../index";

export abstract class Replay {
    public static draw() {
        global.p5Scene.sketchInstance.background("black");
        global.replayDisplay.draw();
    }
}