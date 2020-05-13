import {Gate} from "./types";
import {createReducer} from "@reduxjs/toolkit";
import {newGate} from "./interface";

export interface State {
    gates: Gate[]
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