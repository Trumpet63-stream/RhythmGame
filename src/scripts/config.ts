import {ScrollDirection} from "./scroll_direction";
import {Accuracy} from "./accuracy_manager";
import {defaultIfUndefined} from "./util";
import {DEFAULT_CONFIG} from "./default_config";
import {KeyBinding} from "./key_binding_helper";

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
    }

    public save() {
        // let expires = this.getDateOfOneYearFromNow();
        // let path = '/';
        // let cookieString = escape(JSON.stringify(this))
        //     + ';path=' + path
        //     + ';expires=' + expires.toUTCString();
        // document.cookie = cookieString;
        // console.log("Config saved to cookie!");
        // console.log(document.cookie);
    }

    public static load(): Config {
        // let cookie: string[] = document.cookie.split(';');
        // if (cookie[0]) {
        //     try {
        //         let cookieString: string = unescape(cookie[0]);
        //         let config: Config = JSON.parse(cookieString);
        //         console.log("Config loaded from cookie!");
        //         console.log(config);
        //         return config;
        //     } catch (e) {}
        // }
        // console.log(cookie);
        // console.log("No valid cookie found, returning default config!");
        return new Config({});
    }

    private getDateOfOneYearFromNow() {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        return date;
    }
}