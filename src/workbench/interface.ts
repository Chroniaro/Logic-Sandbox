import {createAction, createSelector} from "@reduxjs/toolkit";
import {workbenchSelector} from "../app/interface";
import {Gate, getSchematicLayout, Schematic} from "../schematics/schematic";
import {WorkbenchGate} from "./types";
import {Point} from "../util/geometry";

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

export const mousePositionOverCanvasChanged = createAction(
    'workbench/mousePositionOverCanvasChanged--minor',
    (newValue: Point | null) => ({
        payload: newValue
    })
);