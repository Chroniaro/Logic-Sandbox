import {createAction, createSelector} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";
import {Specification} from "../logic/types";
import {Point} from "../app/util/geometry";
import {browserSelector} from "../app/interface";

export const specificationsSelector = createSelector(
    browserSelector,
    browser => browser.specifications
);

export const dragInfoSelector = createSelector(
    browserSelector,
    browser => browser.drag.dragInfo
);

export const newSpecification = createAction(
    'browser/newSpecification',
    () => ({
        payload: {
            uuid: uuid()
        }
    })
);

export const newGateDragStart = createAction(
    'browser/newGateDragStart',
    (specification: Specification, position: Point) => ({
        payload: {
            specification,
            position
        }
    })
);

export const newGateDragged = createAction(
    'browser/newGateDragged--minor',
    (position) => ({
        payload: position
    })
);

export const newGateDropped = createAction(
    'browser/newGateDropped',
    (specification: Specification, grabPosition: Point) => ({
        payload: {
            uuid: uuid(),
            specification,
            grabPosition,
        }
    })
);