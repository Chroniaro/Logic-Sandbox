import {Specification} from "../../logic/types";
import {Point, subtractPoints} from "../../util/geometry";
import {createReducer} from "@reduxjs/toolkit";
import {newGateAborted, newGateCreated, newGateDragged, newGateDragStart} from "../interface";

interface DragInformation {
    specification: Specification,
    grabPosition: Point,
    nodePosition: Point,
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

            const {cursorPosition} = action.payload;
            const {grabPosition} = state;
            state.nodePosition = subtractPoints(cursorPosition, grabPosition);
        })
        .addCase(newGateAborted, () => {
            return null;
        })
        .addCase(newGateCreated, () => {
            return null;
        })
);