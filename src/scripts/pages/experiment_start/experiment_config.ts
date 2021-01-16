import {drawHeading, setElementCenterPositionRelative} from "../../ui_util";
import * as p5 from "p5";
import {global} from "../../index";
import {DOMWrapper} from "../../dom_wrapper";
import {initExperimentDisplay} from "../../util";
import {PageManager, Pages} from "../page_manager";

export abstract class ExperimentConfig {
    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        let playButtonId = "playButton";
        let playButton = DOMWrapper.create(() => {
            return p.createButton("Play");
        }, playButtonId);
        if (!playButton.alreadyExists) {
            playButton.element.addClass(global.globalClass);
            ExperimentConfig.setPlayButtonBehavior(playButton.element);
        }
        setElementCenterPositionRelative(playButton.element, 0.5, 0.5, 79, 30);
    }

    private static setPlayButtonBehavior(playButton: p5.Element) {
        playButton.mouseClicked(() => {
            initExperimentDisplay(4, Pages.EXPERIMENT_CONFIG, "Experiment")
            PageManager.setCurrentPage(Pages.EXPERIMENT);
        });
    }
}