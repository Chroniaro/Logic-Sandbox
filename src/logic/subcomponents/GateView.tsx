import "./Gate.css";

import React from "react";
import {Specification} from "../types";
import GateIO from "./GateIO";

interface Props {
    specification: Specification
}

const GateView = React.forwardRef<HTMLDivElement, Props>(({specification}, forwardRef) => (
    <div className="gate" ref={forwardRef}>
        <div className="gate-outputs">
            <GateIO ioType='output'/>
            <GateIO ioType='output'/>
        </div>

        <div className="gate-body">
            {specification.name}
        </div>

        <div className="gate-inputs">
            <GateIO ioType='input'/>
            <GateIO ioType='input'/>
            <GateIO ioType='input'/>
        </div>
    </div>
));

export default GateView;