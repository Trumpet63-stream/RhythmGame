import {Accuracy} from "./accuracy_manager";
import {ScrollDirection} from "./scroll_direction";

export let DEFAULT_CONFIG = {
    pixelsPerSecond: 550,
    scrollDirection: ScrollDirection.Down,
    receptorYPercent: 15,
    additionalOffsetInSeconds: 0,
    // This is a symmetrical version of FFR's accuracy
    accuracySettings: [
        new Accuracy("Miss", null, -117),
        new Accuracy("Average", -117, -83),
        new Accuracy("Good", -83, -50),
        new Accuracy("Perfect", -50, -17),
        new Accuracy("Amazing", -17, 17),
        new Accuracy("Perfect", 17, 50),
        new Accuracy("Good", 50, 83),
        new Accuracy("Average", 83, 117),
        new Accuracy("Boo", 117, null)
    ],
    pauseAtStartInSeconds: 0,
    keyBindings: new Map(),
    gameAreaHeight: 600,
    gameAreaWidth: 400,
    noteSize: 30,
    noteSpacing: 15,
    quitKey: 27, // Quit defaults to escape key
    isAccuracyFlashEnabled: true,
    isAccuracyParticlesEnabled: true,
    isAccuracyTextEnabled: true,
    isHoldParticlesEnabled: true,
    isHoldGlowEnabled: true,
    isComboTextEnabled: true,
    isLiveComparisonEnabled: true,
    isErrorBarEnabled: true,
};