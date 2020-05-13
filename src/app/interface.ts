import {State} from "./reducer";

export const browserSelector = (state: State) => state.browser;
export const workbenchSelector = (state: State) => state.workbench;