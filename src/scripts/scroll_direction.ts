import {getEnumReverseMap} from "./enum_util";

export enum ScrollDirection {
    UP = "Up",
    DOWN = "Down",
}

export let ScrollDirectionReverseMap: Map<string, ScrollDirection> = getEnumReverseMap(ScrollDirection);