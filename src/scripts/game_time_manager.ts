import {TimeManager} from "./time_manager";

export interface GameTimeConfig {
    additionalOffsetInSeconds: number;
    pauseAtStartInSeconds: number;
}

export class GameTimeManager extends TimeManager {
    private config: GameTimeConfig;

    constructor(config: GameTimeConfig, systemTimeWhenGameStarted?: number) {
        super(systemTimeWhenGameStarted);
        this.config = config;
    }

    private getGameTimeOffset(): number {
        return this.config.additionalOffsetInSeconds - this.config.pauseAtStartInSeconds;
    }

    public getCurrentTimeInSeconds(systemTimeMillis: number) {
        let currentTime = this.getSystemTimeDifferenceInSeconds(systemTimeMillis) + this.getGameTimeOffset();
        return currentTime;
    }
}
