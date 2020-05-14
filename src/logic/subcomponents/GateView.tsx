import "./GateView.css";

import React from "react";
import RowOfTriangles from "./RowOfTriangles";
import {Specification} from "../types";

interface Props {
    specification: Specification;
}

type Ref = HTMLDivElement;
const GateView = React.forwardRef<Ref, Props>(
    ({specification}, forwardRef) => (
        <div
            className='gate-view'
            ref={forwardRef}
        >
            <RowOfTriangles styles={['normal', 'selected']}/>

            <div className='specification'>
                {specification.name}
            </div>

            <RowOfTriangles styles={['highlighted', 'normal', 'normal']}/>
        </div>
    )
);

export default GateView;