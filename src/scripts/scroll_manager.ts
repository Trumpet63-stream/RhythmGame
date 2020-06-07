import * as p5 from "p5";
import {TimeManager} from "./time_manager";
import {Config} from "./config";
import {GameTimeProvider} from "./game_time_provider";
import {ScrollDirection} from "./scroll_direction";

export class ScrollManager implements GameTimeProvider {
    private config: Config;
    private systemTimeMillis: number;
    private timeManager: TimeManager;
    private scrollBounds: { topLeftX: number, topLeftY: number, width: number, height: number };

    constructor(config: Config, p: p5, scrollBounds?: { topLeftX: number, topLeftY: number, width: number, height: number }) {
        this.config = config;
        this.systemTimeMillis = 0;
        this.timeManager = new TimeManager(0, this.config);
        this.scrollBounds = scrollBounds;
        p.mouseWheel = function (e: WheelEvent) {
            let allowScroll = false;
            if (scrollBounds !== undefined) {
                if (this.mouseIsInBounds(p, this.scrollBounds)) {
                    allowScroll = true;
                }
            } else {
                allowScroll = true;
            }
            if (allowScroll) {
                let timeChangeMillis = e.deltaY * 0.2;
                if (this.config.scrollDirection === ScrollDirection.Down) {
                    this.systemTimeMillis -= timeChangeMillis;
                } else {
                    this.systemTimeMillis += timeChangeMillis;
                }
                // Equivalent to event.preventDefault
                return false;
            }
        }.bind(this);
    }

    // Allow an ignored argument so it can be used in place of a TimeManager for debug mode
    getGameTime(ignoredArgument?: any) {
        let time = this.timeManager.getGameTime(this.systemTimeMillis);
        return time;
    }

    private mouseIsInBounds(p: p5, bounds: { topLeftX: number, topLeftY: number, width: number, height: number }) {
        if (p.mouseX >= bounds.topLeftX && p.mouseX <= bounds.topLeftX + bounds.width &&
            p.mouseY >= bounds.topLeftY && p.mouseY <= bounds.topLeftY + bounds.height) {
            return true;
        } else {
            return false;
        }
    }
}
