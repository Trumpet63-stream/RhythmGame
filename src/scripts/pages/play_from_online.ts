import {global} from "../index";
import * as p5 from "p5";
import {
    createFileInput,
    createLabeledInput,
    drawHeading, encloseEachInputLabelPairIntoASubDiv, fixRadioDivElement,
    setElementCenterPositionRelative,
    setOnInputUnlessItAlreadyExists, styleRadioOptions
} from "../ui_util";
import {StepfileState} from "../stepfile";
import {parseSwf} from "../parse_swf";
import {DOMWrapper} from "../dom_wrapper";
import {PageManager, PAGES} from "../page_manager";
import {initPlayingDisplay, isFilesReady} from "./play_from_file";
import {generatePreviewNotes, getModeOptionsForDisplay} from "../util";
import {OnlinePlaylistState} from "../online_playlist";
import {PreviewDisplay} from "../preview_display";

export abstract class PlayFromOnline {
    public static PLAY_FROM_ONLINE_CLASS: string = "play-from-online";

    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        let urlInput = createLabeledInput("Engine URL", "urlInput", "",
            PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
        // @ts-ignore
        let urlInputDiv = new p5.Element(urlInput.element.parent());
        setElementCenterPositionRelative(urlInputDiv, 0.50, 0.3, 600, 38);

        let loadButton = DOMWrapper.create(() => {
            return p.createButton("Load");
        }, "loadButton");
        setElementCenterPositionRelative(loadButton.element, 0.85, 0.305, 62, 33);
        if (!loadButton.alreadyExists) {
            loadButton.element.addClass(global.globalClass);
            loadButton.element.addClass(PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
            loadButton.element.mouseClicked(() => {
                let value: string | number = urlInput.element.value();
                if (typeof value === "string") {
                    global.onlinePlaylist.kickOffLoadPlaylist(value);
                }
            });
        }

        if (global.onlinePlaylist.state === OnlinePlaylistState.PLAYLIST_READY) {
            let playlistMenu = drawRadioMenu(p, "playlistMenu", global.onlinePlaylist.playlist);
            setElementCenterPositionRelative(playlistMenu, 0.5, 0.62, 500, 200);
            playlistMenu.mouseClicked(() => {
                if (playlistMenu.value() !== "") {
                    let value: string | number = playlistMenu.value();
                    if (typeof value === "string") {
                        value = parseInt(value);
                    }
                    if (Number.isInteger(value)) {
                        global.onlinePlaylist.kickOffLoadSong(value);
                    }
                }
            });
        } else {
            DOMWrapper.removeElementById("playlistMenu");
        }

        let playButtonId = "playButton";
        if (isFilesReady()) {
            let playButton = DOMWrapper.create(() => {
                return p.createButton("Play");
            }, playButtonId);
            setElementCenterPositionRelative(playButton.element, 0.5, 0.88, 60, 34);
            if (!playButton.alreadyExists) {
                playButton.element.addClass(global.globalClass);
                playButton.element.mouseClicked(() => {
                    initPlayingDisplay(global.stepfile.fullParse.tracks);
                    PageManager.setCurrentScene(PAGES.PLAY);
                });
            }
        } else {
            DOMWrapper.removeElementById(playButtonId);
        }
    }
}

interface MenuItem {
    toString: () => string;
}

function drawRadioMenu(p: p5, uniqueId: string, items: MenuItem[]): p5.Element {
    let menuClass = "playlist-radio"
    let menuItemClass = "playlist-radio-option";
    let radioMenuCreateResult = DOMWrapper.create(() => {
        return p.createRadio();
    }, uniqueId);
    let radioMenu = radioMenuCreateResult.element;
    if (!radioMenuCreateResult.alreadyExists) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let radioLabel = item.toString();
            // @ts-ignore
            let radioOption = radioMenu.option(radioLabel);

            // setting the value this way because the two-argument .option method wasn't working
            // setting the value is necessary so we can access the selected mode
            radioOption.value = i;
        }

        // This style is being set on the div containing the radio elements to make it a scrollable box
        radioMenu.addClass(menuClass);
        radioMenu.addClass(global.globalClass);

        encloseEachInputLabelPairIntoASubDiv(p, radioMenu);
        fixRadioDivElement(radioMenu);
        styleRadioOptions(p, radioMenu, [menuItemClass, global.globalClass]);
    }
    return radioMenu;
}