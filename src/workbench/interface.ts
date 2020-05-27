import {createAction, createSelector} from "@reduxjs/toolkit";
import {workbenchSelector} from "../app/interface";
import {Gate, getSchematicLayout, Linkage, Schematic} from "../schematics/schematic";
import {rejectNewGate, WorkbenchGate, WorkbenchLinkage} from "./types";
import {Point, subtractPoints} from "../util/geometry";
import {dragInfoSelector} from "../browser/interface";

export const gatesSelector = createSelector(
    workbenchSelector,
    workbench => workbench.gates
);

export const linkagesSelector = createSelector(
    workbenchSelector,
    workbench => workbench.linkages
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

export const linkageFromSelector = createSelector(
    workbenchSelector,
    workbench => workbench.linkageFrom
);

export const linkageToSelector = createSelector(
    workbenchSelector,
    workbench => workbench.linkageTo
)

function getSchematicForLinkage(linkage: WorkbenchLinkage): Linkage {
    return {
        type: 'standard',
        data: linkage
    }
}

export const mousePositionOverCanvasSelector = createSelector(
    workbenchSelector,
    workbench => workbench.mousePositionOverCanvas
);

export const schematicSelector = createSelector(
    gatesSelector,
    linkagesSelector,
    linkageFromSelector,
    mousePositionOverCanvasSelector,
    (workbenchGates, workbenchLinkages, linkageFrom, mousePosition) => {
        const gates = workbenchGates.map(getSchematicForGate);
        gates.push({
            type: 'io',
            data: {
                uuid: 'foo',
                position: {x: 0, y: 0},
                ioType: 'input',
                numBoxes: 3,
            }
        });

        let linkages = workbenchLinkages.map(getSchematicForLinkage);
        if (linkageFrom !== null && mousePosition !== null)
            linkages.push(getSchematicForLinkage({
                from: linkageFrom,
                to: mousePosition
            }));

        const schematic: Schematic = {
            gates,
            linkages,
        };

        return schematic;
    }
);

export const schematicLayoutSelector = createSelector(
    schematicSelector,
    getSchematicLayout
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

export const linkageStarted = createAction(
    'workbench/linkageStarted',
    (fromPosition: Point) => ({
        payload: {
            fromPosition
        }
    })
);

export const linkageAborted = createAction(
    'workbench/linkageAborted',
    () => ({
        payload: {}
    })
);

export const newLinkage = createAction(
    'workbench/newLinkage',
    (from: Point, to: Point) => ({
        payload: {
            from, to
        }
    })
)

export const linkageTargetChanged = createAction(
    'workbench/linkageTargetChanged--minor',
    (toPosition: Point | null) => ({
        payload: {
            toPosition
        }
    })
);

export const mousePositionOverCanvasChanged = createAction(
    'workbench/mousePositionOverCanvasChanged--minor',
    (newValue: Point | null) => ({
        payload: newValue
    })
);