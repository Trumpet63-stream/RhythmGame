import {global} from "../../index";
import * as p5 from "p5";
import {
    createLabeledInput,
    drawHeading,
    encloseEachInputLabelPairIntoASubDiv,
    fixRadioDivElement,
    setElementCenterPositionRelative,
    styleRadioOptions
} from "../../ui_util";
import {DOMWrapper} from "../../dom_wrapper";
import {PageManager, PAGES} from "../../page_manager";
import {OnlinePlaylist, OnlinePlaylistState} from "./online_playlist";
import {initPlayingDisplay, isFilesReady} from "../../util";
import {Stepfile} from "../../stepfile";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";

const playFromOnlineStepfile = new Stepfile();
const playFromOnlineAudioFile = new HtmlAudioElementHelper();

// This prevents loading previous song upon returning to a loaded playlist
let isSwfLoadStarted: boolean = false;

export abstract class PlayFromOnline {
    public static PLAY_FROM_ONLINE_CLASS: string = "play-from-online";

    public static draw() {
        drawHeading();
        let onlinePlaylist: OnlinePlaylist = <OnlinePlaylist> global.onlinePlaylist;
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        let urlInput = createLabeledInput("Engine URL", "urlInput", onlinePlaylist.indexUrl,
            PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
        // @ts-ignore
        let urlInputDiv = new p5.Element(urlInput.element.parent());
        setElementCenterPositionRelative(urlInputDiv, 0.50, 0.21, 600, 38);

        let loadButton = DOMWrapper.create(() => {
            return p.createButton("Load");
        }, "loadButton");
        setElementCenterPositionRelative(loadButton.element, 0.85, 0.215, 62, 33);
        if (!loadButton.alreadyExists) {
            loadButton.element.addClass(global.globalClass);
            loadButton.element.addClass(PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
            loadButton.element.mouseClicked(() => {
                let value: string | number = urlInput.element.value();
                if (typeof value === "string") {
                    loadButton.element.attribute('disabled', '');
                    onlinePlaylist.kickOffLoadPlaylist(value);
                }
            });
        }
        if (onlinePlaylist.state !== OnlinePlaylistState.LOADING_PLAYLIST) {
            loadButton.element.removeAttribute('disabled');
        }

        if (onlinePlaylist.state === OnlinePlaylistState.PLAYLIST_READY ||
            onlinePlaylist.state === OnlinePlaylistState.LOADING_SONG) {
            let playlistMenuId = "playlistMenu"
            let playlistMenu = drawRadioMenu(p, playlistMenuId, onlinePlaylist.displayedPlaylist);
            setElementCenterPositionRelative(playlistMenu, 0.5, 0.62, 500, 200);

            drawPageControls(p, playlistMenuId);

            if (playlistMenu.value() !== "") {
                let loadAndPlayButton = DOMWrapper.create(() => {
                    return p.createButton("Load And Play");
                }, "loadAndPlayButton");
                setElementCenterPositionRelative(loadAndPlayButton.element, 0.5, 0.88, 118, 34);

                if (!loadAndPlayButton.alreadyExists) {
                    loadAndPlayButton.element.addClass(global.globalClass);
                    loadAndPlayButton.element.mouseClicked(() => {
                        let value: string | number = playlistMenu.value();
                        if (typeof value === "string") {
                            value = parseInt(value);
                        }
                        if (Number.isInteger(value)) {
                            loadAndPlayButton.element.attribute('disabled', '');
                            onlinePlaylist.kickOffLoadSong(value, playFromOnlineStepfile, playFromOnlineAudioFile);
                            isSwfLoadStarted = true;
                        }
                    });
                }
                if (onlinePlaylist.state !== OnlinePlaylistState.LOADING_SONG) {
                    loadAndPlayButton.element.removeAttribute('disabled');
                }

                if (isFilesReady(playFromOnlineStepfile, playFromOnlineAudioFile) && isSwfLoadStarted) {
                    initPlayingDisplay(playFromOnlineStepfile.fullParse.tracks, playFromOnlineAudioFile);
                    PageManager.setCurrentPage(PAGES.PLAY);
                }

            } else {
                DOMWrapper.removeElementById("loadAndPlayButton");
                isSwfLoadStarted = false;
            }

        } else {
            DOMWrapper.removeElementById("playlistMenu");
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
        radioMenu.id("radio-div");
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

function drawPageControls(p: p5, playlistMenuId: string) {
    let pageControlsDiv = DOMWrapper.create(() => {
        return p.createDiv();
    }, "pageControlsDiv");
    if (!pageControlsDiv.alreadyExists) {
        pageControlsDiv.element.addClass("page-controls");
        pageControlsDiv.element.addClass(PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
        pageControlsDiv.element.addClass(global.globalClass);
        setElementCenterPositionRelative(pageControlsDiv.element, 0.5, 0.383, 140, 30);
    }

    let pageNumberText = DOMWrapper.create(() => {
        let textContainer = p.createElement("span");
        textContainer.addClass(global.globalClass);
        return textContainer;
    }, "pageNumberText");

    let previousPageButton = DOMWrapper.create(() => {
        return p.createButton("&#8249;");
    }, "previousPageButton");
    if (!previousPageButton.alreadyExists) {
        previousPageButton.element.mouseClicked(() => {
            global.onlinePlaylist.previousPage();
            DOMWrapper.removeElementById(playlistMenuId);
            pageNumberText.element.html("Page " + (global.onlinePlaylist.getPage() + 1));
        });
        previousPageButton.element.addClass("page-control-button");
        pageControlsDiv.element.child(previousPageButton.element);
    }

    if(!pageNumberText.alreadyExists) {
        pageControlsDiv.element.child(pageNumberText.element);
        pageNumberText.element.html("Page " + (global.onlinePlaylist.getPage() + 1));
    }

    let nextPageButton = DOMWrapper.create(() => {
        return p.createButton("&#8250;");
    }, "nextPageButton");
    if (!nextPageButton.alreadyExists) {
        nextPageButton.element.mouseClicked(() => {
            global.onlinePlaylist.nextPage();
            DOMWrapper.removeElementById(playlistMenuId);
            pageNumberText.element.html("Page " + (global.onlinePlaylist.getPage() + 1));
        });
        nextPageButton.element.addClass("page-control-button");
        pageControlsDiv.element.child(nextPageButton.element);
    }
}