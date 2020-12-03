import {global} from "../../index";
import {setElementCenterPositionRelative} from "../../ui_util";
import * as p5 from "p5";
import {PageDescription, PageManager} from "../page_manager";
import {DOMWrapper} from "../../dom_wrapper";
import {PutResponse, PutResponseCode} from "../../database_client/put_response";
import {OfflineStorageClient} from "../../offline_storage_client/offline_storage_client";
import {AccuracyRecording} from "../../accuracy_recording";
import {NoteManager} from "../../note_manager";
import {StorageUtil} from "../../storage_util";
import {DatabaseClient} from "../../database_client/database_client";
import {disableButton, enableButton} from "../../util";
import {ReplayCompressor} from "../../replay_compressor";
import {PutRequest} from "../../database_client/put_request";

export interface ResultsMessage {
    accuracyRecording: AccuracyRecording,
    noteManager: NoteManager,
    returnPage: PageDescription,
    songTitle: string,
    isReplay: boolean
}

export abstract class PlayResults {
    public static messageFromLastPlay: ResultsMessage;

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
                PageManager.setCurrentPage(this.messageFromLastPlay.returnPage);
            })
        }

        if (!this.messageFromLastPlay.isReplay) {
            let saveReplayOfflineButton = DOMWrapper.create(() => {
                return p.createButton("Save Replay");
            }, "saveReplayOfflineButton");
            setElementCenterPositionRelative(saveReplayOfflineButton.element, 0.75, 0.9, 73, 34);
            if (!saveReplayOfflineButton.alreadyExists) {
                saveReplayOfflineButton.element.addClass(global.globalClass);
                saveReplayOfflineButton.element.mouseClicked(() => {
                    this.saveScore(saveReplayOfflineButton.element);
                })
            }

            let onlineScoreSubmitStatus = DOMWrapper.create(() => {
                return p.createElement("span");
            }, "onlineScoreSubmitStatus");
            setElementCenterPositionRelative(onlineScoreSubmitStatus.element, 0.22, 0.9, 283, 18);
            if (!onlineScoreSubmitStatus.alreadyExists) {
                onlineScoreSubmitStatus.element.addClass(global.globalClass);
                onlineScoreSubmitStatus.element.html("Submitting score...");
                this.submitScore()
                    .then(response => this.updateScoreSubmissionText(onlineScoreSubmitStatus.element, response))
                    .catch(reason => {
                        console.error(reason)
                        onlineScoreSubmitStatus.element.html("Score submission failed");
                    });
            }
        }
    }

    private static updateScoreSubmissionText(element: p5.Element, response: PutResponse) {
        if (response.code === PutResponseCode.SUCCESS || response.code === PutResponseCode.SCORE_TOO_LOW) {
            element.html("Submission result: " + response.message);
        }
    }

    private static submitScore(): Promise<PutResponse> {
        return new Promise(() => new DatabaseClient(global.config.username, global.config.password))
            .then((client: DatabaseClient) => {
                let songhash: string = StorageUtil.getKeyFromTracks(this.messageFromLastPlay.noteManager.tracks);
                let putRequest: PutRequest = {
                    songhash: songhash,
                    songname: this.messageFromLastPlay.songTitle,
                    score: global.resultsDisplay.currentScore.percentScore
                }
                return client.putIfBetterScore(putRequest);
            });
    }

    private static saveScore(saveReplayOfflineButton: p5.Element): void {
        disableButton(saveReplayOfflineButton);
        let compressedReplay = ReplayCompressor.compress(this.messageFromLastPlay.accuracyRecording.linearRecording);
        OfflineStorageClient.saveReplay(this.messageFromLastPlay.accuracyRecording, this.messageFromLastPlay.noteManager,
            this.messageFromLastPlay.songTitle)
            .then(() => saveReplayOfflineButton.html("Replay Saved"))
            .catch(() => {
                saveReplayOfflineButton.html("Save Failed");
                enableButton(saveReplayOfflineButton);
            });
    }
}
