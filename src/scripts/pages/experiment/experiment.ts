import {global} from "../../index";

export abstract class Experiment {
    public static draw() {
        global.p5Scene.sketchInstance.background("black");
        global.experimentDisplay.draw();
    }
}
