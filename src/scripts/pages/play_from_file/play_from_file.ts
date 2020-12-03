import * as p5 from "p5";
import {createFileInput, drawHeading, setElementCenterPositionRelative, spaceElementsHorizontally} from "../../ui_util";
import {global} from "../../index";
import {Mode, Stepfile, StepfileState} from "../../stepfile";
import {AudioFile, AudioFileState} from "../../audio/audio_file";
import {initPlayingDisplay, initSyncGameDisplay, isFilesReady} from "../../util";
import {PageManager, Pages} from "../page_manager";
import {DOMWrapper} from "../../dom_wrapper";
import {FileDropZone} from "./file_drop_zone";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";
import {RadioTable} from "../../radio_table";
import {StorageUtil} from "../../storage_util";
import {Leaderboard} from "../leaderboard/leaderboard";
import {Replays} from "../storage/replays";

export abstract class PlayFromFile {
    private static stepfile: Stepfile = new Stepfile();
    private static audioFile: AudioFile = new HtmlAudioElementHelper();
    private static modesAsStrings: string[][];
    public static PLAY_FROM_FILE_CLASS: string = "play-from-file";
    public static MODE_RADIO_ID: string = "modeRadio";

    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        FileDropZone.create(PlayFromFile.stepfile, PlayFromFile.audioFile);

