import {global} from "../../index";
import {setElementCenterPositionRelative} from "../../ui_util";
import * as p5 from "p5";
import {PageManager, Pages} from "../page_manager";
import {DOMWrapper} from "../../dom_wrapper";
import {SyncGameDisplay} from "../sync/sync_game_display";
import {SyncResultsDisplay} from "./sync_results_display";

export abstract class SyncResults {
    public static draw() {
        let p: p5 = global.p5Scene.sketchInstance;
        p.background("black");

        global.syncResultsDisplay.draw();

        let applyButton = DOMWrapper.create(() => {
            return p.createButton("Apply Changes");
        }, "applyButton");
        setElementCenterPositionRelative(applyButton.element, 0.5, 0.8, 120, 34);
        if (!applyButton.alreadyExists) {
            applyButton.element.addClass(global.globalClass);
            applyButton.element.mouseClicked(() => {
                (<SyncResultsDisplay>global.syncResultsDisplay).applyRecommendedChange();
                (<SyncGameDisplay>global.syncGameDisplay).replay();
                PageManager.setCurrentPage(Pages.SYNC);
            })
        }

        let returnButton = DOMWrapper.create(() => {
            return p.createButton("Return");
        }, "returnButton");
        setElementCenterPositionRelative(returnButton.element, 0.5, 0.9, 74, 34);
        if (!returnButton.alreadyExists) {
            returnButton.element.addClass(global.globalClass);
            returnButton.element.mouseClicked(() => {
                PageManager.setCurrentPage(global.syncGameDisplay.returnPage);
            })
        }
    }
}
