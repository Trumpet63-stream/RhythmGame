import {P5Scene} from "./p5_scene";
import {DisplayConfig, DisplayManager} from "./display_manager";
import {NoteManager} from "./note_manager";
import {TimeManager} from "./time_manager";
import {MissManager} from "./miss_manager";
import {AccuracyManager} from "./accuracy_manager";
import {ScrollManager} from "./scroll_manager";
import {ResultsDisplay} from "./results_display";
import {Note} from "./parsing/parse_sm";
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
import {ReceptorShrinkReaction} from "./receptor_shrink_reaction";
import {AccuracyFeedbackFlash} from "./accuracy_feedback_flash";
import {AccuracyFeedbackParticles} from "./accuracy_feedback_particles";
import {HoldParticles} from "./hold_particles";
import {HoldGlow} from "./hold_glow";
import {ScrollDirection} from "./scroll_direction";

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
    private accuracyFeedbackText: AccuracyFeedbackText;
    private holdManager: HoldManager;
    private displayConfig: DisplayConfig;
    private receptorShrinkReaction: ReceptorShrinkReaction;
    private accuracyFeedbackFlash: AccuracyFeedbackFlash;
    private accuracyFeedbackParticles: AccuracyFeedbackParticles;
    private holdParticles: HoldParticles;
    private holdGlow: HoldGlow;

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

        let width = 240;
        let height = 480;
        let topLeftX = (this.scene.sketchInstance.width - width) / 2;
        let topLeftY = (this.scene.sketchInstance.height - height) / 2;
        this.displayConfig = new PlayingConfig(this.config, numTracks);
        this.displayManager = new DisplayManager(this.noteManager, this.displayConfig, this.scene.sketchInstance,
            topLeftX, topLeftY, width, height);

        this.holdParticles = new HoldParticles(this.config, numTracks, this.displayManager);
        this.holdGlow = new HoldGlow(this.config, numTracks, this.displayManager);
        this.holdManager = new HoldManager(numTracks, this.onTrackHold.bind(this), this.onTrackUnhold.bind(this));

        if (this.isDebugMode) {
            this.timeManager = new ScrollManager(this.config, this.scene.sketchInstance);
        }

        this.gameEndTime = this.calculateGameEnd(global.audioFile.getDuration(), this.getNotesEndTime());
        this.accuracyManager = new AccuracyManager(this.noteManager, this.config, this.holdManager,
            this.handleAccuracyEvent.bind(this));
        this.missManager = new MissManager(this.config, this.noteManager, this.accuracyRecording, this.holdManager,
            this.handleAccuracyEvent.bind(this));

        this.accuracyFeedbackText = new AccuracyFeedbackText(this.accuracyRecording, topLeftX + width / 2,
            topLeftY + height / 2, this.config);
        this.accuracyFeedbackFlash = new AccuracyFeedbackFlash(this.accuracyRecording, this.config, this.displayManager,
            numTracks);
        this.receptorShrinkReaction = new ReceptorShrinkReaction(this.config, this.displayConfig, numTracks);
        this.accuracyFeedbackParticles = new AccuracyFeedbackParticles(this.config, this.displayManager, numTracks);

        if (!isKeyBindingsDefined(numTracks)) {
            initializeKeyBindings(numTracks);
        }
        this.bindKeyBindingsToActions();
        setAllNotesToDefaultState(this.noteManager.tracks);
        replaceNotYetImplementedNoteTypes(this.noteManager.tracks);
    }

    private handleAccuracyEvent(accuracyEvent: AccuracyEvent) {
        // console.log("Track #" + (accuracyEvent.trackNumber + 1) + " " + accuracyEvent.accuracyName +
        //     (Math.abs(accuracyEvent.accuracyMillis) == Infinity ?
        //         "" :
        //         " (" + Math.round(accuracyEvent.accuracyMillis) + " ms)"));
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
        this.receptorShrinkReaction.draw();
        if (this.config.isAccuracyTextEnabled) {
            this.accuracyFeedbackText.draw(currentTimeInSeconds);
        }
        if (this.config.isHoldGlowEnabled) {
            this.holdGlow.draw(currentTimeInSeconds);
        }
        if (this.config.isAccuracyFlashEnabled) {
            this.accuracyFeedbackFlash.draw(currentTimeInSeconds);
        }
        if (this.config.isAccuracyParticlesEnabled) {
            this.accuracyFeedbackParticles.draw(currentTimeInSeconds);
        }
        if (this.config.isHoldParticlesEnabled) {
            this.holdParticles.draw(currentTimeInSeconds);
        }
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
        this.unbindKeys();
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
        this.receptorShrinkReaction.holdTrack(trackNumber);
        let playerKeyAction: PlayerKeyAction =
            new PlayerKeyAction(this.timeManager.getGameTime(performance.now()), trackNumber, KeyState.DOWN);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
    }

    private keyUpActionForTrack(trackNumber: number) {
        this.receptorShrinkReaction.releaseTrack(trackNumber);
        let playerKeyAction: PlayerKeyAction =
            new PlayerKeyAction(this.timeManager.getGameTime(performance.now()), trackNumber, KeyState.UP);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
    }

    private onTrackHold(trackNumber: number, currentTimeInSeconds: number) {
        if (this.config.isHoldGlowEnabled) {
            this.holdGlow.holdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
        }
        if (this.config.isHoldParticlesEnabled) {
            this.holdParticles.holdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
        }
    }

    private onTrackUnhold(trackNumber: number, currentTimeInSeconds: number) {
        if (this.config.isHoldGlowEnabled) {
            this.holdGlow.unholdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
        }
        if (this.config.isHoldParticlesEnabled) {
            this.holdParticles.unholdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
        }
    }

    private unbindKeys() {
        let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding: KeyBinding = keyBindings[i];
            global.keyboardEventManager.unbindKey(keyBinding.keyCode);
        }
    }
}

class PlayingConfig implements DisplayConfig {
    public noteSize: number;
    public pixelsPerSecond: number;
    public receptorYPercent: number;
    public scrollDirection: ScrollDirection;
    public receptorSizes: number[];

    constructor(config: Config, numTracks: number) {
        this.noteSize = config.noteSize;
        this.pixelsPerSecond = config.pixelsPerSecond;
        this.receptorYPercent = config.receptorYPercent;
        this.scrollDirection = config.scrollDirection;
        this.receptorSizes = [];
        for (let i = 0; i < numTracks; i++) {
            this.receptorSizes.push(config.noteSize);
        }
    }

    getNoteSize(): number {
        return this.noteSize;
    }

    getPixelsPerSecond(): number {
        return this.pixelsPerSecond;
    }

    getReceptorSizes(): number[] {
        return this.receptorSizes;
    }

    getReceptorYPercent(): number {
        return this.receptorYPercent;
    }

    getScrollDirection(): ScrollDirection {
        return this.scrollDirection;
    }

    setReceptorSize(trackNumber: number, receptorSize: number): void {
        this.receptorSizes[trackNumber] = receptorSize;
    }
}