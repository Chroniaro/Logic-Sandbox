import './App.css';

import React from 'react';
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import Backend from "react-dnd-html5-backend";
import configureAppStore from "./configureAppStore";
import Browser from "../browser/Browser";
import Workbench from "../workbench/Workbench";

const App: React.FunctionComponent = () => {
    const store = configureAppStore(undefined);

    return (
        <DndProvider backend={Backend}>
            <Provider store={store}>
                <div className="app">
                    <div className="work-area">
                        <Browser/>
                        <Workbench/>
                    </div>
                </div>
            </Provider>
        </DndProvider>
    );
};

export default App;
