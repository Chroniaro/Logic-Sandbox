import './App.css';

import React from 'react';
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import Backend from "react-dnd-html5-backend";
import configureAppStore from "./configureAppStore";
import Browser from "../browser/Browser";
import Workbench from "../workbench/Workbench";
import DragLayer from "./DragLayer";
import {SchematicRenderContextProvider} from "../schematics/LogicGateSchematic";

const App: React.FunctionComponent = () => {
    const store = configureAppStore(undefined);

    return (
        <DndProvider backend={Backend}>
            <DragLayer/>

            <Provider store={store}>
                <SchematicRenderContextProvider>
                    <div className="app">
                        <div className="work-area">
                            <Browser/>
                            <Workbench/>
                        </div>
                    </div>
                </SchematicRenderContextProvider>
            </Provider>
        </DndProvider>
    );
};

export default App;
