import specifications, {State as SpecificationsState} from "./reducers/specifications";
import dragInfo, {State as DragState} from "./reducers/dragInfo";
import {combineReducers} from "redux";

export interface State {
    specifications: SpecificationsState,
    dragInfo: DragState,
}

export default combineReducers({
    specifications,
    dragInfo,
});