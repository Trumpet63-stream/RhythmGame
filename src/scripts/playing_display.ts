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
import {GameTimeProvider} from "./game_time_provider";
import {Config} from "./config";
import {
    initializeKeyBindings,
    isKeyBindingsDefined,
    replaceNotYetImplementedNoteTypes,
    setAllNotesToDefaultState
} from "./util";
import {global} from "./index";
import {KeyState, PlayerKeyAction} from "./player_key_action";
import {KeyBinding} from "./key_binding_helper";
import {PageManager, PAGES} from "./page_manager";
import {AccuracyRecording, AccuracyRecordingState} from "./accuracy_recording";
import {AccuracyFeedbackDisplay} from "./accuracy_feedback_display";

export class PlayingDisplay {
    private scene: P5Scene;
    private config: Config;
    private noteManager: NoteManager;
    private displayManager: DisplayManager;
    private timeManager: GameTimeProvider;
    private missManager: MissManager;
    private accuracyManager: AccuracyManager;
    private gameEndTime: number;
    private showResultsScreen: boolean;
    private accuracyRecording: AccuracyRecording;
    private isDebugMode: boolean = false;
    public accuracyFeedbackDisplay: AccuracyFeedbackDisplay;

    constructor(tracks: Note[][], config: Config, scene: P5Scene) {
        this.showResultsScreen = false;
        this.config = config;
        this.scene = scene;

        // initialize the time manager and play the audio as close together as possible to synchronize the audio with the game
        if (!this.isDebugMode) {
            this.timeManager = new TimeManager(performance.now(), this.config);
            global.audioFile.play(config.pauseAtStartInSeconds);
        }

        this.noteManager = new NoteManager(tracks);
        this.accuracyRecording = new AccuracyRecording(this.noteManager.tracks.length);
        let holdManager = new HoldManager(this.noteManager.tracks.length);

        if (this.isDebugMode) {
            this.timeManager = new ScrollManager(this.config, this.scene.sketchInstance);
        }

        this.gameEndTime = this.calculateGameEnd(global.audioFile.getDuration(), this.getNotesEndTime());
        this.accuracyManager = new AccuracyManager(this.noteManager, this.config, this.accuracyRecording, holdManager);
        this.missManager = new MissManager(this.config, this.noteManager, this.accuracyRecording, holdManager);

        let width = 240;
        let height = 480;
        let topLeftX = (this.scene.sketchInstance.width - width) / 2;
        let topLeftY = (this.scene.sketchInstance.height - height) / 2;
        this.displayManager = new DisplayManager(this.noteManager, this.config, this.scene.sketchInstance,
            topLeftX, topLeftY, width, height);
        this.accuracyFeedbackDisplay = new AccuracyFeedbackDisplay(this.accuracyRecording, topLeftX + width / 2,
            topLeftY + height / 2, this.config);

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
            this.accuracyRecording.state = AccuracyRecordingState.READY;
            this.endSong();
        }
        this.missManager.update(currentTimeInSeconds);
        this.displayManager.draw(currentTimeInSeconds);
        this.accuracyFeedbackDisplay.draw(currentTimeInSeconds);
    }

    private getNotesEndTime() {
        let earliestAccuracy: number;
        if (this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound != null) {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound;
        } else {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 2].upperBound;
        }
        return this.noteManager.getLatestNote().timeInSeconds + earliestAccuracy / 1000;
    }

    private calculateGameEnd(audioDuration: number, notesEndTime: number) {
        if (audioDuration < notesEndTime) {
            return notesEndTime + 1;
        }
        return Math.min(notesEndTime + 5, audioDuration);
    }

    private endSong() {
        global.audioFile.stop();
        global.resultsDisplay = new ResultsDisplay(this.config, this.noteManager, this.accuracyManager,
            this.scene.sketchInstance, this.accuracyRecording);
        PageManager.setCurrentScene(PAGES.RESULTS);
    }

    private bindKeyBindingsToActions() {
        let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding: KeyBinding = keyBindings[i];
            global.keyboardEventManager.bindKeyToAction(keyBinding.keyCode,
                () => {
                    this.keyDownActionForTrack(keyBinding.trackNumber)
                },
                () => {
                    this.keyUpActionForTrack(keyBinding.trackNumber)
                })
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