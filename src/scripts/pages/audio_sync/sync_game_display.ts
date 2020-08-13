import {P5Scene} from "../../p5_scene";
import {DisplayManager} from "../../display_manager";
import {NoteManager} from "../../note_manager";
import {MissManager} from "../../miss_manager";
import {AccuracyManager} from "../../accuracy_manager";
import {ScrollManager, ScrollManagerConfig} from "../../scroll_manager";
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
import {SyncResultsDisplay} from "../sync_results/sync_results_display";
import {GameTimeManager} from "../../game_time_manager";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";
import {CommonPlayingDisplay} from "../../common_playing_display";

export class SyncGameDisplay extends CommonPlayingDisplay {
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
    // private audioFile: HtmlAudioElementHelper;
    // private timeDiffInterval: number;
    // private returnPage: PAGES;
    // private bounds: Rectangle = Rectangle.fromTopLeft(
    //     (this.scene.sketchInstance.width - 240) / 2,
    //     (this.scene.sketchInstance.height - 480) / 2,
    //     240,
    //     480
    // );

    // constructor(tracks: Note[][], audioFile: HtmlAudioElementHelper, config: Config, scene: P5Scene, returnPage: PAGES) {
    //     this.initialize(tracks, audioFile, config, scene, returnPage);
    // }

    protected initialize(tracks: Note[][], audioFile: HtmlAudioElementHelper, config: Config, scene: P5Scene, returnPage: PAGES) {
        this.showResultsScreen = false;
        this.audioFile = audioFile;
        this.config = config;
        this.scene = scene;
        this.returnPage = returnPage;
        this.noteManager = new NoteManager(tracks);

        let skipTimePosition = this.noteManager.getEarliestNote().timeInSeconds -
            this.config.additionalOffsetInSeconds - 2;
        let partialConfig: ScrollManagerConfig = {
            additionalOffsetInSeconds: this.config.additionalOffsetInSeconds,
            pauseAtStartInSeconds: -skipTimePosition,
            scrollDirection: this.config.scrollDirection
        }

        this.noteManager.hideAllNotesAfterIndex(19);

        // initialize the time manager and play the audio as close together as possible to synchronize the audio with the game
        if (!this.isDebugMode) {
            this.timeManager = new GameTimeManager(partialConfig);
            this.audioFile.playFromTimeInSeconds(skipTimePosition);

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

        let numTracks: number = this.noteManager.tracks.length;
        this.accuracyRecording = new AccuracyRecording(numTracks);

        this.displayConfig = new PlayingConfig(this.config, numTracks);
        this.displayManager = new DisplayManager(this.noteManager, this.displayConfig, this.scene.sketchInstance,
            this.bounds);

        this.holdParticles = new HoldParticles(this.config, numTracks, this.displayManager);
        this.holdGlow = new HoldGlow(this.config, numTracks, this.displayManager);
        this.holdManager = new HoldManager(numTracks, this.onTrackHold.bind(this), this.onTrackUnhold.bind(this));

        if (this.isDebugMode) {
            this.timeManager = new ScrollManager(partialConfig, this.scene.sketchInstance);
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

    private getNotesEndTime() {
        let earliestAccuracy: number;
        if (this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound !== null) {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound;
        } else {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 2].upperBound;
        }
        let latestNote: Note = this.noteManager.getLatestUnhitNote();
        return latestNote.timeInSeconds + earliestAccuracy / 1000;
    }

    protected calculateGameEnd() {
        let notesEndTime = this.getNotesEndTime();
        return notesEndTime + 0.5;
    }

    protected endSong() {
        this.audioFile.stop();
        global.syncResultsDisplay = new SyncResultsDisplay(this.accuracyRecording, this.accuracyManager,
            this.config);
        PageManager.setCurrentPage(PAGES.SYNC_RESULTS);
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

    // private onTrackHold(trackNumber: number, currentTimeInSeconds: number) {
    //     if (this.config.isHoldGlowEnabled) {
    //         this.holdGlow.holdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
    //     }
    //     if (this.config.isHoldParticlesEnabled) {
    //         this.holdParticles.holdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
    //     }
    // }

    // private onTrackUnhold(trackNumber: number, currentTimeInSeconds: number) {
    //     if (this.config.isHoldGlowEnabled) {
    //         this.holdGlow.unholdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
    //     }
    //     if (this.config.isHoldParticlesEnabled) {
    //         this.holdParticles.unholdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
    //     }
    // }

    // private unbindKeys() {
    //     global.keyboardEventManager.unbindKey(global.config.quitKey);
    //     let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
    //     for (let i = 0; i < keyBindings.length; i++) {
    //         let keyBinding: KeyBinding = keyBindings[i];
    //         global.keyboardEventManager.unbindKey(keyBinding.keyCode);
    //     }
    // }

    // public replay() {
    //     this.initialize(this.noteManager.tracks, this.audioFile, this.config, this.scene, this.returnPage);
    // }
}
