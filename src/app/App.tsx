import './App.css';

import React from 'react';
import {Provider} from "react-redux";
import configureAppStore from "./configureAppStore";
import Browser from "../browser/Browser";
import Workbench from "../workbench/Workbench";

const App: React.FunctionComponent = () => {
    const store = configureAppStore(undefined);

    return (
        <Provider store={store}>
            <div className="app">
                <div className="work-area">
                    <Browser/>
                    <Workbench/>
                </div>
            </div>
        </Provider>
    );
};

export default App;