        let stepfileInput = createFileInput(PlayFromFile.getStepfileInputLabel(), "Choose Stepfile (.sm)", "stepfileInput",
            PlayFromFile.loadStepfileAndUpdateModeOptions, PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(stepfileInput, 0.43, 0.35, 268, 34);

        let audioFileInput = createFileInput(PlayFromFile.getAudioFileInputLabel(), "Choose Audio File (.mp3, .ogg)", "audioFileInput",
            PlayFromFile.loadAudioFile, PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(audioFileInput, 0.43, 0.5, 325, 34);

        let playButtonId = "playButton";
        let syncButtonId = "syncButton";
        let leaderboardButtonId = "leaderboardButton";
        let replaysButtonId = "replaysButton";
        if (isFilesReady(PlayFromFile.stepfile, PlayFromFile.audioFile)) {
            if (PlayFromFile.modesAsStrings === undefined) {
                PlayFromFile.modesAsStrings = PlayFromFile.getModesAsStrings(PlayFromFile.stepfile.modes);
            }
            let modeRadio = RadioTable.create(PlayFromFile.MODE_RADIO_ID, 500, 120, [54, 30, 16],
                ["Type", "Difficulty", "Meter"], PlayFromFile.modesAsStrings).element;
            setElementCenterPositionRelative(modeRadio, 0.5, 0.7, 500, 120);

            if (this.modeIsSelected(modeRadio)) {
                let leaderboardButton = DOMWrapper.create(() => {
                    return p.createButton("Leaderboard");
                }, leaderboardButtonId);
                if (!leaderboardButton.alreadyExists) {
                    leaderboardButton.element.addClass(global.globalClass);
                    this.setLeaderboardButtonBehavior(leaderboardButton.element, modeRadio);
                }

                let replaysButton = DOMWrapper.create(() => {
                    return p.createButton("Replays");
                }, replaysButtonId);
                if (!replaysButton.alreadyExists) {
                    replaysButton.element.addClass(global.globalClass);
                    this.setReplaysButtonBehavior(replaysButton.element, modeRadio);
                }

                let playButton = DOMWrapper.create(() => {
                    return p.createButton("Play");
                }, playButtonId);
                if (!playButton.alreadyExists) {
                    playButton.element.addClass(global.globalClass);
                    this.setPlayButtonBehavior(playButton.element, modeRadio);
                }

                let syncButton = DOMWrapper.create(() => {
                    return p.createButton("Start Audio Sync Wizard");
                }, syncButtonId);
                if (!syncButton.alreadyExists) {
                    syncButton.element.addClass(global.globalClass);
                    this.setSyncButtonBehavior(syncButton.element, modeRadio);
                }

                spaceElementsHorizontally(
                    [leaderboardButton.element, replaysButton.element, playButton.element, syncButton.element],
                    [109, 79, 59, 176], 70, 410, 50);
            } else {
                DOMWrapper.removeElementById(playButtonId);
                DOMWrapper.removeElementById(syncButtonId);
            }
        } else {
            DOMWrapper.removeElementById(PlayFromFile.MODE_RADIO_ID);
            DOMWrapper.removeElementById(playButtonId);
            DOMWrapper.removeElementById(syncButtonId);
        }
    }

    private static setLeaderboardButtonBehavior(leaderboardButton: p5.Element, modeRadio: p5.Element) {
        leaderboardButton.mouseClicked(() => {
            let selectedMode: Mode = PlayFromFile.getSelectedMode(modeRadio);
            PlayFromFile.stepfile.finishParsing(selectedMode.id);
            let songhash: string = StorageUtil.getKeyFromTracks(PlayFromFile.stepfile.tracks);
            Leaderboard.initialize(songhash);
            PageManager.setCurrentPage(Pages.LEADERBOARD);
        });
    }

    private static setReplaysButtonBehavior(replayButton: p5.Element, modeRadio: p5.Element) {
        replayButton.mouseClicked(() => {
            let selectedMode: Mode = PlayFromFile.getSelectedMode(modeRadio);
            PlayFromFile.stepfile.finishParsing(selectedMode.id);
            Replays.initialize(PlayFromFile.stepfile, <HtmlAudioElementHelper>PlayFromFile.audioFile, Pages.PLAY_FROM_FILE);
            PageManager.setCurrentPage(Pages.REPLAYS);
        });
    }

    private static modeIsSelected(modeRadio: p5.Element) {
        return modeRadio.value() !== "";
    }

    private static setSyncButtonBehavior(syncButton: p5.Element, modeRadio: p5.Element) {
        syncButton.mouseClicked(() => {
            let selectedMode: Mode = PlayFromFile.getSelectedMode(modeRadio);
            PlayFromFile.stepfile.finishParsing(selectedMode.id);
            initSyncGameDisplay(PlayFromFile.stepfile.tracks, PlayFromFile.audioFile, Pages.PLAY_FROM_FILE,
                PlayFromFile.stepfile.songTitle);
            PageManager.setCurrentPage(Pages.SYNC);
        });
    }

    private static setPlayButtonBehavior(playButton: p5.Element, modeRadio: p5.Element) {
        playButton.mouseClicked(() => {
            let selectedMode: Mode = PlayFromFile.getSelectedMode(modeRadio);
            PlayFromFile.stepfile.finishParsing(selectedMode.id);
            initPlayingDisplay(PlayFromFile.stepfile.tracks, PlayFromFile.audioFile, Pages.PLAY_FROM_FILE,
                PlayFromFile.stepfile.songTitle)
                .then(() => PageManager.setCurrentPage(Pages.PLAY));
        });
    }

    public static resetModeOptions() {
        PlayFromFile.modesAsStrings = undefined;
        DOMWrapper.removeElementById(PlayFromFile.MODE_RADIO_ID);
    }

    private static getModesAsStrings(modes: Mode[]): string[][] {
        let modeStrings: string[][] = [];
        for (let i = 0; i < modes.length; i++) {
            let mode: Mode = modes[i];
            modeStrings.push([mode.type, mode.difficulty, mode.meter]);
        }
        return modeStrings;
    }

    private static loadStepfileAndUpdateModeOptions(file: p5.File) {
        PlayFromFile.stepfile.loadFile.call(PlayFromFile.stepfile, file.file);
        PlayFromFile.resetModeOptions();
    }

    private static loadAudioFile(file: p5.File) {
        PlayFromFile.audioFile.loadFile.call(PlayFromFile.audioFile, file.file);
    }

    private static getSelectedMode(modeRadio: p5.Element) {
        return PlayFromFile.stepfile.modes[Number(modeRadio.value())];
    }

    private static getStepfileInputLabel() {
        switch (PlayFromFile.stepfile.state) {
            case StepfileState.NO_STEPFILE:
                return "No file chosen";
            case StepfileState.DONE_READING:
            case StepfileState.PARTIALLY_PARSED:
            case StepfileState.FULLY_PARSED:
                return PlayFromFile.truncateFileNameIfTooLong(PlayFromFile.stepfile.file.name, 30);
            default:
                return "Error";
        }
    }

    private static getAudioFileInputLabel() {
        switch (PlayFromFile.audioFile.getState()) {
            case AudioFileState.NO_AUDIO_FILE:
                return "No file chosen";
            case AudioFileState.DONE_READING:
            case AudioFileState.BUFFERED:
                return PlayFromFile.truncateFileNameIfTooLong(PlayFromFile.audioFile.getName(), 30);
            default:
                return "Error";
        }
    }

    private static truncateFileNameIfTooLong(fullFileName: string, maxLength: number) {
        if (fullFileName.length <= maxLength) {
            return fullFileName;
        }
        return fullFileName.substr(0, maxLength - 11) +
            "..." +
            fullFileName.substr(fullFileName.length - 10);
    }
}

