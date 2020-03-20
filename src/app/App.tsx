import React from 'react';
import {Provider} from "react-redux";

import './App.css';
import configureAppStore from "./configureAppStore";

function App() {
    const store = configureAppStore(undefined);

    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <p>Ready to start!</p>
                </header>
            </div>
        </Provider>
    );
}

export default App;
