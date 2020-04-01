import {GameTimeSupplier} from "../scripts2/game_time_provider";
import {Config} from "../scripts2/config";

export class TimeManager implements GameTimeSupplier {
    systemTimeWhenGameStarted: number;
    private config: Config;

    constructor(systemTimeWhenGameStarted: number, config: Config) {
        this.systemTimeWhenGameStarted = systemTimeWhenGameStarted;
        this.config = config;
    }

    private getElapsedTime(systemTime: number): number {
        if (systemTime === undefined) {
            throw Error("Error: can't get elapsed time. Expected 1 argument: systemTime.");
        }
        return (systemTime - this.systemTimeWhenGameStarted) / 1000; // in seconds
    }

    getGameTime(systemTime: number) {
        return this.getElapsedTime(systemTime) + this.config.additionalOffsetInSeconds - this.config.pauseAtStartInSeconds;
    }
}
