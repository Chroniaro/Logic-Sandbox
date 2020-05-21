import {createAction, createSelector} from "@reduxjs/toolkit";
import {workbenchSelector} from "../app/interface";
import {Gate, getSchematicLayout, Schematic} from "../schematics/schematic";
import {rejectNewGate, WorkbenchGate} from "./types";
import {Point, subtractPoints} from "../util/geometry";
import {dragInfoSelector} from "../browser/interface";

export const gatesSelector = createSelector(
    workbenchSelector,
    workbench => workbench.gates
);

function getSchematicForGate(gate: WorkbenchGate): Gate {
    return {
        type: 'standard',
        data: {
            uuid: gate.uuid,
            position: gate.position,
            name: gate.specification.name,
            numInputs: 3,
            numOutputs: 2,
        }
    }
}

export const schematicSelector = createSelector(
    gatesSelector,
    (workbenchGates) => {
        const gates = workbenchGates.map(getSchematicForGate);

        const schematic: Schematic = {
            gates,
            linkages: [],
        };

        return schematic;
    }
);

export const schematicLayoutSelector = createSelector(
    schematicSelector,
    getSchematicLayout
);

export const mousePositionOverCanvasSelector = createSelector(
    workbenchSelector,
    workbench => workbench.mousePositionOverCanvas
);

export const newGateStatusSelector = createSelector(
    dragInfoSelector,
    mousePositionOverCanvasSelector,
    (dragInfo, mousePosition) => {
        if (mousePosition === null || dragInfo === null)
            return rejectNewGate;
        else
            return {
                accept: true,
                position: subtractPoints(mousePosition, dragInfo.grabPosition),
            }
    }
);

export const mousePositionOverCanvasChanged = createAction(
    'workbench/mousePositionOverCanvasChanged--minor',
    (newValue: Point | null) => ({
        payload: newValue
    })
);