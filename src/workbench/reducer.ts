import {createReducer} from "@reduxjs/toolkit";
import {
    linkageAborted,
    linkageStarted,
    linkageTargetChanged,
    mousePositionOverCanvasChanged,
    newLinkage
} from "./interface";
import {WorkbenchGate, WorkbenchLinkage} from "./types";
import {Point} from "../util/geometry";
import {newGateCreated} from "../browser/interface";

export interface State {
    mousePositionOverCanvas: Point | null,
    linkageFrom: Point | null,
    linkageTo: Point | null,
    gates: WorkbenchGate[],
    linkages: WorkbenchLinkage[],
}

const initialState: State = {
    mousePositionOverCanvas: null,
    linkageFrom: null,
    linkageTo: null,
    gates: [],
    linkages: []
};

export default createReducer<State>(
    initialState,
    builder => builder
        .addCase(mousePositionOverCanvasChanged, (state, action) => {
            state.mousePositionOverCanvas = action.payload;
        })
        .addCase(newGateCreated, (state, action) => {
            state.gates.push(action.payload);
        })
        .addCase(linkageStarted, (state, action) => {
            state.linkageFrom = action.payload.fromPosition;
        })
        .addCase(linkageAborted, (state) => {
            state.linkageFrom = null;
        })
        .addCase(newLinkage, (state, action) => {
            state.linkageFrom = null;
            state.linkages.push(action.payload);
        })
        .addCase(linkageTargetChanged, (state, action) => {
            state.linkageTo = action.payload.toPosition;
        })
);