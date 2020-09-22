import * as p5 from "p5";
import {ScrollDirection} from "../../scroll_direction";
import {
    booleanToYesNo,
    createLabeledInput,
    createLabeledSelect,
    createLabeledTextArea,
    createUserInput,
    drawHeading,
    setElementToBottom,
    YesNo,
    yesNoToBoolean
} from "../../ui_util";
import {global} from "../../index";
import {Accuracy} from "../../accuracy_manager";
import {DOMWrapper} from "../../dom_wrapper";
import {Config} from "../../config";
import {KeyBindingsUi} from "./key_bindings_ui";
import {Ticker, TickerState} from "./ticker";
import {getEnum, getFloat} from "../../util";

export abstract class Options {
    public static OPTIONS_CLASS: string = "options";
    private static DEFAULT_TICKER_MESSAGE =
        "All the options! Click an option to show more information about it.";

    public static draw() {
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.optionsBackground);
        drawHeading();

        let scrollDiv = DOMWrapper.create(() => {
            return p.createDiv();
        }, "scrollDiv");
        if (!scrollDiv.alreadyExists) {
            scrollDiv.element.addClass("options-scroll-div");
            scrollDiv.element.addClass(Options.OPTIONS_CLASS);
            scrollDiv.element.addClass(global.globalClass);
        }
        // @ts-ignore
        let canvasPosition: { x: number, y: number } = p._renderer.position();
        scrollDiv.element.position(canvasPosition.x + 335, canvasPosition.y + 45);

        let resetConfigButton = DOMWrapper.create(() => {
            return p.createButton("Reset To Default");
        }, "resetConfigButton");
        if (!resetConfigButton.alreadyExists) {
            resetConfigButton.element.addClass(Options.OPTIONS_CLASS);
            resetConfigButton.element.addClass("reset-config");
            resetConfigButton.element.addClass(global.globalClass);

            resetConfigButton.element.mousePressed(() => {
                global.config = new Config({});
                global.config.save();
                KeyBindingsUi.resetNumTracks();
                KeyBindingsUi.regeneratePreview();
                DOMWrapper.clearRegistry();
            });

            scrollDiv.element.child(resetConfigButton.element);
        }

