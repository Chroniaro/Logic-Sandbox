import "../../logic/subcomponents/Gate.css"

import React from "react";
import {Gate} from "../types";
import LinkableGateIO from "./LinkableGateIO";

interface Props {
    gate: Gate
}

const LinkableGate: React.FunctionComponent<Props> = ({gate}) => (
    <div className="gate">
        <div className="gate-outputs">
            <LinkableGateIO ioType='output'/>
            <LinkableGateIO ioType='output'/>
        </div>

        <div className="gate-body">
            {gate.specification.name}
        </div>

        <div className="gate-inputs">
            <LinkableGateIO ioType='input'/>
            <LinkableGateIO ioType='input'/>
            <LinkableGateIO ioType='input'/>
        </div>
    </div>
);

export default LinkableGate;