import React, {MouseEvent} from "react";
import {Gate} from "../types";
import {Specification} from "../../logic/types";

interface Props {
    gates: Gate[],
    newGateSpec: Specification | undefined,

    newGate: (specification: Specification, x: number, y: number) => {}
}

const WorkbenchPane: React.FunctionComponent<Props> = ({gates, newGateSpec, newGate}) => {
    const handleOnClick = (event: MouseEvent) => {
        console.log(newGateSpec);

        if (newGateSpec)
            newGate(
                newGateSpec,
                event.screenX,
                event.screenY
            )
    };

    return (
        <div className='workbench' onClick={handleOnClick}> {
            gates.map(gate => (
                <div
                    className='workbench-gate'
                    key={gate.uuid}
                    style={{left: gate.x, top: gate.y}}
                > {
                    gate.specification.name
                } </div>
            ))
        } </div>
    );
};

export default WorkbenchPane;