import React from "react";
import FileTree from "./FileTree";
import {v4 as uuid} from "uuid";
import {Gate} from "../../gates/types";

interface Props {
    gates: Gate[],

    newGate: (uuid: string) => {}
}

const BrowserPane: React.FunctionComponent<Props> = ({gates, newGate}) => {
    const handleNewGate = () => newGate(uuid());

    return (
        <div className='browser'>
            <button onClick={handleNewGate}>+</button>
            <FileTree gates={gates} />
        </div>
    );
};

export default BrowserPane;