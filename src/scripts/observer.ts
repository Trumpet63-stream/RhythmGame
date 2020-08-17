import {Observable} from "./observable";

export interface Observer {
    update(o: Observable, newValue: any): void;
}