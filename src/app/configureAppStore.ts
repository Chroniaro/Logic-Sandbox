import {configureStore} from "@reduxjs/toolkit";
import reducer from "./reducer";

export default function configureAppStore(preloadedState: any) {
    return configureStore({
        reducer
    });
}