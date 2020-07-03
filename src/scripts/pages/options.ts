import * as p5 from "p5";
import {ScrollDirection} from "../scroll_direction";
import {
    booleanToYesNo,
    createLabeledInput,
    createLabeledSelect,
    createLabeledTextArea,
    drawHeading,
    setElementToBottom,
    setOnInputUnlessItAlreadyExists,
    YesNo
} from "../ui_util";
import {global} from "../index";
import {Accuracy} from "../accuracy_manager";
import {DOMWrapper} from "../dom_wrapper";
import {Config} from "../config";
import {KeyBindingsUi} from "../key_bindings_ui";
import {Ticker, TickerState} from "../ticker";

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
            });

            scrollDiv.element.child(resetConfigButton.element);
        }

        let pauseAtStartInSecondsInput = createLabeledInput("Pause at Start (sec)", "pauseAtStartInSecondsInput",
            global.config.pauseAtStartInSeconds.toString(), Options.OPTIONS_CLASS);
        if (!pauseAtStartInSecondsInput.alreadyExists) {
            scrollDiv.element.child(pauseAtStartInSecondsInput.element.parent());
            pauseAtStartInSecondsInput.element.mouseClicked(() => {
                let value: string | number = pauseAtStartInSecondsInput.element.value();
                if (this.isValidPauseAtStart(value)) {
                    this.showPauseAtStartInfo();
                } else {
                    this.showPauseAtStartError();
                }
            })
            // @ts-ignore
            pauseAtStartInSecondsInput.element.input(() => {
                let value: string | number = pauseAtStartInSecondsInput.element.value();
                if (this.isValidPauseAtStart(value)) {
                    this.showPauseAtStartInfo();
                    global.config.pauseAtStartInSeconds = getNumber(value);
                    global.config.save();
                } else {
                    this.showPauseAtStartError();
                }
            });
        }

        let scrollSpeedInput = createLabeledInput("Scroll Speed (px/sec)", "scrollSpeedInput",
            global.config.pixelsPerSecond.toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(scrollSpeedInput, () => {
            let value: string | number = scrollSpeedInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value > 0) {
                global.config.pixelsPerSecond = value;
                global.config.save();
            }
        });
        if (!scrollSpeedInput.alreadyExists) {
            scrollDiv.element.child(scrollSpeedInput.element.parent());
            scrollSpeedInput.element.mouseClicked(() => {
                let value: string | number = scrollSpeedInput.element.value();
                if (this.isValidScrollSpeed(value)) {
                    this.showScrollSpeedInfo();
                } else {
                    this.showScrollSpeedError();
                }
            })
            // @ts-ignore
            scrollSpeedInput.element.input(() => {
                let value: string | number = scrollSpeedInput.element.value();
                if (this.isValidScrollSpeed(value)) {
                    this.showScrollSpeedInfo();
                    global.config.pixelsPerSecond = value;
                    global.config.save();
                } else {
                    this.showScrollSpeedError();
                }
            });
        }

        let scrollDirectionSelect = createLabeledSelect("Scroll Direction", "scrollDirectionSelect",
            ScrollDirection, global.config.scrollDirection, Options.OPTIONS_CLASS);
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(scrollDirectionSelect.element.parent());
            scrollDirectionSelect.element.mouseClicked(() => {
                let value: string | number = scrollDirectionSelect.element.value();
                if (this.isValidScrollDirection(value)) {
                    this.showScrollDirectionInfo();
                } else {
                    this.showScrollDirectionError();
                }
            })
            // @ts-ignore
            scrollDirectionSelect.element.input(() => {
                let value: string | number = scrollDirectionSelect.element.value();
                if (this.isValidScrollDirection(value)) {
                    this.showScrollDirectionInfo();
                    global.config.scrollDirection = getEnum(value, ScrollDirection);
                    global.config.save()
                } else {
                    this.showScrollDirectionError();
                }
            });
        }

        let receptorPositionInput = createLabeledInput("Receptor Position (%)", "receptorPositionInput",
            global.config.receptorYPercent.toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(receptorPositionInput, () => {
            let value: string | number = receptorPositionInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                global.config.receptorYPercent = value;
                global.config.save();
            }
        });
        if (!receptorPositionInput.alreadyExists) {
            scrollDiv.element.child(receptorPositionInput.element.parent());
        }

        let additionalOffsetInSecondsInput = createLabeledInput("Accuracy Offset (ms)", "additionalOffsetInSecondsInput",
            (global.config.additionalOffsetInSeconds * 1000).toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(additionalOffsetInSecondsInput, () => {
            let value: string | number = additionalOffsetInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                global.config.additionalOffsetInSeconds = value / 1000;
                global.config.save();
            }
        });
        if (!additionalOffsetInSecondsInput.alreadyExists) {
            scrollDiv.element.child(additionalOffsetInSecondsInput.element.parent());
        }

        let accuracySettingsInput = createLabeledTextArea("Accuracy Settings", "accuracySettingsInput",
            JSON.stringify(global.config.accuracySettings, null, 3), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracySettingsInput, () => {
            let value: string | number = accuracySettingsInput.element.value();
            if (typeof value === "string") {
                let newAccuracySettings: Accuracy[] = parseAccuracySettingsJson(value);
                if (newAccuracySettings !== null) {
                    global.config.accuracySettings = newAccuracySettings;
                    global.config.save();
                }
            }
        })
        if (!accuracySettingsInput.alreadyExists) {
            scrollDiv.element.child(accuracySettingsInput.element.parent());
        }

        let accuracyFlashEnabledSelect = createLabeledSelect("Accuracy Flash", "accuracyFlashEnabledSelect",
            YesNo, booleanToYesNo(global.config.isAccuracyFlashEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracyFlashEnabledSelect, () => {
            let value: string = String(accuracyFlashEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isAccuracyFlashEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isAccuracyFlashEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyFlashEnabledSelect.element.parent());
        }

        let accuracyParticlesEnabledSelect = createLabeledSelect("Accuracy Particles", "accuracyParticlesEnabledSelect",
            YesNo, booleanToYesNo(global.config.isAccuracyParticlesEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracyParticlesEnabledSelect, () => {
            let value: string = String(accuracyParticlesEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isAccuracyParticlesEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isAccuracyParticlesEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyParticlesEnabledSelect.element.parent());
        }

        let accuracyTextEnabledSelect = createLabeledSelect("Accuracy Text", "accuracyTextEnabledSelect",
            YesNo, booleanToYesNo(global.config.isAccuracyTextEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracyTextEnabledSelect, () => {
            let value: string = String(accuracyTextEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isAccuracyTextEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isAccuracyTextEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyTextEnabledSelect.element.parent());
        }

        let holdParticlesEnabledSelect = createLabeledSelect("Hold Particles", "holdParticlesEnabledSelect",
            YesNo, booleanToYesNo(global.config.isHoldParticlesEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(holdParticlesEnabledSelect, () => {
            let value: string = String(holdParticlesEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isHoldParticlesEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isHoldParticlesEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(holdParticlesEnabledSelect.element.parent());
        }

        let holdGlowEnabledSelect = createLabeledSelect("Hold Glow", "holdGlowEnabledSelect",
            YesNo, booleanToYesNo(global.config.isHoldGlowEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(holdGlowEnabledSelect, () => {
            let value: string = String(holdGlowEnabledSelect.element.value());
            let enumOfValue = YesNo[value as keyof typeof YesNo];
            if (enumOfValue === YesNo.Yes) {
                global.config.isHoldGlowEnabled = true;
                global.config.save();
            } else if (enumOfValue === YesNo.No) {
                global.config.isHoldGlowEnabled = false;
                global.config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(holdGlowEnabledSelect.element.parent());
        }

        KeyBindingsUi.create(scrollDiv.element, Options.OPTIONS_CLASS);

        global.previewDisplay.draw();

        let ticker = Ticker.create(this.DEFAULT_TICKER_MESSAGE, Options.OPTIONS_CLASS);
        setElementToBottom(ticker.element, 4.2, 12, 8);
    }

    private static isValidPauseAtStart(value: string | number): boolean {
        return this.isNumberGreaterThanOrEqualZero(value);
    }
    private static showPauseAtStartInfo(): void {
        Ticker.setMessage("Delay the start of the song to give yourself more time to get ready.",
            TickerState.INFORMATION);
    }
    private static showPauseAtStartError(): void {
        this.showNumberNotGreaterThanOrEqualZeroError();
    }

    private static isValidScrollSpeed(value: string | number): boolean {
        return this.isNumberGreaterThanOrEqualZero(value);
    }
    private static showScrollSpeedInfo(): void {
        Ticker.setMessage("The movement speed of the notes. Higher values will make the notes look farther apart.",
            TickerState.INFORMATION);
    }
    private static showScrollSpeedError(): void {
        this.showNumberNotGreaterThanOrEqualZeroError();
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
        Ticker.setMessage("Error: huh... not sure how you did that.",
            TickerState.ERROR);
    }

    private static isReceptorPositionValid(value: string | number): boolean {
        let numberValue: number = getNumber(value);
        return !isNaN(numberValue);
    }
    private static showReceptorPositionInfo(): void {
        Ticker.setMessage("",
            TickerState.INFORMATION);
    }
    private static showReceptorPositionError(): void {
        Ticker.setMessage("",
            TickerState.ERROR);
    }

    private static isAdditionalOffsetValid(value: string | number): boolean {
        let numberValue: number = getNumber(value);
    }
    private static showAdditionalOffsetInfo(): void {
        Ticker.setMessage("",
            TickerState.INFORMATION);
    }
    private static showAdditionalOffsetError(): void {
        Ticker.setMessage("",
            TickerState.ERROR);
    }

    private static isAccuracySettingsValid(value: string | number): boolean {
        let stringValue: string = String(value);
    }
    private static showAccuracySettingsInfo(): void {
        Ticker.setMessage("",
            TickerState.INFORMATION);
    }
    private static showAccuracySettingsError(): void {
        Ticker.setMessage("",
            TickerState.ERROR);
    }

    private static isAccuracyFlashValid(value: string | number): boolean {
        let enumValue: YesNo = getEnum(value, YesNo);
    }
    private static showAccuracyFlashInfo(): void {
        Ticker.setMessage("",
            TickerState.INFORMATION);
    }
    private static showAccuracyFlashError(): void {
        Ticker.setMessage("",
            TickerState.ERROR);
    }

    private static isAccuracyParticlesValid(value: string | number): boolean {
        let enumValue: YesNo = getEnum(value, YesNo);
    }
    private static showAccuracyParticlesInfo(): void {
        Ticker.setMessage("",
            TickerState.INFORMATION);
    }
    private static showAccuracyParticlesError(): void {
        Ticker.setMessage("",
            TickerState.ERROR);
    }

    private static isAccuracyTextValid(value: string | number): boolean {
        let enumValue: YesNo = getEnum(value, YesNo);
    }
    private static showAccuracyTextInfo(): void {
        Ticker.setMessage("",
            TickerState.INFORMATION);
    }
    private static showAccuracyTextError(): void {
        Ticker.setMessage("",
            TickerState.ERROR);
    }

    private static isHoldParticlesValid(value: string | number): boolean {
        let enumValue: YesNo = getEnum(value, YesNo);
    }
    private static showHoldParticlesInfo(): void {
        Ticker.setMessage("",
            TickerState.INFORMATION);
    }
    private static showHoldParticlesError(): void {
        Ticker.setMessage("",
            TickerState.ERROR);
    }

    private static isHoldGlowValid(value: string | number): boolean {
        let enumValue: YesNo = getEnum(value, YesNo);
    }
    private static showHoldGlowInfo(): void {
        Ticker.setMessage("",
            TickerState.INFORMATION);
    }
    private static showHoldGlowError(): void {
        Ticker.setMessage("",
            TickerState.ERROR);
    }

    private static isNumberGreaterThanOrEqualZero(value: string | number) {
        let numberValue: number = getNumber(value);
        if (!isNaN(numberValue) && numberValue >= 0) {
            return true;
        }
        return false;
    }

    private static showNumberNotGreaterThanOrEqualZeroError() {
        Ticker.setMessage("Error: must be a number greater than or equal to zero.",
            TickerState.ERROR);
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

function getNumber(value: string | number): number {
    if (typeof value === "string") {
        return parseFloat(value);
    }
    return value;
}

function getEnum(value: string | number, EnumType: any): any {
    let string: string = String(value);
    return EnumType[string as keyof typeof EnumType];
}