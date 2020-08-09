import {global} from "../../index";

export abstract class Sync {
    public static draw() {
        global.p5Scene.sketchInstance.background("black");
        global.syncGameDisplay.draw();
    }
}
