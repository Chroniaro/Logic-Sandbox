import {createReducer} from "@reduxjs/toolkit";
import {mousePositionOverCanvasChanged} from "./interface";
import {WorkbenchGate, WorkbenchLinkage} from "./types";
import {Point, subtractPoints} from "../util/geometry";
import {newGateDropped} from "../browser/interface";

export interface State {
    mousePositionOverCanvas: Point | null,
    linkagePreview: WorkbenchLinkage | null,
    gates: WorkbenchGate[]
}

const initialState: State = {
    mousePositionOverCanvas: null,
    linkagePreview: null,
    gates: []
};

export default createReducer<State>(
    initialState,
    builder => builder
        .addCase(mousePositionOverCanvasChanged, (state, action) => {
            state.mousePositionOverCanvas = action.payload;
        })
        .addCase(newGateDropped, (state, action) => {
            const mousePositionOverCanvas = state.mousePositionOverCanvas;
            if (mousePositionOverCanvas !== null) {
                const {uuid, specification, grabPosition} = action.payload;
                const position = subtractPoints(mousePositionOverCanvas, grabPosition);

                state.gates.push({
                    uuid,
                    specification,
                    position,
                });
            }
        })
);