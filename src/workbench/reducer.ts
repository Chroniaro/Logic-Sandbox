import {createReducer} from "@reduxjs/toolkit";
import {linkageAborted, linkageStarted, mousePositionOverCanvasChanged} from "./interface";
import {WorkbenchGate} from "./types";
import {Point} from "../util/geometry";
import {newGateCreated} from "../browser/interface";

export interface State {
    mousePositionOverCanvas: Point | null,
    linkagePreview: Point | null,
    gates: WorkbenchGate[]
}

const initialState: State = {
    mousePositionOverCanvas: null,
    linkagePreview: null,
    gates: []
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
            state.linkagePreview = action.payload.fromPosition;
        })
        .addCase(linkageAborted, (state) => {
            state.linkagePreview = null;
        })
);