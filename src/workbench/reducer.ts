import {createReducer} from "@reduxjs/toolkit";
import {newGate, viewDragged} from "./interface";
import {WorkbenchGate} from "./types";
import {Point, subtractPoints} from "../app/util/geometry";

export interface State {
    viewPosition: Point,
    gates: WorkbenchGate[]
}

const initialState = {
    viewPosition: {
        x: 0,
        y: 0,
    },

    gates: []
};

export default createReducer<State>(
    initialState,
    builder => builder
        .addCase(newGate, (state, action) => {
            state.gates.push(action.payload.gate);
        })
        .addCase(viewDragged, (state, action) => {
            state.viewPosition = subtractPoints(state.viewPosition, action.payload);
        })
);