import {global} from "../index";

export abstract class Play {
    public static draw() {
        global.playingDisplay.draw();
    }
}
