import React from "react";
import FileTree from "./FileTree";
import {v4 as uuid} from "uuid";
import {Specification} from "../../logic/types";

interface Props {
    specifications: Specification[],

    newSpecification: (uuid: string) => {}
}

const BrowserPane: React.FunctionComponent<Props> = ({specifications, newSpecification}) => {
    const handleNewGate = () => newSpecification(uuid());

    return (
        <div className='browser'>
            <button onClick={handleNewGate}>+</button>
            <FileTree specifications={specifications} />
        </div>
    );
};

export default BrowserPane;