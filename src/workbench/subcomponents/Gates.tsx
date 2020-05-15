import React from "react";
import {Gate} from "../types";
import AbsolutelyPositionedComponent from "../../app/util/AbsolutelyPositionedComponent";
import LinkableGate from "./LinkableGate";

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
                <LinkableGate gate={gate}/>
            </AbsolutelyPositionedComponent>
        ))
    } </div>
));

export default Gates;