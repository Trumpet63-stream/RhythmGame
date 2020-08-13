import * as p5 from "p5";
import {ScrollDirection} from "./scroll_direction";
import {GameTimeConfig, GameTimeManager} from "./game_time_manager";
import {Rectangle} from "./rectangle";

export interface ScrollManagerConfig extends GameTimeConfig {
    scrollDirection: ScrollDirection;
}

export class ScrollManager extends GameTimeManager {
    private scrollBounds: Rectangle;

    constructor(config: ScrollManagerConfig, p: p5, scrollBounds?: Rectangle) {
        super(config, 0);
        this.scrollBounds = scrollBounds;
        p.mouseWheel = function (e: WheelEvent) {
            let scrollingAllowed = this.isScrollingAllowed(scrollBounds, p);
            if (scrollingAllowed) {
                let timeChangeInSeconds = (e.deltaY * 0.2) / 1000;
                let currentTimeInSeconds = this.getCurrentTimeInSeconds();
                if (this.config.scrollDirection === ScrollDirection.Down) {
                    this.setCurrentTimeInSeconds(currentTimeInSeconds - timeChangeInSeconds);
                } else {
                    this.setCurrentTimeInSeconds(currentTimeInSeconds + timeChangeInSeconds);
                }
                // Equivalent to event.preventDefault
                return false;
            }
        }.bind(this);
    }

    public getCurrentTimeInSeconds(ignoredArgument?: number): number {
        return super.getCurrentTimeInSeconds(0);
    }

    private isScrollingAllowed(scrollBounds: Rectangle, p: p5) {
        let allowScroll = false;
        if (scrollBounds !== undefined) {
            if (ScrollManager.mouseIsInBounds(p, this.scrollBounds)) {
                allowScroll = true;
            }
        } else {
            allowScroll = true;
        }
        return allowScroll;
    }

    private static mouseIsInBounds(p: p5, bounds: Rectangle) {
        return p.mouseX >= bounds.topLeftX &&
            p.mouseX <= bounds.topLeftX + bounds.width &&
            p.mouseY >= bounds.topLeftY &&
            p.mouseY <= bounds.topLeftY + bounds.height;
    }
}
