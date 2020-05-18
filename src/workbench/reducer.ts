import {createReducer} from "@reduxjs/toolkit";
import {newGate} from "./interface";
import {WorkbenchGate} from "./types";

export interface State {
    gates: WorkbenchGate[]
}

export default createReducer<State>(
    {
        gates: [
            {
                uuid: 'foo',
                position: {x: -50, y: 7000},
                specification: {
                    uuid: 'zoom',
                    name: 'My Gate'
                }
            }
        ]
    },
    builder => builder
        .addCase(newGate, (state, action) => {
            state.gates.push(action.payload.gate);
        })
);