import React from "react";
import {Gate} from "../types";
import {Specification, SpecificationDragItem} from "../../logic/types";
import {useRelativeDropPosition} from "../../app/util";
import GateView from "../../logic/subcomponents/GateView";

interface Props {
    gates: Gate[],

    newGate: (specification: Specification, x: number, y: number) => void
}

const WorkbenchPane: React.FunctionComponent<Props> = ({gates, newGate}) => {
    const [, dropRef] = useRelativeDropPosition<SpecificationDragItem, void, {}>({
        accept: 'specification',

        drop(item, monitor, dropPos) {
            newGate(item.specification, dropPos.x, dropPos.y)
        }
    });

    return (
        <div
            className='workbench'
            ref={dropRef}
        > {
            gates.map(gate => (
                <span
                    style={{
                        position: 'absolute',
                        left: gate.x,
                        top: gate.y
                    }}
                >
                    <GateView
                        key={gate.uuid}
                        specification={gate.specification}
                    />
                </span>

            ))
        } </div>
    );
};

export default WorkbenchPane;