import {Specification} from "../logic/types";

export interface Gate {
    uuid: string,
    specification: Specification,
    x: number,
    y: number
}