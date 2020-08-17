import {Observer} from "./observer";

export interface Observable {
    addObserver(o: Observer): void;

    removeObserver(o: Observer): void;
}