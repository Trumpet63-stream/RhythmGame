import {Page1} from "./page_1";
import {Page2} from "./page_2";
import {DOMWrapper} from "./ui_util";
import {global} from "./index";

export enum PAGES {
    PAGE_1,
    PAGE_2
}

export abstract class PageManager {
    private static currentScene: PAGES = PAGES.PAGE_1;

    public static getCurrentScene() {
        return this.currentScene;
    }

    public static setCurrentScene(scene: PAGES) {
        this.currentScene = scene;
        DOMWrapper.clearRegistry();
    }

    public static draw() {
        switch (this.currentScene) {
            case PAGES.PAGE_1:
                Page1.draw();
                break;
            case PAGES.PAGE_2:
                Page2.draw();
                break;
            default:
                throw new Error("Unexpected scene: " + global.currentScene);
        }
    }
}