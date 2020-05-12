import {createReducer} from "@reduxjs/toolkit";
import {newGate} from "./interface";
import {Gate} from "../gates/types";

export interface State {
    gates: Gate[]
}

export default createReducer<State>(
    {
        gates: []
    },
    builder =>
        builder
            .addCase(newGate, (state, action) => {
                state.gates.push({
                    uuid: action.payload.uuid,
                    name: "New Gate"
                });
            })
);