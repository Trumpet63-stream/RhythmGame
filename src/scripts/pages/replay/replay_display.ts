import {P5Scene} from "../../p5_scene";
import {PlayerKeyEvent} from "../../player_key_action";
import {AccuracyRecording, AccuracyRecordingState, Replay} from "../../accuracy_recording";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";
import {AccuracyFeedbackFlash} from "../../accuracy_feedback_flash";
import {PageDescription, PageManager, Pages} from "../page_manager";
import {AccuracyEvent} from "../../accuracy_event";
import {global} from "../../index";
import {AccuracyFeedbackText} from "../../accuracy_feedback_text";
import {HoldManager} from "../../hold_manager";
import {ReceptorShrinkReaction} from "../../receptor_shrink_reaction";
import {NoteManager} from "../../note_manager";
import {HoldGlow} from "../../hold_glow";
import {LiveComparison} from "../../live_comparison";
import {ErrorBar} from "../../error_bar";
import {HoldParticles} from "../../hold_particles";
import {TimeManager} from "../../time_manager";
import {ComboText} from "../../combo_text";
import {DisplayConfig, DisplayManager} from "../../display_manager";
import {AccuracyFeedbackParticles} from "../../accuracy_feedback_particles";
import {KeyBinding} from "../../key_binding_helper";
import {Config} from "../../config";
import {Rectangle} from "../../rectangle";
import {Note, NoteState, NoteType} from "../../note";
import {PlayingConfig} from "../../playing_config";
import {Point2D} from "../../point_2d";
import {GameTimeManager} from "../../game_time_manager";
import {ScrollManager} from "../../scroll_manager";
import {ResultsDisplay} from "../play_results/results_display";
import {PlayResults} from "../play_results/play_results";
import {ReplayManager} from "../../replay_manager";
import {AccuracyManager} from "../../accuracy_manager";
import {AccuracyUtil} from "../../accuracy_util";

export class ReplayDisplay {
    private scene: P5Scene;
    private config: Config;
    private noteManager: NoteManager;
    private displayManager: DisplayManager;
    private timeManager: TimeManager;
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
    private audioFile: HtmlAudioElementHelper;
    private timeDiffInterval: number;
    private returnPage: PageDescription;
    private bounds: Rectangle;
    private comboText: ComboText;
    private songTitle: string;
    private liveComparison: LiveComparison;
    private errorBar: ErrorBar;
    private comparisonReplay: Replay;
    private replayManager: ReplayManager;

    public constructor(tracks: Note[][], audioFile: HtmlAudioElementHelper, config: Config, scene: P5Scene,
                       returnPage: PageDescription, replay: Replay) {
        this.bounds = Rectangle.fromTopLeft(
            (scene.sketchInstance.width - 240) / 2,
            (scene.sketchInstance.height - 480) / 2,
            240,
            480
        )
        this.songTitle = replay.songTitle;

        this.showResultsScreen = false;
        this.audioFile = audioFile;
        this.config = config;
        this.scene = scene;
        this.returnPage = returnPage;

        this.noteManager = new NoteManager(tracks);
        let numTracks: number = this.noteManager.tracks.length;
        this.accuracyRecording = AccuracyRecording.ofReplay(replay);

        this.displayConfig = new PlayingConfig(this.config, numTracks);
        this.displayManager = new DisplayManager(this.noteManager, this.displayConfig, this.scene.sketchInstance,
            this.bounds);

        this.holdParticles = new HoldParticles(this.config, numTracks, this.displayManager);
        this.holdGlow = new HoldGlow(this.config, numTracks, this.displayManager);
        this.holdManager = new HoldManager(numTracks, this.onTrackHold.bind(this), this.onTrackUnhold.bind(this));

        this.gameEndTime = this.calculateGameEnd();
        this.replayManager = new ReplayManager(this.config, this.accuracyRecording, this.holdManager,
            this.handleAccuracyEvent.bind(this), this.handlePlayerKeyEvent.bind(this));
        this.accuracyManager = new AccuracyManager(this.noteManager, this.config, this.holdManager,
            this.handleAccuracyEvent.bind(this));

        this.accuracyFeedbackText = new AccuracyFeedbackText(this.bounds.center, this.config);
        this.comboText = new ComboText(new Point2D(this.bounds.center.x, this.bounds.center.y + 18), this.config);
        this.accuracyFeedbackFlash = new AccuracyFeedbackFlash(this.config, this.displayManager, numTracks);
        this.receptorShrinkReaction = new ReceptorShrinkReaction(this.config, this.displayConfig, numTracks);
        this.accuracyFeedbackParticles = new AccuracyFeedbackParticles(this.config, this.displayManager, numTracks);
        this.errorBar = new ErrorBar(this.config);

        this.bindKeyBindingsToActions();

        // initialize the time manager and play the audio as close together as possible to synchronize the audio with the game
        if (!this.isDebugMode) {
            this.timeManager = new GameTimeManager(this.config);
            this.audioFile.play(config.pauseAtStartInSeconds);
        }

        if (this.isDebugMode) {
            this.timeManager = new ScrollManager(this.config, this.scene.sketchInstance);
        }
    }

