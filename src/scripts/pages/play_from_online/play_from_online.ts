import {global} from "../../index";
import * as p5 from "p5";
import {createLabeledInput, drawHeading, setElementCenterPositionRelative} from "../../ui_util";
import {DOMWrapper} from "../../dom_wrapper";
import {PageManager, Pages} from "../../page_manager";
import {OnlinePlaylist, OnlinePlaylistState} from "./online_playlist";
import {initPlayingDisplay, initSyncGameDisplay, isFilesReady} from "../../util";
import {Stepfile} from "../../stepfile";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";
import {RadioTable} from "../../radio_table";
import {PageControls} from "../../page_controls";

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
            let pageControls = PageControls.create(playlistMenuId, onlinePlaylist).element;
            setElementCenterPositionRelative(pageControls, 0.5, 0.31, 140, 30);

            let playlistMenu = RadioTable.create(playlistMenuId, 630, 250, [15, 85],
                ["Difficulty", "Song Title"], onlinePlaylist.currentContents).element;
            setElementCenterPositionRelative(playlistMenu, 0.5, 0.60, 630, 250);

            let loadAndPlayButtonId = "loadAndPlayButton";
            let loadAndSyncButtonId = "loadAndSyncButton";
            if (playlistMenu.value() !== "") {
                let loadAndPlayButton = DOMWrapper.create(() => {
                    return p.createButton("Load And Play");
                }, loadAndPlayButtonId);
                setElementCenterPositionRelative(loadAndPlayButton.element, 0.5, 0.90, 118, 34);

                if (!loadAndPlayButton.alreadyExists) {
                    loadAndPlayButton.element.addClass(global.globalClass);
                    this.setLoadAndPlayButtonBehavior(loadAndPlayButton.element, playlistMenu, onlinePlaylist);
                }

                let loadAndSyncButton = DOMWrapper.create(() => {
                    return p.createButton("Load Audio Sync Wizard");
                }, loadAndSyncButtonId);
                setElementCenterPositionRelative(loadAndSyncButton.element, 0.8, 0.90, 177, 34);
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