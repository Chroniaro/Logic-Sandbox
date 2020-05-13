import React from "react";
import FileTree from "./FileTree";
import {Specification} from "../../logic/types";

interface Props {
    specifications: Specification[],

    newSpecification: () => {}
}

const BrowserPane: React.FunctionComponent<Props> = ({specifications, newSpecification}) => {
    return (
        <div className='browser'>
            <button onClick={newSpecification}>+</button>
            <FileTree specifications={specifications}/>
        </div>
    );
};

export default BrowserPane;