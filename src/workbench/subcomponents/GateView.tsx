import React from "react";
import RowOfTriangles from "./RowOfTriangles";
import {Gate} from "../types";

interface Props {
    gate: Gate;
}

const GateView: React.FunctionComponent<Props> = ({gate}) => {
    return (
        <div
            className='workbench-gate'
            style={{left: gate.x, top: gate.y}}
        >
            <RowOfTriangles styles={['normal', 'selected']}/>

            <div className='specification'>
                {gate.specification.name}
            </div>

            <RowOfTriangles styles={['highlighted', 'normal', 'normal']}/>
        </div>
    );
};

export default GateView;