import {Specification} from "../logic/types";
import {Point} from "../app/util/geometry";

export interface WorkbenchGate {
    uuid: string,
    specification: Specification,
    position: { x: number, y: number }
}

export interface WorkbenchLinkage {
    from: Point,
    to: Point,
}