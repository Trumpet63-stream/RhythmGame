import {P5Scene} from "../../p5_scene";
import {DisplayManager} from "../../display_manager";
import {NoteManager} from "../../note_manager";
import {MissManager} from "../../miss_manager";
import {AccuracyManager} from "../../accuracy_manager";
import {ScrollManager} from "../../scroll_manager";
import {ResultsDisplay} from "../play_results/results_display";
import {Note} from "../../parsing/parse_sm";
import {HoldManager} from "../../hold_manager";
import {Config} from "../../config";
import {initializeKeyBindings, isKeyBindingsDefined} from "../../util";
import {global} from "../../index";
import {PageManager, PAGES} from "../../page_manager";
import {AccuracyRecording} from "../../accuracy_recording";
import {AccuracyFeedbackText} from "../../accuracy_feedback_text";
import {ReceptorShrinkReaction} from "../../receptor_shrink_reaction";
import {AccuracyFeedbackFlash} from "../../accuracy_feedback_flash";
import {AccuracyFeedbackParticles} from "../../accuracy_feedback_particles";
import {HoldParticles} from "../../hold_particles";
import {HoldGlow} from "../../hold_glow";
import {PlayingConfig} from "../../playing_config";
import {GameTimeManager} from "../../game_time_manager";
import {CommonPlayingDisplay} from "../../common_playing_display";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";

export class PlayingDisplay extends CommonPlayingDisplay {
    // private scene: P5Scene;
    // private config: Config;
    // private noteManager: NoteManager;
    // private displayManager: DisplayManager;
    // private timeManager: TimeManager;
    // private missManager: MissManager;
    // private accuracyManager: AccuracyManager;
    // private gameEndTime: number;
    // private showResultsScreen: boolean;
    // private accuracyRecording: AccuracyRecording;
    // private isDebugMode: boolean = false;
    // private accuracyFeedbackText: AccuracyFeedbackText;
    // private holdManager: HoldManager;
    // private displayConfig: DisplayConfig;
    // private receptorShrinkReaction: ReceptorShrinkReaction;
    // private accuracyFeedbackFlash: AccuracyFeedbackFlash;
    // private accuracyFeedbackParticles: AccuracyFeedbackParticles;
    // private holdParticles: HoldParticles;
    // private holdGlow: HoldGlow;
    // private audioFile: AudioFile;
    // private timeDiffInterval: number;
    // private bounds: Rectangle = Rectangle.fromTopLeft(
    //     (this.scene.sketchInstance.width - 240) / 2,
    //     (this.scene.sketchInstance.height - 480) / 2,
    //     240,
    //     480
    // );

    // constructor(tracks: Note[][], audioFile: AudioFile, config: Config, scene: P5Scene) {
    //
    // }

    protected initialize(tracks: Note[][], audioFile: HtmlAudioElementHelper, config: Config, scene: P5Scene,
                         returnPage: PAGES) {
        this.showResultsScreen = false;
        this.audioFile = audioFile;
        this.config = config;
        this.scene = scene;
        this.returnPage = returnPage;

        // initialize the time manager and play the audio as close together as possible to synchronize the audio with the game
        if (!this.isDebugMode) {
            this.timeManager = new GameTimeManager(this.config);
            this.audioFile.play(config.pauseAtStartInSeconds);

            // This is just for debugging
            this.timeDiffInterval = setInterval(() => {
                let audioTime = this.audioFile.getCurrentTimeInSeconds();
                console.log("Audio time: " + audioTime);
                let gameTime = this.timeManager.getCurrentTimeInSeconds(performance.now());
                console.log("Game time: " + gameTime);
                let timeDiff = audioTime - gameTime;
                console.log("Time diff: " + timeDiff);
            }, 5000);
        }

        this.noteManager = new NoteManager(tracks);
        let numTracks: number = this.noteManager.tracks.length;
        this.accuracyRecording = new AccuracyRecording(numTracks);

        this.displayConfig = new PlayingConfig(this.config, numTracks);
        this.displayManager = new DisplayManager(this.noteManager, this.displayConfig, this.scene.sketchInstance,
            this.bounds);

        this.holdParticles = new HoldParticles(this.config, numTracks, this.displayManager);
        this.holdGlow = new HoldGlow(this.config, numTracks, this.displayManager);
        this.holdManager = new HoldManager(numTracks, this.onTrackHold.bind(this), this.onTrackUnhold.bind(this));

        if (this.isDebugMode) {
            this.timeManager = new ScrollManager(this.config, this.scene.sketchInstance);
        }

        this.gameEndTime = this.calculateGameEnd();
        this.accuracyManager = new AccuracyManager(this.noteManager, this.config, this.holdManager,
            this.handleAccuracyEvent.bind(this));
        this.missManager = new MissManager(this.config, this.noteManager, this.accuracyRecording, this.holdManager,
            this.handleAccuracyEvent.bind(this));

        this.accuracyFeedbackText = new AccuracyFeedbackText(this.accuracyRecording, this.bounds.centerX,
            this.bounds.centerY, this.config);
        this.accuracyFeedbackFlash = new AccuracyFeedbackFlash(this.accuracyRecording, this.config, this.displayManager,
            numTracks);
        this.receptorShrinkReaction = new ReceptorShrinkReaction(this.config, this.displayConfig, numTracks);
        this.accuracyFeedbackParticles = new AccuracyFeedbackParticles(this.config, this.displayManager, numTracks);

        if (!isKeyBindingsDefined(numTracks)) {
            initializeKeyBindings(numTracks);
        }
        this.bindKeyBindingsToActions();
    }

