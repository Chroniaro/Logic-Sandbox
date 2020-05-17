import {createReducer} from "@reduxjs/toolkit";
import {newSpecification} from "./interface";
import {Specification} from "../logic/types";

export interface State {
    specifications: Specification[]
}

export default createReducer<State>(
    {
        specifications: []
    },
    builder =>
        builder
            .addCase(newSpecification, (state, action) => {
                state.specifications.push({
                    uuid: action.payload.uuid,
                    name: "New Spec"
                });
            })
);