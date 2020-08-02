import {global} from "./index";
import {PlayFromFile} from "./pages/play_from_file/play_from_file";
import {Options} from "./pages/options/options";
import {Play} from "./pages/play/play";
import {Results} from "./pages/results/results";
import {DOMWrapper} from "./dom_wrapper";
import {PlayFromOnline} from "./pages/play_from_online/play_from_online";

export enum PAGES {
    PLAY_FROM_FILE,
    OPTIONS,
    PLAY,
    RESULTS,
    PLAY_FROM_ONLINE,
}

export abstract class PageManager {
    private static currentPage: PAGES = PAGES.PLAY_FROM_FILE;
    private static returnPage: PAGES;

    public static setCurrentPage(page: PAGES) {
        if (this.currentPage !== PAGES.PLAY) {
            this.returnPage = this.currentPage;
        }
        this.currentPage = page;
        DOMWrapper.clearRegistry();
    }

    public static return() {
        this.setCurrentPage(this.returnPage);
    }

    public static draw() {
        switch (this.currentPage) {
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
            case PAGES.PLAY_FROM_ONLINE:
                PlayFromOnline.draw();
                break;
            default:
                throw new Error("Unexpected page: " + global.currentPage);
        }
    }
}