import {Specification} from "../logic/types";
import {Gate} from "../schematics/schematic";

export const InputLinkageDragType = 'linkage-input';
export const OutputLinkageDragType = 'linkage-output';

export type LinkageDragType = typeof InputLinkageDragType | typeof OutputLinkageDragType;

export function isLinkageDragType(type: any): type is LinkageDragType {
    if (typeof (type) !== 'string')
        return false;

    return [
        InputLinkageDragType,
        OutputLinkageDragType,
    ].includes(type);
}

export interface LinkageDraggableItem {
    type: LinkageDragType;
}

export interface WorkbenchGate {
    uuid: string,
    specification: Specification,
    position: { x: number, y: number }
}

export function getSchematicForGate(gate: WorkbenchGate): Gate {
    return {
        type: 'standard',
        data: {
            position: gate.position,
            name: gate.specification.name,
            numInputs: 3,
            numOutputs: 2,
        }
    }
}