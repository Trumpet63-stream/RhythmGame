import {P5Scene} from "./p5_scene";
import {Config} from "./config";
import {NoteManager} from "./note_manager";
import {DisplayConfig, DisplayManager} from "./display_manager";
import {TimeManager} from "./time_manager";
import {MissManager} from "./miss_manager";
import {AccuracyManager} from "./accuracy_manager";
import {AccuracyRecording, AccuracyRecordingState} from "./accuracy_recording";
import {AccuracyFeedbackText} from "./accuracy_feedback_text";
import {HoldManager} from "./hold_manager";
import {ReceptorShrinkReaction} from "./receptor_shrink_reaction";
import {AccuracyFeedbackFlash} from "./accuracy_feedback_flash";
import {AccuracyFeedbackParticles} from "./accuracy_feedback_particles";
import {HoldParticles} from "./hold_particles";
import {HoldGlow} from "./hold_glow";
import {HtmlAudioElementHelper} from "./audio/html_audio_element_helper";
import {PageDescription} from "./pages/page_manager";
import {Rectangle} from "./rectangle";
import {Note} from "./stepfile";
import {global} from "./index";
import {KeyBinding} from "./key_binding_helper";
import {KeyState, PlayerKeyAction} from "./player_key_action";
import {AccuracyEvent} from "./accuracy_event";
import {ComboText} from "./combo_text";
import {LiveComparison} from "./live_comparison";
import {ErrorBar} from "./error_bar";

export abstract class AbstractPlayingDisplay {
    protected scene: P5Scene;
    protected config: Config;
    protected noteManager: NoteManager;
    protected displayManager: DisplayManager;
    protected timeManager: TimeManager;
    protected missManager: MissManager;
    protected accuracyManager: AccuracyManager;
    protected gameEndTime: number;
    protected showResultsScreen: boolean;
    protected accuracyRecording: AccuracyRecording;
    protected isDebugMode: boolean = false;
    protected accuracyFeedbackText: AccuracyFeedbackText;
    protected holdManager: HoldManager;
    protected displayConfig: DisplayConfig;
    protected receptorShrinkReaction: ReceptorShrinkReaction;
    protected accuracyFeedbackFlash: AccuracyFeedbackFlash;
    protected accuracyFeedbackParticles: AccuracyFeedbackParticles;
    protected holdParticles: HoldParticles;
    protected holdGlow: HoldGlow;
    protected audioFile: HtmlAudioElementHelper;
    protected timeDiffInterval: number;
    protected returnPage: PageDescription;
    protected bounds: Rectangle;
    protected comboText: ComboText;
    protected songTitle: string;
    protected liveComparison: LiveComparison;
    protected errorBar: ErrorBar;

    public constructor(tracks: Note[][], audioFile: HtmlAudioElementHelper, config: Config, scene: P5Scene,
                       returnPage: PageDescription, songTitle: string) {
        this.bounds = Rectangle.fromTopLeft(
            (scene.sketchInstance.width - 240) / 2,
            (scene.sketchInstance.height - 480) / 2,
            240,
            480
        )
        this.songTitle = songTitle;
        this.initialize(tracks, audioFile, config, scene, returnPage);
    }

    protected abstract initialize(tracks: Note[][], audioFile: HtmlAudioElementHelper, config: Config, scene: P5Scene,
                                  returnPage: PageDescription): void;

    protected handleAccuracyEvent(accuracyEvent: AccuracyEvent) {
        this.accuracyRecording.update(accuracyEvent);
        this.accuracyFeedbackParticles.update(accuracyEvent);
        this.accuracyFeedbackText.update(accuracyEvent);
        this.accuracyFeedbackFlash.update(accuracyEvent);
        this.comboText.update(accuracyEvent);
        if (this.liveComparison !== undefined) {
            this.liveComparison.update(accuracyEvent);
        }
        this.errorBar.update(accuracyEvent);
    }

    public draw() {
        let currentTimeInSeconds = this.timeManager.getCurrentTimeInSeconds(performance.now());
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
        if (this.config.isComboTextEnabled) {
            this.comboText.draw(currentTimeInSeconds);
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
        if (this.liveComparison !== undefined && this.config.isLiveComparisonEnabled) {
            this.liveComparison.draw(currentTimeInSeconds);
        }
        if (this.config.isErrorBarEnabled) {
            this.errorBar.draw(currentTimeInSeconds);
        }
    }

    protected abstract calculateGameEnd(): number;

    protected abstract endSong(): void;

    public replay() {
        this.initialize(this.noteManager.tracks, this.audioFile, this.config, this.scene, this.returnPage);
    }

    protected bindKeyBindingsToActions() {
        let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
        let isSpacebarBound: boolean = false;
        let spacebarKeyCode: number = 32;
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding: KeyBinding = keyBindings[i];
            if (keyBinding.keyCode === spacebarKeyCode) {
                isSpacebarBound = true;
            }
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

        if (!isSpacebarBound) {
            // bind key to nothing to make sure the default behavior is prevented
            global.keyboardEventManager.bindKeyToAction(spacebarKeyCode, () => {
            });
        }
    }

    private keyDownActionForTrack(trackNumber: number) {
        this.receptorShrinkReaction.holdTrack(trackNumber);
        let playerKeyAction: PlayerKeyAction =
            new PlayerKeyAction(this.timeManager.getCurrentTimeInSeconds(performance.now()), trackNumber, KeyState.DOWN);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
    }

    private keyUpActionForTrack(trackNumber: number) {
        this.receptorShrinkReaction.releaseTrack(trackNumber);
        let playerKeyAction: PlayerKeyAction =
            new PlayerKeyAction(this.timeManager.getCurrentTimeInSeconds(performance.now()), trackNumber, KeyState.UP);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
    }

    protected onTrackHold(trackNumber: number, currentTimeInSeconds: number) {
        if (this.config.isHoldGlowEnabled) {
            this.holdGlow.holdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
        }
        if (this.config.isHoldParticlesEnabled) {
            this.holdParticles.holdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
        }
    }

    protected onTrackUnhold(trackNumber: number, currentTimeInSeconds: number) {
        if (this.config.isHoldGlowEnabled) {
            this.holdGlow.unholdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
        }
        if (this.config.isHoldParticlesEnabled) {
            this.holdParticles.unholdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
        }
    }

    protected unbindKeys() {
        global.keyboardEventManager.unbindKey(global.config.quitKey);
        let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding: KeyBinding = keyBindings[i];
            global.keyboardEventManager.unbindKey(keyBinding.keyCode);
        }
    }
}