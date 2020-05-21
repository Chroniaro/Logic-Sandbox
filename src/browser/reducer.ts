import specifications, {State as SpecificationsState} from "./reducers/specifications";
import drag, {State as DragState} from "./reducers/drag";
import {combineReducers} from "redux";

export interface State {
    specifications: SpecificationsState,
    drag: DragState,
}

export default combineReducers({
    specifications,
    drag,
});