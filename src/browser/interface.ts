import {createAction, createSelector} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";
import {Specification} from "../logic/types";
import {Point} from "../util/geometry";
import {browserSelector} from "../app/interface";

export const specificationsSelector = createSelector(
    browserSelector,
    browser => browser.specifications
);

export const dragInfoSelector = createSelector(
    browserSelector,
    browser => browser.dragInfo
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
    (specification: Specification, grabPosition: Point, nodePosition: Point) => ({
        payload: {
            specification,
            grabPosition,
            nodePosition,
        }
    })
);

export const newGateDragged = createAction(
    'browser/newGateDragged--minor',
    (cursorPosition: Point) => ({
        payload: {
            cursorPosition
        }
    })
);

export const newGateAborted = createAction(
    'browser/newGateAborted',
    () => ({
        payload: {}
    })
)

export const newGateCreated = createAction(
    'browser/newGateCreated',
    (specification: Specification, position: Point) => ({
        payload: {
            uuid: uuid(),
            specification,
            position,
        }
    })
);