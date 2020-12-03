import * as p5 from "p5";
import {global} from "../../index";
import {drawHeading, setElementCenterPositionRelative} from "../../ui_util";
import {RadioTable} from "../../radio_table";
import {PageControls} from "../../page_controls";
import {ReplaysList, ReplaysListState} from "./replays_list";
import {Stepfile} from "../../stepfile";
import {StorageUtil} from "../../storage_util";
import {DOMWrapper} from "../../dom_wrapper";
import {Replay} from "../../accuracy_recording";
import {ReplayDisplay} from "../replay/replay_display";
import {PageDescription, PageManager, Pages} from "../page_manager";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";

export abstract class Replays {
    private static stepfile: Stepfile;
    private static audioFile: HtmlAudioElementHelper;
    private static replaysList: ReplaysList;
    private static returnPage: PageDescription;

    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);
        let replaysMenuId: string = "storage-menu";

        if (Replays.replaysList.state === ReplaysListState.NO_STORAGE) {
            Replays.replaysList.kickOffLoadReplaysList(StorageUtil.getKeyFromTracks(this.stepfile.tracks));
        }

        let viewReplayButtonId = "viewReplayButton";
        if (Replays.replaysList.state === ReplaysListState.STORAGE_READY) {
            let pageControls = PageControls.create(replaysMenuId, Replays.replaysList).element;
            setElementCenterPositionRelative(pageControls, 0.5, 0.3, 140, 30);

            let replaysMenu = RadioTable.create(replaysMenuId, 630, 300, [50, 25, 25],
                ["Timestamp", "Score", "Size"], Replays.replaysList.currentContents).element;
            setElementCenterPositionRelative(replaysMenu, 0.5, 0.60, 630, 260);

            if (this.replayIsSelected(replaysMenu)) {
                let viewReplayButton = DOMWrapper.create(() => {
                    return p.createButton("View Replay");
                }, viewReplayButtonId);
                setElementCenterPositionRelative(viewReplayButton.element, 0.5, 0.2, 106, 34);
                if (!viewReplayButton.alreadyExists) {
                    viewReplayButton.element.addClass(global.globalClass);
                    this.setViewReplayButtonBehavior(viewReplayButton.element, replaysMenu);
                }
            }
        }
    }

    public static initialize(stepfile: Stepfile, audioFile: HtmlAudioElementHelper, returnPage: PageDescription) {
        Replays.stepfile = stepfile;
        Replays.audioFile = audioFile;
        Replays.replaysList = new ReplaysList(global.config);
        Replays.returnPage = returnPage;
    }

    private static replayIsSelected(replayRadio: p5.Element) {
        return replayRadio.value() !== "";
    }

    private static setViewReplayButtonBehavior(button: p5.Element, replayRadio: p5.Element) {
        button.mouseClicked(() => {
            let indexOnCurrentPage: number = Number(replayRadio.value());
            let replay: Replay = this.replaysList.getReplay(indexOnCurrentPage);
            global.replayDisplay = new ReplayDisplay(this.stepfile.tracks, this.audioFile, global.config,
                global.p5Scene, this.returnPage, replay)
            PageManager.setCurrentPage(Pages.REPLAY);
        });
    }
}