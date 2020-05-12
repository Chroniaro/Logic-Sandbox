import {combineReducers} from "redux";
import browser, {State as BrowserState} from "../browser/reducer";

export interface State {
    browser: BrowserState
}

export default combineReducers<State>({
    browser
});