import {ScrollDirection} from "./scroll_direction";
import {Accuracy} from "./accuracy_manager";
import {defaultIfUndefined} from "./util";
import {DEFAULT_CONFIG} from "./default_config";
import {KeyBinding} from "./key_binding_helper";

/* Stores user settings. Expected not to change during play */
export class Config {
    public pixelsPerSecond: number;
    public receptorYPercent: number;
    public scrollDirection: ScrollDirection;
    public additionalOffsetInSeconds: number;
    public accuracySettings: Accuracy[];
    public pauseAtStartInSeconds: number;
    public keyBindings: Map<number, KeyBinding[]>;
    public gameAreaHeight: number;
    public gameAreaWidth: number;
    public noteSize: number;
    public noteSpacing: number;
    public quitKey: number;
    public username: string;
    public password: string;
    public isAccuracyFlashEnabled: boolean;
    public isAccuracyParticlesEnabled: boolean;
    public isAccuracyTextEnabled: boolean;
    public isHoldParticlesEnabled: boolean;
    public isHoldGlowEnabled: boolean;
    public isComboTextEnabled: boolean;
    public isLiveComparisonEnabled: boolean;
    public isErrorBarEnabled: boolean;
    public isErrorBarBackgroundEnabled: boolean;

    constructor(args: {
                    pixelsPerSecond?: number,
                    receptorYPercent?: number,
                    scrollDirection?: ScrollDirection,
                    additionalOffsetInSeconds?: number,
                    accuracySettings?: Accuracy[],
                    pauseAtStartInSeconds?: number,
                    keyBindings?: Map<number, KeyBinding[]>,
                    gameAreaHeight?: number,
                    gameAreaWidth?: number,
                    noteSize?: number,
                    noteSpacing?: number,
                    quitKey?: number,
                    username?: string,
                    password?: string,
                    isAccuracyFlashEnabled?: boolean,
                    isAccuracyParticlesEnabled?: boolean,
                    isAccuracyTextEnabled?: boolean,
                    isHoldParticlesEnabled?: boolean,
                    isHoldGlowEnabled?: boolean,
                    isComboTextEnabled?: boolean,
                    isLiveComparisonEnabled?: boolean,
                    isErrorBarEnabled?: boolean,
                    isErrorBarBackgroundEnabled?: boolean,
                }
    ) {
        this.gameAreaHeight = defaultIfUndefined(args.gameAreaHeight, DEFAULT_CONFIG.gameAreaHeight);
        this.gameAreaWidth = defaultIfUndefined(args.gameAreaWidth, DEFAULT_CONFIG.gameAreaWidth);
        this.pixelsPerSecond = defaultIfUndefined(args.pixelsPerSecond, DEFAULT_CONFIG.pixelsPerSecond);
        this.scrollDirection = defaultIfUndefined(args.scrollDirection, DEFAULT_CONFIG.scrollDirection);

        // NOTE: Scroll direction and gameAreaHeight must be set BEFORE setting receptorYPosition
        this.receptorYPercent = defaultIfUndefined(args.receptorYPercent, DEFAULT_CONFIG.receptorYPercent);

        this.additionalOffsetInSeconds = defaultIfUndefined(args.additionalOffsetInSeconds, DEFAULT_CONFIG.additionalOffsetInSeconds);
        this.accuracySettings = defaultIfUndefined(args.accuracySettings, DEFAULT_CONFIG.accuracySettings);
        this.pauseAtStartInSeconds = defaultIfUndefined(args.pauseAtStartInSeconds, DEFAULT_CONFIG.pauseAtStartInSeconds);
        this.noteSize = defaultIfUndefined(args.noteSize, DEFAULT_CONFIG.noteSize);
        this.noteSpacing = defaultIfUndefined(args.noteSpacing, DEFAULT_CONFIG.noteSpacing);
        this.keyBindings = defaultIfUndefined(args.keyBindings, DEFAULT_CONFIG.keyBindings);
        this.quitKey = defaultIfUndefined(args.quitKey, DEFAULT_CONFIG.quitKey);
        this.username = defaultIfUndefined(args.username, undefined);
        this.password = defaultIfUndefined(args.password, undefined);
        this.isAccuracyFlashEnabled = defaultIfUndefined(args.isAccuracyFlashEnabled,
            DEFAULT_CONFIG.isAccuracyFlashEnabled);
        this.isAccuracyParticlesEnabled = defaultIfUndefined(args.isAccuracyParticlesEnabled,
            DEFAULT_CONFIG.isAccuracyParticlesEnabled);
        this.isAccuracyTextEnabled = defaultIfUndefined(args.isAccuracyTextEnabled,
            DEFAULT_CONFIG.isAccuracyTextEnabled);
        this.isHoldParticlesEnabled = defaultIfUndefined(args.isHoldParticlesEnabled,
            DEFAULT_CONFIG.isHoldParticlesEnabled);
        this.isHoldGlowEnabled = defaultIfUndefined(args.isHoldGlowEnabled, DEFAULT_CONFIG.isHoldGlowEnabled);
        this.isComboTextEnabled = defaultIfUndefined(args.isComboTextEnabled, DEFAULT_CONFIG.isComboTextEnabled);
        this.isLiveComparisonEnabled = defaultIfUndefined(args.isLiveComparisonEnabled, DEFAULT_CONFIG.isLiveComparisonEnabled);
        this.isErrorBarEnabled = defaultIfUndefined(args.isErrorBarEnabled, DEFAULT_CONFIG.isErrorBarEnabled);
        this.isErrorBarBackgroundEnabled = defaultIfUndefined(args.isErrorBarBackgroundEnabled,
            DEFAULT_CONFIG.isErrorBarBackgroundEnabled);
    }
}