import {PlayFromFile} from "./pages/play_from_file/play_from_file";
import {Options} from "./pages/options/options";
import {Play} from "./pages/play/play";
import {PlayResults} from "./pages/play_results/play_results";
import {DOMWrapper} from "./dom_wrapper";
import {PlayFromOnline} from "./pages/play_from_online/play_from_online";
import {Sync} from "./pages/sync/sync";
import {SyncResults} from "./pages/sync_results/sync_results";

export class PageDescription {
    public name: string;
    public draw: () => void;

    constructor(name: string, draw: () => void) {
        this.name = name;
        this.draw = draw;
    }
}

export abstract class Pages {
    public static readonly PLAY_FROM_FILE: PageDescription =
        new PageDescription("Play From File", PlayFromFile.draw.bind(PlayFromFile));

    public static readonly OPTIONS: PageDescription =
        new PageDescription("Options", Options.draw.bind(Options));

    public static readonly PLAY: PageDescription =
        new PageDescription("Play", Play.draw.bind(Play));

    public static readonly PLAY_RESULTS: PageDescription =
        new PageDescription("Play Results", PlayResults.draw.bind(PlayResults));

    public static readonly PLAY_FROM_ONLINE: PageDescription =
        new PageDescription("Play From Online", PlayFromOnline.draw.bind(PlayFromOnline));

    public static readonly SYNC: PageDescription =
        new PageDescription("Sync", Sync.draw.bind(Sync));
    
    public static readonly SYNC_RESULTS: PageDescription =
        new PageDescription("Sync Results", SyncResults.draw.bind(SyncResults));
}

export abstract class PageManager {
    private static currentPage: PageDescription = Pages.PLAY_FROM_FILE;
    private static returnPage: PageDescription;

    public static setCurrentPage(page: PageDescription) {
        if (this.currentPage !== Pages.PLAY && this.currentPage !== Pages.SYNC) {
            this.returnPage = this.currentPage;
        }
        this.currentPage = page;
        DOMWrapper.clearRegistry();
    }

    public static return() {
        this.setCurrentPage(this.returnPage);
    }

    public static draw() {
        this.currentPage.draw();
    }
}