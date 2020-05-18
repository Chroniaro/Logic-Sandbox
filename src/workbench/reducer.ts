import {createReducer} from "@reduxjs/toolkit";
import {newGate} from "./interface";
import {WorkbenchGate} from "./types";

export interface State {
    gates: WorkbenchGate[]
}

export default createReducer<State>(
    {
        gates: []
    },
    builder => builder
        .addCase(newGate, (state, action) => {
            state.gates.push(action.payload.gate);
        })
);