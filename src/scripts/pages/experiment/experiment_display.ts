import {P5Scene} from "../../p5_scene";
import {DisplayConfig, DisplayManager} from "../../display_manager";
import {NoteManager} from "../../note_manager";
import {MissManager} from "../../miss_manager";
import {AccuracyManager} from "../../accuracy_manager";
import {ScrollManager} from "../../scroll_manager";
import {ResultsDisplay} from "../play_results/results_display";
import {HoldManager} from "../../hold_manager";
import {Config} from "../../config";
import {initializeKeyBindings, isKeyBindingsDefined} from "../../util";
import {global} from "../../index";
import {PageDescription, PageManager, Pages} from "../page_manager";
import {AccuracyRecording, AccuracyRecordingState} from "../../accuracy_recording";
import {AccuracyFeedbackText} from "../../accuracy_feedback_text";
import {ReceptorShrinkReaction} from "../../receptor_shrink_reaction";
import {AccuracyFeedbackFlash} from "../../accuracy_feedback_flash";
import {AccuracyFeedbackParticles} from "../../accuracy_feedback_particles";
import {HoldParticles} from "../../hold_particles";
import {HoldGlow} from "../../hold_glow";
import {PlayingConfig} from "../../playing_config";
import {GameTimeManager} from "../../game_time_manager";
import {ComboText} from "../../combo_text";
import {Point2D} from "../../point_2d";
import {ErrorBar} from "../../error_bar";
import {Note, NoteState, NoteType} from "../../note";
import {PlayResults} from "../play_results/play_results";
import {TimeManager} from "../../time_manager";
import {Rectangle} from "../../rectangle";
import {AccuracyEvent} from "../../accuracy_event";
import {KeyBinding} from "../../key_binding_helper";
import {KeyState, PlayerKeyEvent} from "../../player_key_action";
import {AccuracyUtil} from "../../accuracy_util";
import {NoteGenerator} from "./note_generator";

export class ExperimentDisplay {
    private scene: P5Scene;
    private config: Config;
    private noteManager: NoteManager;
    private displayManager: DisplayManager;
    private timeManager: TimeManager;
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
    private timeDiffInterval: number;
    private returnPage: PageDescription;
    private bounds: Rectangle;
    private comboText: ComboText;
    private songTitle: string;
    private errorBar: ErrorBar;
    private noteGenerator: NoteGenerator;

    public constructor(tracks: Note[][], config: Config, scene: P5Scene,
                       returnPage: PageDescription, songTitle: string) {
        this.bounds = Rectangle.fromTopLeft(
            (scene.sketchInstance.width - 240) / 2,
            (scene.sketchInstance.height - 480) / 2,
            240,
            480
        )
        this.songTitle = songTitle;

        this.showResultsScreen = false;
        this.config = config;
        this.scene = scene;
        this.returnPage = returnPage;

        this.noteManager = new NoteManager(tracks);
        let numTracks: number = this.noteManager.tracks.length;
        this.accuracyRecording = new AccuracyRecording(numTracks);

        this.noteGenerator = new NoteGenerator(this.noteManager);

        this.displayConfig = new PlayingConfig(this.config, numTracks);
        this.displayManager = new DisplayManager(this.noteManager, this.displayConfig, this.scene.sketchInstance,
            this.bounds);

        this.holdParticles = new HoldParticles(this.config, numTracks, this.displayManager);
        this.holdGlow = new HoldGlow(this.config, numTracks, this.displayManager);
        this.holdManager = new HoldManager(numTracks, this.onTrackHold.bind(this), this.onTrackUnhold.bind(this));

        this.gameEndTime = Infinity;
        this.accuracyManager = new AccuracyManager(this.noteManager, this.config, this.holdManager,
            this.handleAccuracyEvent.bind(this));
        this.missManager = new MissManager(this.config, this.noteManager, this.accuracyRecording, this.holdManager,
            this.handleAccuracyEvent.bind(this));

        this.accuracyFeedbackText = new AccuracyFeedbackText(this.bounds.center, this.config);
        this.comboText = new ComboText(new Point2D(this.bounds.center.x, this.bounds.center.y + 18), this.config);
        this.accuracyFeedbackFlash = new AccuracyFeedbackFlash(this.config, this.displayManager, numTracks);
        this.receptorShrinkReaction = new ReceptorShrinkReaction(this.config, this.displayConfig, numTracks);
        this.accuracyFeedbackParticles = new AccuracyFeedbackParticles(this.config, this.displayManager, numTracks);
        this.errorBar = new ErrorBar(this.config);

        if (!isKeyBindingsDefined(numTracks)) {
            initializeKeyBindings(numTracks);
        }
        this.bindKeyBindingsToActions();

        if (!this.isDebugMode) {
            this.timeManager = new GameTimeManager(this.config);
        } else {
            this.timeManager = new ScrollManager(this.config, this.scene.sketchInstance);
        }
    }

    private endSong() {
        global.resultsDisplay = new ResultsDisplay(this.config, this.noteManager, this.scene.sketchInstance,
            this.accuracyRecording, undefined, this.songTitle, this.returnPage);
        this.unbindKeys();
        clearInterval(this.timeDiffInterval);
        PlayResults.messageFromLastPlay = {
            accuracyRecording: this.accuracyRecording,
            noteManager: this.noteManager,
            returnPage: this.returnPage,
            songTitle: this.songTitle,
            saveEnabled: false
        }
        PageManager.setCurrentPage(Pages.PLAY_RESULTS);
    }

    private handleAccuracyEvent(accuracyEvent: AccuracyEvent) {
        this.accuracyRecording.update(accuracyEvent);
        this.accuracyFeedbackParticles.update(accuracyEvent);
        this.accuracyFeedbackText.update(accuracyEvent);
        this.accuracyFeedbackFlash.update(accuracyEvent);
        this.comboText.update(accuracyEvent);
        this.errorBar.update(accuracyEvent);
        this.noteGenerator.update(accuracyEvent);
        this.handleMiss(accuracyEvent);
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
        if (this.config.isErrorBarEnabled) {
            this.errorBar.draw(currentTimeInSeconds);
        }
        this.noteGenerator.draw(currentTimeInSeconds);
    }

    private bindKeyBindingsToActions() {
        let keyBindings = global.config.keyBindings.get(this.noteManager.tracks.length);
        let isSpacebarBound: boolean = false;
        let spacebarKeyCode: number = 32;
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding: KeyBinding = keyBindings[i];
            if (keyBinding.keyCode === spacebarKeyCode) {
                isSpacebarBound = true;
            }
            global.keyboardEventManager.bindKeyToAction(keyBinding.keyCode,
                () => this.handlePlayerKeyEvent(
                    new PlayerKeyEvent(this.timeManager.getCurrentTimeInSeconds(performance.now())
                        , keyBinding.trackNumber, KeyState.DOWN)),
                () => this.handlePlayerKeyEvent(
                    new PlayerKeyEvent(this.timeManager.getCurrentTimeInSeconds(performance.now()),
                        keyBinding.trackNumber, KeyState.UP)))
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
        if (!AccuracyUtil.eventIsAMiss(accuracyEvent, this.config)) {
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
