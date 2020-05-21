import {createReducer} from "@reduxjs/toolkit";
import {mousePositionOverCanvasChanged} from "./interface";
import {WorkbenchGate, WorkbenchLinkage} from "./types";
import {Point} from "../util/geometry";
import {newGateCreated} from "../browser/interface";

export interface State {
    mousePositionOverCanvas: Point | null,
    linkagePreview: WorkbenchLinkage | null,
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
);