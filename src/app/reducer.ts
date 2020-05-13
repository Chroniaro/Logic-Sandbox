import {combineReducers} from "redux";
import browser, {State as BrowserState} from "../browser/reducer";
import workbench, {State as WorkbenchState} from "../workbench/reducer";

export interface State {
    browser: BrowserState,
    workbench: WorkbenchState
}

export default combineReducers<State>({
    browser,
    workbench
});