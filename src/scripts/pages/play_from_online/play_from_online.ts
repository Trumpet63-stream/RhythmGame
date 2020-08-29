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
import {PageManager, Pages} from "../../page_manager";
import {OnlinePlaylist, OnlinePlaylistState} from "./online_playlist";
import {initPlayingDisplay, initSyncGameDisplay, isFilesReady} from "../../util";
import {Stepfile} from "../../stepfile";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";

const playFromOnlineStepfile = new Stepfile();
const playFromOnlineAudioFile = new HtmlAudioElementHelper();

// This prevents loading previous song upon returning to a loaded playlist
let isSwfLoadStarted: boolean = false;

export abstract class PlayFromOnline {
    public static PLAY_FROM_ONLINE_CLASS: string = "play-from-online";
    private static onSongLoaded: () => void;

    public static draw() {
        drawHeading();
        let onlinePlaylist: OnlinePlaylist = <OnlinePlaylist>global.onlinePlaylist;
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        let urlInput = createLabeledInput("Engine URL", "urlInput", onlinePlaylist.indexUrl,
            PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
        // @ts-ignore
        let urlInputDiv = new p5.Element(urlInput.element.parent());
        setElementCenterPositionRelative(urlInputDiv, 0.50, 0.21, 600, 38);

        let loadPlaylistButton = DOMWrapper.create(() => {
            return p.createButton("Load");
        }, "loadPlaylistButton");
        setElementCenterPositionRelative(loadPlaylistButton.element, 0.85, 0.215, 62, 33);
        if (!loadPlaylistButton.alreadyExists) {
            loadPlaylistButton.element.addClass(global.globalClass);
            loadPlaylistButton.element.addClass(PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
            loadPlaylistButton.element.mouseClicked(() => {
                let value: string | number = urlInput.element.value();
                if (typeof value === "string") {
                    loadPlaylistButton.element.attribute('disabled', '');
                    onlinePlaylist.kickOffLoadPlaylist(value);
                }
            });
        }
        if (onlinePlaylist.state !== OnlinePlaylistState.LOADING_PLAYLIST) {
            loadPlaylistButton.element.removeAttribute('disabled');
        }

        let playlistMenuId = "playlistMenu"
        if (onlinePlaylist.state === OnlinePlaylistState.PLAYLIST_READY ||
            onlinePlaylist.state === OnlinePlaylistState.LOADING_SONG) {
            let playlistMenu = drawRadioMenu(p, playlistMenuId, onlinePlaylist.displayedPlaylist);
            setElementCenterPositionRelative(playlistMenu, 0.5, 0.62, 500, 200);

            drawPageControls(p, playlistMenuId);

            let loadAndPlayButtonId = "loadAndPlayButton";
            let loadAndSyncButtonId = "loadAndSyncButton";
            if (playlistMenu.value() !== "") {
                let loadAndPlayButton = DOMWrapper.create(() => {
                    return p.createButton("Load And Play");
                }, loadAndPlayButtonId);
                setElementCenterPositionRelative(loadAndPlayButton.element, 0.5, 0.88, 118, 34);

                if (!loadAndPlayButton.alreadyExists) {
                    loadAndPlayButton.element.addClass(global.globalClass);
                    this.setLoadAndPlayButtonBehavior(loadAndPlayButton.element, playlistMenu, onlinePlaylist);
                }

                let loadAndSyncButton = DOMWrapper.create(() => {
                    return p.createButton("Load Audio Sync Wizard");
                }, loadAndSyncButtonId);
                setElementCenterPositionRelative(loadAndSyncButton.element, 0.8, 0.88, 177, 34);
                if (!loadAndSyncButton.alreadyExists) {
                    loadAndSyncButton.element.addClass(global.globalClass);
                    this.setSyncButtonBehavior(loadAndSyncButton.element, playlistMenu, onlinePlaylist);
                }

                if (onlinePlaylist.state !== OnlinePlaylistState.LOADING_SONG) {
                    loadAndPlayButton.element.removeAttribute('disabled');
                }

                if (isFilesReady(playFromOnlineStepfile, playFromOnlineAudioFile) && isSwfLoadStarted) {
                    this.onSongLoaded();
                }

            } else {
                DOMWrapper.removeElementById(loadAndPlayButtonId);
                DOMWrapper.removeElementById(loadAndSyncButtonId);
                isSwfLoadStarted = false;
            }

        } else {
            DOMWrapper.removeElementById(playlistMenuId);
        }
    }

    private static setLoadAndPlayButtonBehavior(loadAndPlayButton: p5.Element, playlistMenu: p5.Element,
                                                onlinePlaylist: OnlinePlaylist) {
        loadAndPlayButton.mouseClicked(
            PlayFromOnline.loadSelectedSongAndDisableButton.bind(this, loadAndPlayButton, playlistMenu, onlinePlaylist,
                () => {
                    initPlayingDisplay(playFromOnlineStepfile.fullParse.tracks, playFromOnlineAudioFile,
                        Pages.PLAY_FROM_ONLINE, playFromOnlineStepfile.songTitle);
                    PageManager.setCurrentPage(Pages.PLAY);
                }));
    }

    private static setSyncButtonBehavior(loadAndSyncButton: p5.Element, playlistMenu: p5.Element,
                                         onlinePlaylist: OnlinePlaylist) {
        loadAndSyncButton.mouseClicked(
            PlayFromOnline.loadSelectedSongAndDisableButton.bind(this, loadAndSyncButton, playlistMenu, onlinePlaylist,
                () => {
                    initSyncGameDisplay(playFromOnlineStepfile.fullParse.tracks, playFromOnlineAudioFile,
                        Pages.PLAY_FROM_ONLINE, playFromOnlineStepfile.songTitle);
                    PageManager.setCurrentPage(Pages.SYNC);
                }));
    }

    private static loadSelectedSongAndDisableButton(button: p5.Element, playlistMenu: p5.Element,
                                                    onlinePlaylist: OnlinePlaylist, onSongLoaded: () => void) {
        this.onSongLoaded = onSongLoaded;
        let value: string | number = playlistMenu.value();
        if (typeof value === "string") {
            value = parseInt(value);
        }
        if (Number.isInteger(value)) {
            button.attribute('disabled', '');
            onlinePlaylist.kickOffLoadSong(value, playFromOnlineStepfile, playFromOnlineAudioFile);
            isSwfLoadStarted = true;
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

    if (!pageNumberText.alreadyExists) {
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
