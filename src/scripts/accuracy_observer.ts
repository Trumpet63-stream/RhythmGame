import {AccuracyEvent} from "./accuracy_event";

export interface AccuracyObserver {
    update(accuracyEvent: AccuracyEvent): void;
}