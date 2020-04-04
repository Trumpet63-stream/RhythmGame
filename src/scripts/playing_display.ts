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
import {initializeKeyBindings} from "./util";
import {global} from "../scripts2/index";
import {KeyState, PlayerKeyAction} from "./player_key_action";
import {KeyBinding} from "../scripts2/keybind_utility";
import {AccuracyEvent} from "./handle_accuracy_event";

export class PlayingDisplay {
    private scene: P5Scene;
    config: Config;
    noteManager: NoteManager;
    resultsDisplay: ResultsDisplay;
    private displayManager: DisplayManager;
    private timeManager: GameTimeSupplier;
    private missManager: MissManager;
    private accuracyManager: AccuracyManager;
    // private holdManager: HoldManager;
    private gameEndTime: number;
    private showResultsScreen: boolean;
    private accuracyRecording: AccuracyEvent[][];
    private isDebugMode: boolean = false;

    constructor(tracks: Note[][], config: Config, scene: P5Scene) {
        this.showResultsScreen = false;
        this.config = config;
        this.scene = scene;

        // initialize the time manager and play the audio as close together as possible to synchronize the audio with the game
        this.timeManager = new TimeManager(performance.now(), this.config); //TODO: mess with this to make debug mode work again
        if (!this.isDebugMode) {
            // window.setTimeout(playAudio, config.pauseAtStartInSeconds * 1000);
        }

        this.noteManager = new NoteManager(tracks);
        this.accuracyRecording = this.getInitialAccuracyRecording(this.noteManager.tracks.length);
        let holdManager = new HoldManager(this.noteManager.tracks.length);

        if (this.isDebugMode) {
            this.timeManager = new ScrollManager(this.config); // this way the KeyHandler gets the right time in debug mode
        }

        // this.gameEndTime = this.calculateGameEnd(audioSource.buffer.duration,
        //     this.noteManager.getLatestNote().timeInSeconds + this.getEarliestAccuracy(this.config) / 1000);
        this.accuracyManager = new AccuracyManager(this.noteManager, this.config, this.accuracyRecording, holdManager);
        this.missManager = new MissManager(this.config, this.noteManager, this.accuracyRecording, holdManager);
        this.displayManager = new DisplayManager(this.noteManager, this.config, this.scene.sketchInstance);
    }

    public draw() {
        let currentTimeInSeconds = this.timeManager.getGameTime(performance.now());
        if (currentTimeInSeconds >= this.gameEndTime && !this.showResultsScreen) {
            this.resultsDisplay = new ResultsDisplay(this.config, this.noteManager, this.accuracyManager,
                this.scene.sketchInstance, this.accuracyRecording);
            this.endSong();
            this.showResultsScreen = true;
        }
        if (this.showResultsScreen) {
            this.resultsDisplay.draw();
        } else {
            this.missManager.update(currentTimeInSeconds);
            this.displayManager.draw(currentTimeInSeconds);
        }
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
        console.log("Song Ended");
    }

    private getInitialAccuracyRecording(numTracks: number): AccuracyEvent[][] {
        let accuracyRecording = [];
        for (let i = 0; i < numTracks; i++) {
            accuracyRecording.push([]);
        }
        return accuracyRecording;
    }

    remove() {
        this.scene.remove();
    }

    public initialize() {
        let numTracks = this.noteManager.tracks.length;
        initializeKeyBindings(numTracks);
        let keyBindings = global.config.keyBindings.get(numTracks);
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding: KeyBinding = keyBindings[i];
            global.keyboardEventManager.bindKeyToAction(keyBinding.keyCode,
                () => {this.keyDownActionForTrack(keyBinding.trackNumber)},
                () => {this.keyUpActionForTrack(keyBinding.trackNumber)})
        }
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