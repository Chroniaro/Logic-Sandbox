import React from "react";
import {Gate} from "../types";
import AbsolutelyPositionedComponent from "../../app/util/AbsolutelyPositionedComponent";
import GateView from "./GateView";

interface Props {
    gates: Gate[];
}

const Gates = React.forwardRef<HTMLDivElement, Props>(({gates}, forwardRef) => (
    <div className='gates' ref={forwardRef}> {
        gates.map(gate => (
            <AbsolutelyPositionedComponent
                key={gate.uuid}
                x={gate.x}
                y={gate.y}
            >
                <GateView gate={gate}/>
            </AbsolutelyPositionedComponent>
        ))
    } </div>
));

export default Gates;