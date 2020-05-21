import {Specification} from "../../logic/types";
import {Point} from "../../app/util/geometry";
import {createReducer} from "@reduxjs/toolkit";
import {newGateDragged, newGateDragStart, newGateDropped} from "../interface";

interface DragInformation {
    specification: Specification,
    position: Point,
}

export type State = DragInformation | null;

const initialState = null;

export default createReducer<State>(
    initialState,
    builder => builder
        .addCase(newGateDragStart, (state, action) => {
            return action.payload;
        })
        .addCase(newGateDragged, (state, action) => {
            if (state === null)
                throw Error("Gate dragged when no drag started.");

            state.position = action.payload;
        })
        .addCase(newGateDropped, () => {
            return null;
        })
);