    private handleAccuracyEvent(accuracyEvent: AccuracyEvent) {
        this.accuracyFeedbackParticles.update(accuracyEvent);
        this.accuracyFeedbackText.update(accuracyEvent);
        this.accuracyFeedbackFlash.update(accuracyEvent);
        this.comboText.update(accuracyEvent);
        if (this.liveComparison !== undefined) {
            this.liveComparison.update(accuracyEvent);
        }
        this.errorBar.update(accuracyEvent);
        this.handleMiss(accuracyEvent);
    }

    public draw() {
        let currentTimeInSeconds = this.timeManager.getCurrentTimeInSeconds(performance.now());
        if (currentTimeInSeconds >= this.gameEndTime && !this.showResultsScreen) {
            this.accuracyRecording.state = AccuracyRecordingState.READY;
            this.endSong();
        }
        this.replayManager.update(currentTimeInSeconds);
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

    private calculateGameEnd() {
        let audioDuration = this.audioFile.getDuration();
        let notesEndTime = this.getNotesEndTime();
        if (audioDuration < notesEndTime) {
            return notesEndTime + 1;
        }
        return Math.min(notesEndTime + 5, audioDuration);
    }

    private getNotesEndTime() {
        let earliestAccuracy: number;
        if (this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound !== null) {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound;
        } else {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 2].upperBound;
        }
        return this.noteManager.getLatestNote().timeInSeconds + earliestAccuracy / 1000;
    }

    private endSong() {
        this.audioFile.stop();
        global.resultsDisplay = new ResultsDisplay(this.config, this.noteManager, this.scene.sketchInstance,
            this.accuracyRecording, this.comparisonReplay, this.songTitle, this.returnPage);
        this.unbindKeys();
        clearInterval(this.timeDiffInterval);
        PlayResults.messageFromLastPlay = {
            accuracyRecording: this.accuracyRecording,
            noteManager: this.noteManager,
            returnPage: this.returnPage,
            songTitle: this.songTitle,
            isReplay: true
        }
        PageManager.setCurrentPage(Pages.PLAY_RESULTS);
    }

    private bindKeyBindingsToActions() {
        global.keyboardEventManager.bindKeyToAction(global.config.quitKey, () => {
            this.endSong();
        });

        // bind key to nothing to make sure the default behavior is prevented
        let spacebarKeyCode: number = 32;
        global.keyboardEventManager.bindKeyToAction(spacebarKeyCode, () => {
        });
    }

    private handlePlayerKeyEvent(playerKeyEvent: PlayerKeyEvent) {
        this.receptorShrinkReaction.update(playerKeyEvent);
        this.accuracyManager.handlePlayerKeyEvent(playerKeyEvent);
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
        global.keyboardEventManager.unbindKey(global.config.quitKey);
        let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding: KeyBinding = keyBindings[i];
            global.keyboardEventManager.unbindKey(keyBinding.keyCode);
        }
    }

    private handleMiss(accuracyEvent: AccuracyEvent) {
        if (AccuracyUtil.MISS_ACCURACY_FLAG !== accuracyEvent.accuracyMillis) {
            return;
        }
        let track = this.noteManager.tracks[accuracyEvent.trackNumber];
        let missedNote = track[accuracyEvent.noteIndex];
        missedNote.state = NoteState.MISSED;
        if (missedNote.type === NoteType.TAIL) {
            if (this.holdManager.isTrackHeld(accuracyEvent.trackNumber)) {
                // Force a hold release upon missing the tail
                this.holdManager.unholdTrack(accuracyEvent.trackNumber, accuracyEvent.timeInSeconds)
            }
        } else if (missedNote.type === NoteType.HOLD_HEAD) {
            let nextNote = track[accuracyEvent.noteIndex + 1];
            if (nextNote !== undefined) {
                if (nextNote.type === NoteType.TAIL) {
                    nextNote.state = NoteState.MISSED; // Miss the tail when you miss the head
                }
            }
        }
    }
}