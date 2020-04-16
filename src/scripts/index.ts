import {getFullParse, getPartialParse, PartialParse} from "./parsing";
import {
    disablePlayButton
} from "./ui_state";
import {Config, ConfigOption} from "./config";
import {Globals} from "./globals";
import {KeyBindingManager} from "./key_binding_manager";
import {replaceNotYetImplementedNoteTypes, setAllNotesToDefaultState} from "./util";

export class Mode {
    public type: string;
    public difficulty: string;
    public meter: string;
    public id: number;
}

let localStartedParse: PartialParse;
export let config = new Config({});
let keyBindingManager = new KeyBindingManager(config);
document.addEventListener("keydown", (e) => (keyBindingManager.keyDown(e)));

export let audioSource: AudioBufferSourceNode;

function startParse(fileContents: string) {
    localStartedParse = getPartialParse(fileContents);
    // let modeOptions: Mode[] = getModeOptionsForDisplay(localStartedParse.modes);
    // updateSimfileState(SimfileState.SIMFILE_PREPARSED, modeOptions);
}

// This function is called from html that's generated in script
export function modeSelected() {
    // updateSimfileState(SimfileState.DIFFICULTY_SELECTED);
    let selectedMode: number = parseInt((<HTMLInputElement>document.getElementById("mode-select")).value);
    // Globals.PARSED_NOTES = getFullParse(selectedMode, localStartedParse);
    setAllNotesToDefaultState(Globals.PARSED_NOTES);
    replaceNotYetImplementedNoteTypes(Globals.PARSED_NOTES);
    // Globals.CURRENT_GAME_AREA = new PreviewDisplay(Globals.PARSED_NOTES, config);
    // updateSimfileState(SimfileState.SIMFILE_PARSED, Globals.PARSED_NOTES.length);
}

export function goToPrepareGameplay() {
    disablePlayButton();
    // Globals.CURRENT_GAME_AREA.remove();
    // Globals.CURRENT_GAME_AREA = new PlayingDisplay(Globals.PARSED_NOTES, config);
}

export function bindingClicked(bindingIndex: number) {
    keyBindingManager.expectingKeyInput = true;
    keyBindingManager.receivingIndex = bindingIndex;
}

export function configUpdated(configOptionCode: number) {
    switch (configOptionCode) {
        case ConfigOption.SECONDS_PER_PIXEL:
            config.updateSecondsPerPixel();
            break;
        case ConfigOption.RECEPTOR_Y_POSITION:
            config.updateReceptorYPosition();
            break;
        case ConfigOption.SCROLL_DIRECTION:
            config.updateScrollDirection();
            break;
        case ConfigOption.AUDIO_START_DELAY:
            config.updateAudioStartDelay();
            break;
        case ConfigOption.ACCURACY_SETTINGS:
            config.updateAccuracySettings();
            break;
        case ConfigOption.PAUSE_AT_START:
            config.updatePauseAtStart();
            break;
    }
}

export function autoPauseAtStart() {
    // Globals.CURRENT_GAME_AREA.config.setPauseAtStartToDefault(Globals.CURRENT_GAME_AREA.noteManager);
}