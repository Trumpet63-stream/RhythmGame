import {global} from "../../index";
import {setElementCenterPositionRelative} from "../../ui_util";
import * as p5 from "p5";
import {PageManager} from "../page_manager";
import {DOMWrapper} from "../../dom_wrapper";
import {PutResponse, PutResponseCode} from "../../database_client/put_response";

export abstract class PlayResults {
    public static draw() {
        let p: p5 = global.p5Scene.sketchInstance;
        p.background("black");

        global.resultsDisplay.draw();

        let returnButton = DOMWrapper.create(() => {
            return p.createButton("Return");
        }, "returnButton");
        setElementCenterPositionRelative(returnButton.element, 0.5, 0.9, 73, 34);
        if (!returnButton.alreadyExists) {
            returnButton.element.addClass(global.globalClass);
            returnButton.element.mouseClicked(() => {
                PageManager.return();
            })
        }

        let scoreSubmission = DOMWrapper.create(() => {
            return p.createElement("span");
        }, "scoreSubmission");
        setElementCenterPositionRelative(scoreSubmission.element, 0.22, 0.9, 283, 18);
        if (!scoreSubmission.alreadyExists) {
            scoreSubmission.element.addClass(global.globalClass);
            scoreSubmission.element.html("Submitting score...");
            (<Promise<PutResponse>>global.submitLastPlayScore())
                .then(response => this.updateScoreSubmissionText(scoreSubmission.element, response))
        }
    }

    private static updateScoreSubmissionText(element: p5.Element, response: PutResponse) {
        if (response.code === PutResponseCode.SUCCESS || response.code === PutResponseCode.SCORE_TOO_LOW) {
            element.html("Submission result: " + response.message);
        }
    }
}
