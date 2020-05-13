import {createAction, createSelector} from "@reduxjs/toolkit";
import {Specification} from "../logic/types";
import {v4 as uuid} from "uuid";
import {workbenchSelector} from "../app/interface";

export const gatesSelector = createSelector(
    workbenchSelector,
    workbench => workbench.gates
);

export const newGate = createAction(
    'workbench/newGate',
    (specification: Specification, x: number, y: number) => ({
        payload: {
            gate: {
                uuid: uuid(),
                specification,
                x,
                y
            }
        }
    })
);