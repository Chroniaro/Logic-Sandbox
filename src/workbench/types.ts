import {Specification} from "../logic/types";

export const InputLinkageDragType = 'linkage-input';
export const OutputLinkageDragType = 'linkage-output';

export type LinkageDragType = typeof InputLinkageDragType | typeof OutputLinkageDragType;

export function isLinkageDragType(type: any): type is LinkageDragType {
    if (typeof (type) !== 'string')
        return false;

    return [
        InputLinkageDragType,
        OutputLinkageDragType
    ].includes(type);
}

export interface LinkageDraggableItem {
    type: LinkageDragType;
}

export interface Gate {
    uuid: string,
    specification: Specification,
    x: number,
    y: number
}