import {Specification} from "../../logic/types";
import {Point} from "../../app/util/geometry";
import {createReducer} from "@reduxjs/toolkit";
import {newGateDragged, newGateDragStart, newGateDropped} from "../interface";

interface DragInformation {
    specification: Specification,
    position: Point,
}

export interface State {
    dragInfo: DragInformation | null
}

const initialState: State = {
    dragInfo: null
}

export default createReducer<State>(
    initialState,
    builder => builder
        .addCase(newGateDragStart, (state, action) => {
            state.dragInfo = action.payload;
        })
        .addCase(newGateDragged, (state, action) => {
            if (state.dragInfo === null)
                throw Error("Gate dragged when no drag started.");

            state.dragInfo.position = action.payload;
        })
        .addCase(newGateDropped, (state) => {
            state.dragInfo = null;
        })
);