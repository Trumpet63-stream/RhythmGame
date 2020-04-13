import {GameTimeSupplier} from "../scripts2/game_time_provider";
import {Config} from "../scripts2/config";

export class TimeManager implements GameTimeSupplier {
    private systemTimeWhenGameStarted: number;
    private config: Config;

    constructor(systemTimeWhenGameStarted: number, config: Config) {
        this.systemTimeWhenGameStarted = systemTimeWhenGameStarted;
        this.config = config;
    }

    private getElapsedTime(systemTimeMillis: number): number {
        if (systemTimeMillis === undefined) {
            throw Error("Error: can't get elapsed time. Expected 1 argument: systemTime.");
        }
        return (systemTimeMillis - this.systemTimeWhenGameStarted) / 1000; // in seconds
    }

    // We want to keep this calculation in only one place
    getGameTime(systemTimeMillis: number) {
        return this.getElapsedTime(systemTimeMillis) + this.config.additionalOffsetInSeconds - this.config.pauseAtStartInSeconds;
    }
}
