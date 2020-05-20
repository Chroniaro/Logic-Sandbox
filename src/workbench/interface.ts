import {createAction, createSelector} from "@reduxjs/toolkit";
import {Specification} from "../logic/types";
import {v4 as uuid} from "uuid";
import {workbenchSelector} from "../app/interface";
import {getSchematicForGate} from "./types";
import {getSchematicLayout, Schematic} from "../schematics/schematic";
import {Point} from "../app/util/geometry";

export const viewPositionSelector = createSelector(
    workbenchSelector,
    workbench => workbench.viewPosition
);

export const gatesSelector = createSelector(
    workbenchSelector,
    workbench => workbench.gates
);

export const schematicSelector = createSelector(
    gatesSelector,
    gates => {
        const schematic: Schematic = {
            gates: gates.map(getSchematicForGate),
            linkages: [],
        };

        return schematic;
    }
);

export const schematicLayoutSelector = createSelector(
    schematicSelector,
    getSchematicLayout
);

export const viewDragged = createAction(
    'workbench/viewDragged--minor',
    (dragDelta: Point) => ({
        payload: dragDelta
    })
);

export const newGate = createAction(
    'workbench/newGate',
    (specification: Specification, x: number, y: number) => ({
        payload: {
            gate: {
                uuid: uuid(),
                specification,
                position: {x, y}
            }
        }
    })
);