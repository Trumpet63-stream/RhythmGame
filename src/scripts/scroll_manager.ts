import * as p5 from "p5";
import {TimeManager} from "./time_manager";
import {Config} from "../scripts2/config";
import {GameTimeSupplier} from "../scripts2/game_time_provider";
import {ScrollDirection} from "./scroll_direction";

export class ScrollManager implements GameTimeSupplier {
    private config: Config;
    private systemTimeMillis: number;
    private timeManager: TimeManager;

    constructor(config: Config, p: p5) {
        this.config = config;
        this.systemTimeMillis = 0;
        this.timeManager = new TimeManager(0, this.config);
        p.mouseWheel = function(e: WheelEvent) {
            let timeChangeMillis = e.deltaY * 0.2;
            if (this.config.scrollDirection === ScrollDirection.Down) {
                this.systemTimeMillis -= timeChangeMillis;
            } else {
                this.systemTimeMillis += timeChangeMillis;
            }
        }.bind(this);
    }

    // Allow an ignored argument so it can be used in place of a TimeManager for debug mode
    getGameTime(ignoredArgument?: any) {
        let time = this.timeManager.getGameTime(this.systemTimeMillis);
        return time;
    }
}
