import {ScrollDirection} from "./scroll_direction";
import {Accuracy} from "./accuracy_manager";
import {defaultIfUndefined} from "./util";
import {DEFAULT_CONFIG} from "./default_config";
import {KeyBinding} from "./key_binding_helper";
import {LocalStorage} from "./local_storage";

/* Stores user settings. Expected not to change during play */
export class Config {
    pixelsPerSecond: number;
    receptorYPercent: number;
    scrollDirection: ScrollDirection;
    additionalOffsetInSeconds: number;
    accuracySettings: Accuracy[];
    pauseAtStartInSeconds: number;
    keyBindings: Map<number, KeyBinding[]>;
    gameAreaHeight: number;
    gameAreaWidth: number;
    noteSize: number;
    quitKey: number;
    isAccuracyFlashEnabled: boolean;
    isAccuracyParticlesEnabled: boolean;
    isAccuracyTextEnabled: boolean;
    isHoldParticlesEnabled: boolean;
    isHoldGlowEnabled: boolean;
    isComboTextEnabled: boolean;
    isLiveComparisonEnabled: boolean;
    public static STORAGE_KEY = "config";

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
                    quitKey?: number,
                    isAccuracyFlashEnabled?: boolean,
                    isAccuracyParticlesEnabled?: boolean,
                    isAccuracyTextEnabled?: boolean,
                    isHoldParticlesEnabled?: boolean,
                    isHoldGlowEnabled?: boolean,
                    isComboTextEnabled?: boolean,
                    isLiveComparisonEnabled?: boolean,
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
        this.keyBindings = defaultIfUndefined(args.keyBindings, DEFAULT_CONFIG.keyBindings);
        this.quitKey = defaultIfUndefined(args.quitKey, DEFAULT_CONFIG.quitKey);
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
        this.isLiveComparisonEnabled = defaultIfUndefined(args.isLiveComparisonEnabled, DEFAULT_CONFIG.isLiveComparisonEnabled)
    }

    public save() {
        let configString = this.getConfigAsString();
        console.log("saving config to local storage");
        LocalStorage.setItem(Config.STORAGE_KEY, configString);
    }

    private getConfigAsString() {
        let string: string = JSON.stringify(this);
        string = string.replace(',"keyBindings":{},',
            ',"keyBindings":' + this.stringifyKeyBindings() + ',');
        return string;
    }

    public static load(): Config {
        let configString = LocalStorage.getItem(Config.STORAGE_KEY);
        if (configString !== null) {
            try {
                let configJSON = JSON.parse(configString);
                // let configJSON = JSON.parse(unescape(configString));
                configJSON.keyBindings = new Map(configJSON.keyBindings);
                let config: Config = new Config(configJSON);
                console.log("Config loaded from local storage");
                console.log(config);
                return config;
            } catch (e) {
                console.error(e);
            }
        }
        console.log("No valid local storage entry found, returning default config");
        return new Config({});
    }

    private stringifyKeyBindings(): string {
        let string = "[";
        this.keyBindings.forEach((value: KeyBinding[], key: number) => {
            string += "[" + key + "," + JSON.stringify(value) + "]";
        })
        string += "]";
        return string;
    }
}