import {P5Scene} from "../../p5_scene";
import {DisplayManager} from "../../display_manager";
import {NoteManager} from "../../note_manager";
import {MissManager} from "../../miss_manager";
import {AccuracyManager} from "../../accuracy_manager";
import {ScrollManager, ScrollManagerConfig} from "../../scroll_manager";
import {HoldManager} from "../../hold_manager";
import {Config} from "../../config";
import {initializeKeyBindings, isKeyBindingsDefined} from "../../util";
import {global} from "../../index";
import {PageDescription, PageManager, Pages} from "../page_manager";
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
import {AbstractPlayingDisplay} from "../../abstract_playing_display";
import {ComboText} from "../../combo_text";
import {Point2D} from "../../point_2d";
import {Note} from "../../note";
import {ErrorBar} from "../../error_bar";

export class SyncGameDisplay extends AbstractPlayingDisplay {

    public constructor(tracks: Note[][], audioFile: HtmlAudioElementHelper, config: Config, scene: P5Scene,
                       returnPage: PageDescription, songTitle: string) {
        super(tracks, audioFile, config, scene, returnPage, songTitle);
        this.initialize(tracks, audioFile, config, scene, returnPage);
    }

    public replay() {
        this.initialize(this.noteManager.tracks, this.audioFile, this.config, this.scene, this.returnPage);
    }

    protected initialize(tracks: Note[][], audioFile: HtmlAudioElementHelper, config: Config, scene: P5Scene,
                         returnPage: PageDescription) {
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

        let numTracks: number = this.noteManager.tracks.length;
        this.accuracyRecording = new AccuracyRecording(numTracks);

        this.displayConfig = new PlayingConfig(this.config, numTracks);
        this.displayManager = new DisplayManager(this.noteManager, this.displayConfig, this.scene.sketchInstance,
            this.bounds);

        this.holdParticles = new HoldParticles(this.config, numTracks, this.displayManager);
        this.holdGlow = new HoldGlow(this.config, numTracks, this.displayManager);
        this.holdManager = new HoldManager(numTracks, this.onTrackHold.bind(this), this.onTrackUnhold.bind(this));

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
        this.errorBar = new ErrorBar(this.config);

        if (!isKeyBindingsDefined(numTracks)) {
            initializeKeyBindings(numTracks);
        }
        this.bindKeyBindingsToActions();

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

        if (this.isDebugMode) {
            this.timeManager = new ScrollManager(partialConfig, this.scene.sketchInstance);
        }
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
        PageManager.setCurrentPage(Pages.SYNC_RESULTS);
        this.unbindKeys();
        clearInterval(this.timeDiffInterval);
    }
}
