export abstract class TimeManager {
    private systemTimeMillis: number;

    protected constructor(systemTime?: number) {
        if (systemTime === undefined) {
            this.systemTimeMillis = performance.now();
        } else {
            this.systemTimeMillis = systemTime;
        }
    }

    protected getSystemTimeDifferenceInSeconds(systemTimeMillis: number): number {
        if (systemTimeMillis === undefined) {
            throw Error("Error: can't get elapsed time. Given systemTimeMillis is undefined");
        }
        return (systemTimeMillis - this.systemTimeMillis) / 1000;
    }

    public abstract getCurrentTimeInSeconds(systemTimeMillis: number): number;

    public setCurrentTimeInSeconds(currentTimeInSeconds: number): void {
        this.systemTimeMillis -= 1000 * (currentTimeInSeconds - this.getCurrentTimeInSeconds(performance.now()));
    }
}