    // private handleAccuracyEvent(accuracyEvent: AccuracyEvent) {
    //     this.accuracyRecording.recordAccuracyEvent(accuracyEvent);
    //     this.accuracyFeedbackParticles.addParticlesForAccuracyEvent(accuracyEvent);
    // }

    // public draw() {
    //     let currentTimeInSeconds = this.timeManager.getCurrentTimeInSeconds(performance.now());
    //     if (currentTimeInSeconds >= this.gameEndTime && !this.showResultsScreen) {
    //         this.accuracyRecording.state = AccuracyRecordingState.READY;
    //         this.endSong();
    //     }
    //     this.missManager.update(currentTimeInSeconds);
    //     this.displayManager.draw(currentTimeInSeconds);
    //     this.receptorShrinkReaction.draw();
    //     if (this.config.isAccuracyTextEnabled) {
    //         this.accuracyFeedbackText.draw(currentTimeInSeconds);
    //     }
    //     if (this.config.isHoldGlowEnabled) {
    //         this.holdGlow.draw(currentTimeInSeconds);
    //     }
    //     if (this.config.isAccuracyFlashEnabled) {
    //         this.accuracyFeedbackFlash.draw(currentTimeInSeconds);
    //     }
    //     if (this.config.isAccuracyParticlesEnabled) {
    //         this.accuracyFeedbackParticles.draw(currentTimeInSeconds);
    //     }
    //     if (this.config.isHoldParticlesEnabled) {
    //         this.holdParticles.draw(currentTimeInSeconds);
    //     }
    // }

    protected getNotesEndTime() {
        let earliestAccuracy: number;
        if (this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound !== null) {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound;
        } else {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 2].upperBound;
        }
        return this.noteManager.getLatestNote().timeInSeconds + earliestAccuracy / 1000;
    }

    protected calculateGameEnd() {
        let audioDuration = this.audioFile.getDuration();
        let notesEndTime = this.getNotesEndTime();
        if (audioDuration < notesEndTime) {
            return notesEndTime + 1;
        }
        return Math.min(notesEndTime + 5, audioDuration);
    }

    protected endSong() {
        this.audioFile.stop();
        global.resultsDisplay = new ResultsDisplay(this.config, this.noteManager, this.accuracyManager,
            this.scene.sketchInstance, this.accuracyRecording);
        PageManager.setCurrentPage(PAGES.PLAY_RESULTS);
        this.unbindKeys();
        clearInterval(this.timeDiffInterval);
    }

    // private bindKeyBindingsToActions() {
    //     let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
    //     let isSpacebarBound: boolean = false;
    //     let spacebarKeyCode: number = 32;
    //     for (let i = 0; i < keyBindings.length; i++) {
    //         let keyBinding: KeyBinding = keyBindings[i];
    //         if (keyBinding.keyCode === spacebarKeyCode) {
    //             isSpacebarBound = true;
    //         }
    //         global.keyboardEventManager.bindKeyToAction(keyBinding.keyCode,
    //             () => {
    //                 this.keyDownActionForTrack(keyBinding.trackNumber)
    //             },
    //             () => {
    //                 this.keyUpActionForTrack(keyBinding.trackNumber)
    //             })
    //     }
    //
    //     global.keyboardEventManager.bindKeyToAction(global.config.quitKey, () => {
    //         this.endSong();
    //     });
    //
    //     if (!isSpacebarBound) {
    //         // bind key to nothing to make sure the default behavior is prevented
    //         global.keyboardEventManager.bindKeyToAction(spacebarKeyCode, () => {
    //         });
    //     }
    // }
    //
    // private keyDownActionForTrack(trackNumber: number) {
    //     this.receptorShrinkReaction.holdTrack(trackNumber);
    //     let playerKeyAction: PlayerKeyAction =
    //         new PlayerKeyAction(this.timeManager.getCurrentTimeInSeconds(performance.now()), trackNumber, KeyState.DOWN);
    //     this.accuracyManager.handlePlayerAction(playerKeyAction);
    // }
    //
    // private keyUpActionForTrack(trackNumber: number) {
    //     this.receptorShrinkReaction.releaseTrack(trackNumber);
    //     let playerKeyAction: PlayerKeyAction =
    //         new PlayerKeyAction(this.timeManager.getCurrentTimeInSeconds(performance.now()), trackNumber, KeyState.UP);
    //     this.accuracyManager.handlePlayerAction(playerKeyAction);
    // }
    //
    // private onTrackHold(trackNumber: number, currentTimeInSeconds: number) {
    //     if (this.config.isHoldGlowEnabled) {
    //         this.holdGlow.holdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
    //     }
    //     if (this.config.isHoldParticlesEnabled) {
    //         this.holdParticles.holdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
    //     }
    // }
    //
    // private onTrackUnhold(trackNumber: number, currentTimeInSeconds: number) {
    //     if (this.config.isHoldGlowEnabled) {
    //         this.holdGlow.unholdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
    //     }
    //     if (this.config.isHoldParticlesEnabled) {
    //         this.holdParticles.unholdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
    //     }
    // }
    //
    // private unbindKeys() {
    //     global.keyboardEventManager.unbindKey(global.config.quitKey);
    //     let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
    //     for (let i = 0; i < keyBindings.length; i++) {
    //         let keyBinding: KeyBinding = keyBindings[i];
    //         global.keyboardEventManager.unbindKey(keyBinding.keyCode);
    //     }
    // }
}
