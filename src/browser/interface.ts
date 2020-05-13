import {createAction, createSelector} from "@reduxjs/toolkit";
import {browserSelector} from "../app/interface";
import {v4 as uuid} from "uuid";

export const specificationsSelector = createSelector(
    browserSelector,
    browser => browser.specifications
);

export const newSpecification = createAction(
    'browser/newSpecification',
    () => ({
        payload: {
            uuid: uuid()
        }
    })
);