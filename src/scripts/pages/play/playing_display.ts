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
import {AbstractPlayingDisplay} from "../../abstract_playing_display";
import {HtmlAudioElementHelper} from "../../audio/html_audio_element_helper";
import {ComboText} from "../../combo_text";
import {Point2D} from "../../point_2d";

export class PlayingDisplay extends AbstractPlayingDisplay {
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

        this.accuracyFeedbackText = new AccuracyFeedbackText(this.bounds.center, this.config);
        this.comboText = new ComboText(new Point2D(this.bounds.center.x, this.bounds.center.y + 18), this.config);
        this.accuracyFeedbackFlash = new AccuracyFeedbackFlash(this.config, this.displayManager, numTracks);
        this.receptorShrinkReaction = new ReceptorShrinkReaction(this.config, this.displayConfig, numTracks);
        this.accuracyFeedbackParticles = new AccuracyFeedbackParticles(this.config, this.displayManager, numTracks);

        if (!isKeyBindingsDefined(numTracks)) {
            initializeKeyBindings(numTracks);
        }
        this.bindKeyBindingsToActions();
    }

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
        global.resultsDisplay = new ResultsDisplay(this.config, this.noteManager, this.scene.sketchInstance,
            this.accuracyRecording);
        PageManager.setCurrentPage(PAGES.PLAY_RESULTS);
        this.unbindKeys();
        clearInterval(this.timeDiffInterval);
    }
}
