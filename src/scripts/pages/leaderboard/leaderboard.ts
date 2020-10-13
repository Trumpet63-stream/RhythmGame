import * as p5 from "p5";
import {DOMWrapper} from "../../dom_wrapper";
import {global} from "../../index";
import {drawHeading, setElementCenterPositionRelative} from "../../ui_util";
import {RadioTable} from "../../radio_table";
import {PageControls} from "../../page_controls";
import {LeaderboardList, LeaderboardListState} from "./leaderboard_list";

let leaderboardList: LeaderboardList = new LeaderboardList();

export abstract class Leaderboard {
    private static LEADERBOARD_CLASS: string = "play-from-online";

    public static initialize(songhash: string) {
        leaderboardList.kickOffLoadLeaderboard(global.config, songhash);
    }

    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);
        let leaderboardId: string = "leaderboard";

        let statusTextId: string = "statusText";
        if (leaderboardList.state !== LeaderboardListState.READY) {
            let statusText = this.createStatusText(statusTextId);
            setElementCenterPositionRelative(statusText.element, 0.50, 0.21, 600, 38);
        } else {
            DOMWrapper.removeElementById(statusTextId);

            let pageControls = PageControls.create(leaderboardId, leaderboardList).element;
            setElementCenterPositionRelative(pageControls, 0.5, 0.3, 140, 30);

            let storageMenu = RadioTable.create(leaderboardId, 630, 300, [15, 60, 25],
                ["Rank", "User", "Score"], leaderboardList.currentContents).element;
            setElementCenterPositionRelative(storageMenu, 0.5, 0.60, 630, 260);
        }
    }

    private static createStatusText(uniqueId: string): { element: p5.Element, alreadyExists: boolean } {
        let p: p5 = global.p5Scene.sketchInstance;
        let div = DOMWrapper.create(() => {
            let container = p.createDiv();
            container.addClass(Leaderboard.LEADERBOARD_CLASS);
            container.addClass(global.globalClass);
            return container;
        }, uniqueId);
        div.element.html(this.getStatus());

        return div;
    }

    private static getStatus(): string {
        switch (leaderboardList.state) {
            case LeaderboardListState.NO_SCORES:
            case LeaderboardListState.LOADING:
                return "Loading...";
            case LeaderboardListState.ERROR:
            default:
                return "Failed to load leaderboard";
        }
    }
}