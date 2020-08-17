import {global} from "./index";
import {PlayFromFile} from "./pages/play_from_file/play_from_file";
import {Options} from "./pages/options/options";
import {Play} from "./pages/play/play";
import {PlayResults} from "./pages/play_results/play_results";
import {DOMWrapper} from "./dom_wrapper";
import {PlayFromOnline} from "./pages/play_from_online/play_from_online";
import {Sync} from "./pages/sync/sync";
import {SyncResults} from "./pages/sync_results/sync_results";

export enum PAGES {
    PLAY_FROM_FILE,
    OPTIONS,
    PLAY,
    PLAY_RESULTS,
    PLAY_FROM_ONLINE,
    SYNC,
    SYNC_RESULTS,
}

export abstract class PageManager {
    private static currentPage: PAGES = PAGES.PLAY_FROM_FILE;
    private static returnPage: PAGES;

    public static setCurrentPage(page: PAGES) {
        if (this.currentPage !== PAGES.PLAY && this.currentPage !== PAGES.SYNC) {
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
            case PAGES.PLAY_RESULTS:
                PlayResults.draw();
                break;
            case PAGES.PLAY_FROM_ONLINE:
                PlayFromOnline.draw();
                break;
            case PAGES.SYNC:
                Sync.draw();
                break;
            case PAGES.SYNC_RESULTS:
                SyncResults.draw();
                break;
            default:
                throw new Error("Unexpected page: " + global.currentPage);
        }
    }
}