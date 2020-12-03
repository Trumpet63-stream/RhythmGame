import {global} from "../../index";
import * as p5 from "p5";
import {
    createLabeledInput,
    drawHeading,
    setElementCenterPositionRelative,
    spaceElementsHorizontally
} from "../../ui_util";
import {DOMWrapper} from "../../dom_wrapper";
import {PageManager, Pages} from "../page_manager";
import {OnlinePlaylist, OnlinePlaylistState} from "./online_playlist";
import {disableButton, enableButton, initPlayingDisplay, initSyncGameDisplay, isFilesReady} from "../../util";
import {Stepfile} from "../../stepfile";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";
import {RadioTable} from "../../radio_table";
import {PageControls} from "../../page_controls";
import {StorageUtil} from "../../storage_util";
import {Leaderboard} from "../leaderboard/leaderboard";
import {Replays} from "../storage/replays";

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
                    disableButton(loadPlaylistButton.element);
                    onlinePlaylist.kickOffLoadPlaylist(value);
                }
            });
        }
        if (onlinePlaylist.state !== OnlinePlaylistState.LOADING_PLAYLIST) {
            enableButton(loadPlaylistButton.element);
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
            let leaderboardButtonId = "leaderboardButton";
            let replaysButtonId = "replaysButton";
            if (playlistMenu.value() !== "") {
                let leaderboardButton = DOMWrapper.create(() => {
                    return p.createButton("Leaderboard");
                }, leaderboardButtonId);
                if (!leaderboardButton.alreadyExists) {
                    leaderboardButton.element.addClass(global.globalClass);
                    this.setLeaderboardButtonBehavior(leaderboardButton.element, playlistMenu, onlinePlaylist);
                }

                let replaysButton = DOMWrapper.create(() => {
                    return p.createButton("Replays");
                }, replaysButtonId);
                if (!replaysButton.alreadyExists) {
                    replaysButton.element.addClass(global.globalClass);
                    this.setReplaysButtonBehavior(replaysButton.element, playlistMenu, onlinePlaylist);
                }

                let loadAndPlayButton = DOMWrapper.create(() => {
                    return p.createButton("Load And Play");
                }, loadAndPlayButtonId);
                if (!loadAndPlayButton.alreadyExists) {
                    loadAndPlayButton.element.addClass(global.globalClass);
                    this.setLoadAndPlayButtonBehavior(loadAndPlayButton.element, playlistMenu, onlinePlaylist);
                }

                let loadAndSyncButton = DOMWrapper.create(() => {
                    return p.createButton("Load Audio Sync Wizard");
                }, loadAndSyncButtonId);
                if (!loadAndSyncButton.alreadyExists) {
                    loadAndSyncButton.element.addClass(global.globalClass);
                    this.setSyncButtonBehavior(loadAndSyncButton.element, playlistMenu, onlinePlaylist);
                }

                spaceElementsHorizontally(
                    [leaderboardButton.element, replaysButton.element, loadAndPlayButton.element, loadAndSyncButton.element],
                    [109, 79, 118, 176], 46, 420, 50);

                if (onlinePlaylist.state !== OnlinePlaylistState.LOADING_SONG) {
                    enableButton(loadAndPlayButton.element);
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

    private static setLeaderboardButtonBehavior(leaderboardButton: p5.Element, playlistMenu: p5.Element,
                                                onlinePlaylist: OnlinePlaylist) {
        leaderboardButton.mouseClicked(
            PlayFromOnline.loadSelectedSongAndDisableButton.bind(this, leaderboardButton, playlistMenu, onlinePlaylist,
                () => {
                    let songhash: string = StorageUtil.getKeyFromTracks(playFromOnlineStepfile.tracks);
                    Leaderboard.initialize(songhash);
                    PageManager.setCurrentPage(Pages.LEADERBOARD);
                }));
    }

    private static setReplaysButtonBehavior(replayButton: p5.Element, playlistMenu: p5.Element,
                                            onlinePlaylist: OnlinePlaylist) {
        replayButton.mouseClicked(
            PlayFromOnline.loadSelectedSongAndDisableButton.bind(this, replayButton, playlistMenu, onlinePlaylist,
                () => {
                    Replays.initialize(playFromOnlineStepfile, <HtmlAudioElementHelper>playFromOnlineAudioFile, Pages.PLAY_FROM_ONLINE);
                    PageManager.setCurrentPage(Pages.REPLAYS);
                }));
    }

    private static setLoadAndPlayButtonBehavior(loadAndPlayButton: p5.Element, playlistMenu: p5.Element,
                                                onlinePlaylist: OnlinePlaylist) {
        loadAndPlayButton.mouseClicked(
            PlayFromOnline.loadSelectedSongAndDisableButton.bind(this, loadAndPlayButton, playlistMenu, onlinePlaylist,
                () =>
                    initPlayingDisplay(playFromOnlineStepfile.tracks, playFromOnlineAudioFile,
                        Pages.PLAY_FROM_ONLINE, playFromOnlineStepfile.songTitle)
                        .then(() => PageManager.setCurrentPage(Pages.PLAY))));
    }

    private static setSyncButtonBehavior(loadAndSyncButton: p5.Element, playlistMenu: p5.Element,
                                         onlinePlaylist: OnlinePlaylist) {
        loadAndSyncButton.mouseClicked(
            PlayFromOnline.loadSelectedSongAndDisableButton.bind(this, loadAndSyncButton, playlistMenu, onlinePlaylist,
                () => {
                    initSyncGameDisplay(playFromOnlineStepfile.tracks, playFromOnlineAudioFile,
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
            disableButton(button);
            onlinePlaylist.kickOffLoadSong(value, playFromOnlineStepfile, playFromOnlineAudioFile);
            isSwfLoadStarted = true;
        }
    }
}