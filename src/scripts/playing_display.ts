import {P5Scene} from "./p5_scene";
import {DisplayConfig, DisplayManager} from "./display_manager";
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
import {AccuracyEvent, AccuracyRecording, AccuracyRecordingState} from "./accuracy_recording";
import {AccuracyFeedbackText} from "./accuracy_feedback_text";
import {ReceptorVisualFeedback} from "./receptor_visual_feedback";
import {AccuracyFeedbackFlash} from "./accuracy_feedback_flash";
import {AccuracyFeedbackParticles} from "./accuracy_feedback_particles";

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
    private accuracyFeedbackDisplay: AccuracyFeedbackText;
    private displayConfig: DisplayConfig;
    private receptorVisualFeedback: ReceptorVisualFeedback;
    private accuracyFeedbackFlash: AccuracyFeedbackFlash;
    private accuracyFeedbackParticles: AccuracyFeedbackParticles;

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
        let numTracks: number = this.noteManager.tracks.length;
        this.accuracyRecording = new AccuracyRecording(numTracks);
        let holdManager = new HoldManager(numTracks);

        if (this.isDebugMode) {
            this.timeManager = new ScrollManager(this.config, this.scene.sketchInstance);
        }

        this.gameEndTime = this.calculateGameEnd(global.audioFile.getDuration(), this.getNotesEndTime());
        this.accuracyManager = new AccuracyManager(this.noteManager, this.config, holdManager,
            this.handleAccuracyEvent.bind(this));
        this.missManager = new MissManager(this.config, this.noteManager, this.accuracyRecording, holdManager,
            this.handleAccuracyEvent.bind(this));

        let width = 240;
        let height = 480;
        let topLeftX = (this.scene.sketchInstance.width - width) / 2;
        let topLeftY = (this.scene.sketchInstance.height - height) / 2;
        this.accuracyFeedbackDisplay = new AccuracyFeedbackText(this.accuracyRecording, topLeftX + width / 2,
            topLeftY + height / 2, this.config);
        this.displayConfig = new DisplayConfig(this.config, numTracks);
        this.displayManager = new DisplayManager(this.noteManager, this.displayConfig, this.scene.sketchInstance,
            topLeftX, topLeftY, width, height);
        this.accuracyFeedbackFlash = new AccuracyFeedbackFlash(this.accuracyRecording, this.config, this.displayManager,
            numTracks);
        this.receptorVisualFeedback = new ReceptorVisualFeedback(this.config, this.displayConfig, numTracks);
        this.accuracyFeedbackParticles = new AccuracyFeedbackParticles(this.config, this.displayManager, numTracks);

        if (!isKeyBindingsDefined(numTracks)) {
            initializeKeyBindings(numTracks);
        }
        this.bindKeyBindingsToActions();
        setAllNotesToDefaultState(this.noteManager.tracks);
        replaceNotYetImplementedNoteTypes(this.noteManager.tracks);
    }

    private handleAccuracyEvent(accuracyEvent: AccuracyEvent) {
        console.log("Track #" + (accuracyEvent.trackNumber + 1) + " " + accuracyEvent.accuracyName +
            (Math.abs(accuracyEvent.accuracyMillis) == Infinity ?
                "" :
                " (" + Math.round(accuracyEvent.accuracyMillis) + " ms)"));
        this.accuracyRecording.recordAccuracyEvent(accuracyEvent);
        this.accuracyFeedbackParticles.addParticlesForAccuracyEvent(accuracyEvent);
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
        this.receptorVisualFeedback.draw();
        this.accuracyFeedbackFlash.draw(currentTimeInSeconds);
        this.accuracyFeedbackParticles.draw(currentTimeInSeconds);
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
                    this.receptorVisualFeedback.holdTrack(keyBinding.trackNumber);
                },
                () => {
                    this.keyUpActionForTrack(keyBinding.trackNumber)
                    this.receptorVisualFeedback.releaseTrack(keyBinding.trackNumber);
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