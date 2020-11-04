import * as p5 from "p5";
import {createFileInput, drawHeading, setElementCenterPositionRelative} from "../../ui_util";
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

const playFromFileStepfile: Stepfile = new Stepfile();
const playFromFileAudioFile: AudioFile = new HtmlAudioElementHelper();
let modesAsStrings: string[][];

export abstract class PlayFromFile {
    public static PLAY_FROM_FILE_CLASS: string = "play-from-file";
    public static MODE_RADIO_ID: string = "modeRadio";

    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        FileDropZone.create(playFromFileStepfile, playFromFileAudioFile);

        let stepfileInput = createFileInput(getStepfileInputLabel(), "Choose Stepfile (.sm)", "stepfileInput",
            loadStepfileAndUpdateModeOptions, PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(stepfileInput, 0.43, 0.35, 268, 34);

        let audioFileInput = createFileInput(getAudioFileInputLabel(), "Choose Audio File (.mp3, .ogg)", "audioFileInput",
            loadAudioFile, PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        setElementCenterPositionRelative(audioFileInput, 0.43, 0.5, 325, 34);

        let playButtonId = "playButton";
        let syncButtonId = "syncButton";
        let leaderboardButtonId = "leaderboardButton";
        if (isFilesReady(playFromFileStepfile, playFromFileAudioFile)) {
            if (modesAsStrings === undefined) {
                modesAsStrings = PlayFromFile.getModesAsStrings(playFromFileStepfile.modes);
            }
            let modeRadio = RadioTable.create(PlayFromFile.MODE_RADIO_ID, 500, 120, [54, 30, 16],
                ["Type", "Difficulty", "Meter"], modesAsStrings).element;
            setElementCenterPositionRelative(modeRadio, 0.5, 0.7, 500, 120);

            if (this.modeIsSelected(modeRadio)) {
                let leaderboardButton = DOMWrapper.create(() => {
                    return p.createButton("Leaderboard");
                }, leaderboardButtonId);
                setElementCenterPositionRelative(leaderboardButton.element, 0.2, 0.88, 80, 34);
                if (!leaderboardButton.alreadyExists) {
                    leaderboardButton.element.addClass(global.globalClass);
                    this.setLeaderboardButtonBehavior(leaderboardButton.element, modeRadio);
                }

                let playButton = DOMWrapper.create(() => {
                    return p.createButton("Play");
                }, playButtonId);
                setElementCenterPositionRelative(playButton.element, 0.5, 0.88, 60, 34);
                if (!playButton.alreadyExists) {
                    playButton.element.addClass(global.globalClass);
                    this.setPlayButtonBehavior(playButton.element, modeRadio);
                }

                let syncButton = DOMWrapper.create(() => {
                    return p.createButton("Start Audio Sync Wizard");
                }, syncButtonId);
                setElementCenterPositionRelative(syncButton.element, 0.8, 0.88, 177, 34);
                if (!syncButton.alreadyExists) {
                    syncButton.element.addClass(global.globalClass);
                    this.setSyncButtonBehavior(syncButton.element, modeRadio);
                }
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
            let selectedMode: Mode = getSelectedMode(modeRadio);
            playFromFileStepfile.finishParsing(selectedMode.id);
            let songhash: string = StorageUtil.getKeyFromTracks(playFromFileStepfile.tracks);
            Leaderboard.initialize(songhash);
            PageManager.setCurrentPage(Pages.LEADERBOARD);
        });
    }

    private static modeIsSelected(modeRadio: p5.Element) {
        return modeRadio.value() !== "";
    }

    private static setSyncButtonBehavior(syncButton: p5.Element, modeRadio: p5.Element) {
        syncButton.mouseClicked(() => {
            let selectedMode: Mode = getSelectedMode(modeRadio);
            playFromFileStepfile.finishParsing(selectedMode.id);
            initSyncGameDisplay(playFromFileStepfile.tracks, playFromFileAudioFile, Pages.PLAY_FROM_FILE,
                playFromFileStepfile.songTitle);
            PageManager.setCurrentPage(Pages.SYNC);
        });
    }

    private static setPlayButtonBehavior(playButton: p5.Element, modeRadio: p5.Element) {
        playButton.mouseClicked(() => {
            let selectedMode: Mode = getSelectedMode(modeRadio);
            playFromFileStepfile.finishParsing(selectedMode.id);
            initPlayingDisplay(playFromFileStepfile.tracks, playFromFileAudioFile, Pages.PLAY_FROM_FILE,
                playFromFileStepfile.songTitle);
            PageManager.setCurrentPage(Pages.PLAY);
        });
    }

    public static resetModeOptions() {
        modesAsStrings = undefined;
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
}

function loadStepfileAndUpdateModeOptions(file: p5.File) {
    playFromFileStepfile.loadFile.call(playFromFileStepfile, file.file);
    PlayFromFile.resetModeOptions();
}

function loadAudioFile(file: p5.File) {
    playFromFileAudioFile.loadFile.call(playFromFileAudioFile, file.file);
}

function getSelectedMode(modeRadio: p5.Element) {
    return playFromFileStepfile.modes[Number(modeRadio.value())];
}

function getStepfileInputLabel() {
    switch (playFromFileStepfile.state) {
        case StepfileState.NO_STEPFILE:
            return "No file chosen";
        case StepfileState.DONE_READING:
        case StepfileState.PARTIALLY_PARSED:
        case StepfileState.FULLY_PARSED:
            return truncateFileNameIfTooLong(playFromFileStepfile.file.name, 30);
        default:
            return "Error";
    }
}

function getAudioFileInputLabel() {
    switch (playFromFileAudioFile.getState()) {
        case AudioFileState.NO_AUDIO_FILE:
            return "No file chosen";
        case AudioFileState.DONE_READING:
        case AudioFileState.BUFFERED:
            return truncateFileNameIfTooLong(playFromFileAudioFile.getName(), 30);
        default:
            return "Error";
    }
}

function truncateFileNameIfTooLong(fullFileName: string, maxLength: number) {
    if (fullFileName.length <= maxLength) {
        return fullFileName;
    }
    return fullFileName.substr(0, maxLength - 11) +
        "..." +
        fullFileName.substr(fullFileName.length - 10);
}