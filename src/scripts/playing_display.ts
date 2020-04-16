import {P5Scene} from "./p5_scene";
import {DisplayManager} from "./display_manager";
import {NoteManager} from "./note_manager";
import {TimeManager} from "./time_manager";
import {MissManager} from "./miss_manager";
import {AccuracyManager} from "./accuracy_manager";
import {ScrollManager} from "./scroll_manager";
import {ResultsDisplay} from "./results_display";
import {Note} from "./parsing";
import {HoldManager} from "./hold_manager";
import {GameTimeSupplier} from "../scripts2/game_time_provider";
import {Config} from "../scripts2/config";
import {
    initializeKeyBindings,
    isKeyBindingsDefined,
    replaceNotYetImplementedNoteTypes,
    setAllNotesToDefaultState
} from "./util";
import {global} from "../scripts2/index";
import {KeyState, PlayerKeyAction} from "./player_key_action";
import {KeyBinding} from "../scripts2/key_binding_helper";
import {PageManager, PAGES} from "../scripts2/page_manager";
import {AccuracyRecording} from "../scripts2/accuracy_recording";

export class PlayingDisplay {
    private scene: P5Scene;
    private config: Config;
    private noteManager: NoteManager;
    private displayManager: DisplayManager;
    private timeManager: GameTimeSupplier;
    private missManager: MissManager;
    private accuracyManager: AccuracyManager;
    private gameEndTime: number;
    private showResultsScreen: boolean;
    private accuracyRecording: AccuracyRecording;
    private isDebugMode: boolean = false;

    constructor(tracks: Note[][], config: Config, scene: P5Scene) {
        this.showResultsScreen = false;
        this.config = config;
        this.scene = scene;

        // initialize the time manager and play the audio as close together as possible to synchronize the audio with the game
        if (!this.isDebugMode) {
            this.timeManager = new TimeManager(performance.now(), this.config);
            // window.setTimeout(playAudio, config.pauseAtStartInSeconds * 1000);
        }

        this.noteManager = new NoteManager(tracks);
        this.accuracyRecording = new AccuracyRecording(this.noteManager.tracks.length);
        let holdManager = new HoldManager(this.noteManager.tracks.length);

        if (this.isDebugMode) {
            this.timeManager = new ScrollManager(this.config, this.scene.sketchInstance);
        }

        // this.gameEndTime = this.calculateGameEnd(audioSource.buffer.duration,
        //     this.noteManager.getLatestNote().timeInSeconds + this.getEarliestAccuracy(this.config) / 1000);
        this.accuracyManager = new AccuracyManager(this.noteManager, this.config, this.accuracyRecording, holdManager);
        this.missManager = new MissManager(this.config, this.noteManager, this.accuracyRecording, holdManager);
        this.displayManager = new DisplayManager(this.noteManager, this.config, this.scene.sketchInstance);
        if (!isKeyBindingsDefined(this.noteManager.tracks.length)) {
            initializeKeyBindings(this.noteManager.tracks.length);
        }
        this.bindKeyBindingsToActions();
        setAllNotesToDefaultState(this.noteManager.tracks);
        replaceNotYetImplementedNoteTypes(this.noteManager.tracks);
    }

    public draw() {
        let currentTimeInSeconds = this.timeManager.getGameTime(performance.now());
        if (currentTimeInSeconds >= this.gameEndTime && !this.showResultsScreen) {
            this.endSong();
        }
        this.missManager.update(currentTimeInSeconds);
        this.displayManager.draw(currentTimeInSeconds);
    }

    private getEarliestAccuracy(config: Config) {
        if (config.accuracySettings[config.accuracySettings.length - 1].upperBound != null) {
            return config.accuracySettings[config.accuracySettings.length - 1].upperBound;
        } else {
            return config.accuracySettings[config.accuracySettings.length - 2].upperBound;
        }
    }

    private calculateGameEnd(audioDuration: number, notesEndTime: number) {
        return Math.max(Math.min(notesEndTime + 5, audioDuration), notesEndTime);
    }

    private endSong() {
        // stopAudio();
        global.resultsDisplay = new ResultsDisplay(this.config, this.noteManager, this.accuracyManager,
            this.scene.sketchInstance, this.accuracyRecording);
        PageManager.setCurrentScene(PAGES.PAGE_4);
    }

    private bindKeyBindingsToActions() {
        let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding: KeyBinding = keyBindings[i];
            global.keyboardEventManager.bindKeyToAction(keyBinding.keyCode,
                () => {this.keyDownActionForTrack(keyBinding.trackNumber)},
                () => {this.keyUpActionForTrack(keyBinding.trackNumber)})
        }

        global.keyboardEventManager.bindKeyToAction(global.config.quitKey, () => {
            this.endSong();
        });
    }

    private keyDownActionForTrack(trackNumber: number) {
        let playerKeyAction: PlayerKeyAction =
            new PlayerKeyAction(this.timeManager.getGameTime(performance.now()), trackNumber, KeyState.DOWN);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
    }

    private keyUpActionForTrack(trackNumber: number) {
        let playerKeyAction: PlayerKeyAction =
            new PlayerKeyAction(this.timeManager.getGameTime(performance.now()), trackNumber, KeyState.UP);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
    }
}