        createUserInput(() => createLabeledInput("Pause at Start (sec)",
            "pauseAtStartInSecondsInput", global.config.pauseAtStartInSeconds.toString(), Options.OPTIONS_CLASS),
            this.isValidPauseAtStart.bind(this),
            this.showPauseAtStartInfo.bind(this),
            this.showPauseAtStartError.bind(this),
            (input: number | string) => {
                global.config.pauseAtStartInSeconds = getFloat(input);
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledInput("Scroll Speed (px/sec)",
            "scrollSpeedInput", global.config.pixelsPerSecond.toString(), Options.OPTIONS_CLASS),
            this.isValidScrollSpeed.bind(this),
            this.showScrollSpeedInfo.bind(this),
            this.showScrollSpeedError.bind(this),
            (input: number | string) => {
                global.config.pixelsPerSecond = getFloat(input);
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledSelect("Scroll Direction",
            "scrollDirectionSelect", ScrollDirection, global.config.scrollDirection, Options.OPTIONS_CLASS),
            this.isValidScrollDirection.bind(this),
            this.showScrollDirectionInfo.bind(this),
            this.showScrollDirectionError.bind(this),
            (input: number | string) => {
                global.config.scrollDirection = getEnum(input, ScrollDirection);
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledInput("Receptor Position (%)",
            "receptorPositionInput", global.config.receptorYPercent.toString(), Options.OPTIONS_CLASS),
            this.isValidReceptorPosition.bind(this),
            this.showReceptorPositionInfo.bind(this),
            this.showReceptorPositionError.bind(this),
            (input: number | string) => {
                global.config.receptorYPercent = getFloat(input);
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledInput("Note Size (px)",
            "noteSizeInput", global.config.noteSize.toString(), Options.OPTIONS_CLASS),
            this.isValidNoteSize.bind(this),
            this.showNoteSizeInfo.bind(this),
            this.showNoteSizeError.bind(this),
            (input: number | string) => {
                global.config.noteSize = getFloat(input);
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledInput("Note Spacing (px)",
            "noteSpacingInput", global.config.noteSpacing.toString(), Options.OPTIONS_CLASS),
            this.isValidNoteSpacing.bind(this),
            this.showNoteSpacingInfo.bind(this),
            this.showNoteSpacingError.bind(this),
            (input: number | string) => {
                global.config.noteSpacing = getFloat(input);
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledInput("Accuracy Offset (ms)",
            "additionalOffsetInput", (global.config.additionalOffsetInSeconds * 1000).toString(),
            Options.OPTIONS_CLASS),
            this.isValidAdditionalOffset.bind(this),
            this.showAdditionalOffsetInfo.bind(this),
            this.showAdditionalOffsetError.bind(this),
            (input: number | string) => {
                global.config.additionalOffsetInSeconds = getFloat(input) / 1000;
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledTextArea("Accuracy Settings",
            "accuracySettingsInput", JSON.stringify(global.config.accuracySettings, null, 3),
            Options.OPTIONS_CLASS),
            this.isValidAccuracySettings.bind(this),
            this.showAccuracySettingsInfo.bind(this),
            this.showAccuracySettingsError.bind(this),
            (input: number | string) => {
                global.config.accuracySettings = parseAccuracySettingsJson(String(input));
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledSelect("Accuracy Flash",
            "accuracyFlashEnabledSelect", YesNo, booleanToYesNo(global.config.isAccuracyFlashEnabled),
            Options.OPTIONS_CLASS),
            this.isValidAccuracyFlash.bind(this),
            this.showAccuracyFlashInfo.bind(this),
            this.showAccuracyFlashError.bind(this),
            (input: number | string) => {
                global.config.isAccuracyFlashEnabled = yesNoToBoolean(getEnum(input, YesNo));
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledSelect("Accuracy Particles",
            "accuracyParticlesEnabledSelect", YesNo, booleanToYesNo(global.config.isAccuracyParticlesEnabled),
            Options.OPTIONS_CLASS),
            this.isValidAccuracyParticles.bind(this),
            this.showAccuracyParticlesInfo.bind(this),
            this.showAccuracyParticlesError.bind(this),
            (input: number | string) => {
                global.config.isAccuracyParticlesEnabled = yesNoToBoolean(getEnum(input, YesNo));
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledSelect("Accuracy Text",
            "accuracyTextEnabledSelect", YesNo, booleanToYesNo(global.config.isAccuracyTextEnabled),
            Options.OPTIONS_CLASS),
            this.isValidAccuracyText.bind(this),
            this.showAccuracyTextInfo.bind(this),
            this.showAccuracyTextError.bind(this),
            (input: number | string) => {
                global.config.isAccuracyTextEnabled = yesNoToBoolean(getEnum(input, YesNo));
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledSelect("Hold Particles",
            "holdParticlesEnabledSelect", YesNo, booleanToYesNo(global.config.isHoldParticlesEnabled),
            Options.OPTIONS_CLASS),
            this.isValidHoldParticles.bind(this),
            this.showHoldParticlesInfo.bind(this),
            this.showHoldParticlesError.bind(this),
            (input: number | string) => {
                global.config.isHoldParticlesEnabled = yesNoToBoolean(getEnum(input, YesNo));
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledSelect("Hold Glow",
            "holdGlowEnabledSelect", YesNo, booleanToYesNo(global.config.isHoldGlowEnabled), Options.OPTIONS_CLASS),
            this.isValidHoldGlow.bind(this),
            this.showHoldGlowInfo.bind(this),
            this.showHoldGlowError.bind(this),
            (input: number | string) => {
                global.config.isHoldGlowEnabled = yesNoToBoolean(getEnum(input, YesNo));
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledSelect("Combo Text",
            "comboTextEnabledSelect", YesNo, booleanToYesNo(global.config.isComboTextEnabled),
            Options.OPTIONS_CLASS),
            this.isValidComboText.bind(this),
            this.showComboTextInfo.bind(this),
            this.showComboTextError.bind(this),
            (input: number | string) => {
                global.config.isComboTextEnabled = yesNoToBoolean(getEnum(input, YesNo));
                global.config.save();
            },
            scrollDiv.element);

        createUserInput(() => createLabeledSelect("Live Comparison",
            "liveComparisonEnabledSelect", YesNo, booleanToYesNo(global.config.isLiveComparisonEnabled),
            Options.OPTIONS_CLASS),
            this.isValidLiveComparison.bind(this),
            this.showLiveComparisonInfo.bind(this),
            this.showLiveComparisonError.bind(this),
            (input: number | string) => {
                global.config.isLiveComparisonEnabled = yesNoToBoolean(getEnum(input, YesNo));
                global.config.save();
            },
            scrollDiv.element);

        KeyBindingsUi.create(scrollDiv.element, Options.OPTIONS_CLASS);

        global.previewDisplay.draw();

        let ticker = Ticker.create(this.DEFAULT_TICKER_MESSAGE, Options.OPTIONS_CLASS);
        setElementToBottom(ticker.element, 4.2, 12, 8);
    }

    private static isValidPauseAtStart(value: string | number): boolean {
        return this.isFloatGreaterThanOrEqualZero(value);
    }

    private static showPauseAtStartInfo(): void {
        Ticker.setMessage("Delay the start of the song to give yourself more time to get ready.",
            TickerState.INFORMATION);
    }

    private static showPauseAtStartError(): void {
        this.showNumberNotGreaterThanOrEqualZeroError();
    }

    private static isValidScrollSpeed(value: string | number): boolean {
        return this.isFloatGreaterThanZero(value);
    }

    private static showScrollSpeedInfo(): void {
        Ticker.setMessage("The movement speed of the notes. Higher values will make the notes look farther apart.",
            TickerState.INFORMATION);
    }

    private static showScrollSpeedError(): void {
        this.showNumberNotGreaterThanZeroError();
    }

    private static isValidScrollDirection(value: string | number): boolean {
        let enumValue: ScrollDirection = getEnum(value, ScrollDirection);
        return enumValue !== undefined;
    }

    private static showScrollDirectionInfo(): void {
        Ticker.setMessage("Controls which way the arrows go.",
            TickerState.INFORMATION);
    }

    private static showScrollDirectionError(): void {
        this.showSelectError();
    }

    private static isValidReceptorPosition(value: string | number): boolean {
        return this.isFloat(value);
    }

    private static showReceptorPositionInfo(): void {
        let oppositeDirection: string;
        if (global.config.scrollDirection === ScrollDirection.Down) {
            oppositeDirection = "up";
        } else {
            oppositeDirection = "down";
        }
        Ticker.setMessage("Increase this value to move the receptors " + oppositeDirection + ".",
            TickerState.INFORMATION);
    }

    private static showReceptorPositionError(): void {
        this.showValueNotNumberError();
    }

    private static isValidNoteSize(value: string | number): boolean {
        return this.isFloatGreaterThanZero(value);
    }

    private static showNoteSizeInfo(): void {
        Ticker.setMessage("Increase this number to make the notes and receptors bigger.",
            TickerState.INFORMATION);
    }

    private static showNoteSizeError(): void {
        this.showNumberNotGreaterThanZeroError();
    }

    private static isValidNoteSpacing(value: string | number): boolean {
        return this.isFloat(value);
    }

    private static showNoteSpacingInfo(): void {
        Ticker.setMessage("Increase this separate the notes farther apart horizontally.",
            TickerState.INFORMATION);
    }

    private static showNoteSpacingError(): void {
        this.showValueNotNumberError();
    }

    private static isValidAdditionalOffset(value: string | number): boolean {
        return this.isFloat(value);
    }

    private static showAdditionalOffsetInfo(): void {
        Ticker.setMessage("Shifts the time position of all the notes. Use this to help synchronize the music.",
            TickerState.INFORMATION);
    }

    private static showAdditionalOffsetError(): void {
        this.showValueNotNumberError();
    }

    private static isValidAccuracySettings(value: string | number): boolean {
        let stringValue: string = String(value);
        return parseAccuracySettingsJson(stringValue) !== null;
    }

    private static showAccuracySettingsInfo(): void {
        Ticker.setMessage("Controls what happens when you hit a note too early, too late, or exactly right.",
            TickerState.INFORMATION);
    }

    private static showAccuracySettingsError(): void {
        Ticker.setMessage("Error: unable to parse the JSON text.",
            TickerState.ERROR);
    }

    private static isValidAccuracyFlash(value: string | number): boolean {
        return this.isValidYesNo(value);
    }

    private static showAccuracyFlashInfo(): void {
        Ticker.setMessage("A flash effect that shows on the receptors when you hit a note.",
            TickerState.INFORMATION);
    }

    private static showAccuracyFlashError(): void {
        this.showSelectError();
    }

    private static isValidAccuracyParticles(value: string | number): boolean {
        return this.isValidYesNo(value);
    }

    private static showAccuracyParticlesInfo(): void {
        Ticker.setMessage("Particles that shoot out of the receptors when you hit a note.",
            TickerState.INFORMATION);
    }

    private static showAccuracyParticlesError(): void {
        this.showSelectError();
    }

    private static isValidAccuracyText(value: string | number): boolean {
        return this.isValidYesNo(value);
    }

    private static showAccuracyTextInfo(): void {
        Ticker.setMessage("Text that pops up telling you what accuracy you hit a note with.",
            TickerState.INFORMATION);
    }

    private static showAccuracyTextError(): void {
        this.showSelectError();
    }

    private static isValidHoldParticles(value: string | number): boolean {
        return this.isValidYesNo(value);
    }

    private static showHoldParticlesInfo(): void {
        Ticker.setMessage("Particles that shoot out while you're holding a note.",
            TickerState.INFORMATION);
    }

    private static showHoldParticlesError(): void {
        this.showSelectError();
    }

    private static isValidHoldGlow(value: string | number): boolean {
        return this.isValidYesNo(value);
    }

    private static showHoldGlowInfo(): void {
        Ticker.setMessage("A glow effect on the receptors that shows when you're holding a note.",
            TickerState.INFORMATION);
    }

    private static showHoldGlowError(): void {
        this.showSelectError();
    }

    private static isValidComboText(value: string | number): boolean {
        return this.isValidYesNo(value);
    }

    private static showComboTextInfo(): void {
        Ticker.setMessage("Text that pops up telling you how many notes you have hit in a row.",
            TickerState.INFORMATION);
    }

    private static showComboTextError(): void {
        this.showSelectError();
    }

    private static isValidLiveComparison(value: string | number): boolean {
        return this.isValidYesNo(value);
    }

    private static showLiveComparisonInfo(): void {
        Ticker.setMessage(
            "A colored gauge that indicates how well you're doing compared to your personal best.",
            TickerState.INFORMATION);
    }

    private static showLiveComparisonError(): void {
        this.showSelectError();
    }

    private static isFloatGreaterThanOrEqualZero(value: string | number) {
        let numberValue: number = getFloat(value);
        return !isNaN(numberValue) && numberValue >= 0;
    }

    private static showNumberNotGreaterThanOrEqualZeroError() {
        Ticker.setMessage("Error: must be a number greater than or equal to zero.",
            TickerState.ERROR);
    }

    private static isFloatGreaterThanZero(value: string | number) {
        let numberValue: number = getFloat(value);
        return !isNaN(numberValue) && numberValue > 0;
    }

    private static showNumberNotGreaterThanZeroError() {
        Ticker.setMessage("Error: must be a number greater than zero.",
            TickerState.ERROR);
    }

    private static isValidYesNo(value: string | number) {
        let enumValue: YesNo = getEnum(value, YesNo);
        return enumValue !== undefined;
    }

    private static showSelectError() {
        Ticker.setMessage("Error: huh... not sure how you did that.",
            TickerState.ERROR);
    }

    private static showValueNotNumberError() {
        Ticker.setMessage("Error: must be a number.",
            TickerState.ERROR);
    }

    private static isFloat(value: string | number) {
        let numberValue: number = getFloat(value);
        return !isNaN(numberValue);
    }
}

function parseAccuracySettingsJson(accuracySettingsJson: string): Accuracy[] {
    try {
        let accuracySettings: Accuracy[] = []
        let jsonArray: Accuracy[] = JSON.parse(accuracySettingsJson);
        for (let i = 0; i < jsonArray.length; i++) {
            let accuracy = jsonArray[i];
            // this fails if the user gave the wrong input
            accuracySettings.push(new Accuracy(accuracy.name, accuracy.lowerBound, accuracy.upperBound));
        }
        return accuracySettings;
    } catch (e) {
    }
    return null;
}
