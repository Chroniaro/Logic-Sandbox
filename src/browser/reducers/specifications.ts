import {createReducer} from "@reduxjs/toolkit";
import {Specification} from "../../logic/types";
import {newSpecification} from "../interface";

export type State = Specification[];

const initialState: State = [];

export default createReducer<State>(
    initialState,
    builder => builder
        .addCase(newSpecification, (state, action) => {
            state.push({
                uuid: action.payload.uuid,
                name: "New Spec",
            })
        })
);