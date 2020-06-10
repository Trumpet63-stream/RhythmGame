import {global} from "./index";
import {PlayFromFile} from "./pages/play_from_file";
import {Options} from "./pages/options";
import {Play} from "./pages/play";
import {Results} from "./pages/results";
import {DOMWrapper} from "./dom_wrapper";
import {PlayFromSwf} from "./pages/play_from_swf";
import {PlayFromOnline} from "./pages/play_from_online";

export enum PAGES {
    PLAY_FROM_FILE,
    OPTIONS,
    PLAY,
    RESULTS,
    PLAY_FROM_SWF,
    PLAY_FROM_ONLINE,
}

export abstract class PageManager {
    private static currentScene: PAGES = PAGES.PLAY_FROM_FILE;

    public static getCurrentScene() {
        return this.currentScene;
    }

    public static setCurrentScene(scene: PAGES) {
        this.currentScene = scene;
        DOMWrapper.clearRegistry();
    }

    public static draw() {
        console.log(this.currentScene);
        switch (this.currentScene) {
            case PAGES.PLAY_FROM_FILE:
                PlayFromFile.draw();
                break;
            case PAGES.OPTIONS:
                Options.draw();
                break;
            case PAGES.PLAY:
                Play.draw();
                break;
            case PAGES.RESULTS:
                Results.draw();
                break;
            case PAGES.PLAY_FROM_SWF:
                PlayFromSwf.draw();
                break;
            case PAGES.PLAY_FROM_ONLINE:
                PlayFromOnline.draw();
            default:
                throw new Error("Unexpected scene: " + global.currentScene);
        }
    }
}