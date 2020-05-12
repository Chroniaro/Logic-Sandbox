import React from 'react';
import {Provider} from "react-redux";

import './App.css';
import configureAppStore from "./configureAppStore";
import Browser from "../browser/Browser";

const App: React.FunctionComponent = () => {
    const store = configureAppStore(undefined);

    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <Browser />
                    <p>Ready to start!</p>
                </header>
            </div>
        </Provider>
    );
};

export default App;
