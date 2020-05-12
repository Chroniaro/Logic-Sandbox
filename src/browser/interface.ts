import {createAction, createSelector} from "@reduxjs/toolkit";
import {browserSelector} from "../app/interface";

export const newSpecification = createAction(
    'browser/newSpecification',
    (uuid: string) => ({
        payload: {
            uuid
        }
    })
);

export const specificationsSelector = createSelector(
    browserSelector,
    browser => browser.specifications
);