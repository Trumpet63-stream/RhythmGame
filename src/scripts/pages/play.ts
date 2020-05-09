import {global} from "../index";

export abstract class Play {
    public static draw() {
        global.p5Scene.sketchInstance.background("black");
        global.playingDisplay.draw();
    }
}
