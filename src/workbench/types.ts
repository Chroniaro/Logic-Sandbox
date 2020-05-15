import {Specification} from "../logic/types";

export const LinkageDragType = 'linkage';

export interface Gate {
    uuid: string,
    specification: Specification,
    x: number,
    y: number
}