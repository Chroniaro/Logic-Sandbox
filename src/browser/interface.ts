import {createAction, createSelector} from "@reduxjs/toolkit";
import {browserSelector} from "../app/interface";

export const newGate = createAction(
    'browser/newGate',
    (uuid: string) => ({
        payload: {
            uuid
        }
    })
);

export const gatesSelector = createSelector(
    browserSelector,
    browser => browser.gates
);