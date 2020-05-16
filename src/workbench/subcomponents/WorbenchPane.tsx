import React from "react";
import {Gate} from "../types";
import {Specification, SpecificationDragItem} from "../../logic/types";
import {DropTargetHookSpec, useDrop} from "react-dnd";
import {CoordinateConverter, useRelativeCoordinateFrame} from "../../app/util/useRelativeCoordinateFrame";
import LogicGateSchematic from "../../schematics/LogicGateSchematic";
import {StandardGate} from "../../schematics/StandardGateRenderer";

type NewGateActionCreator = (specification: Specification, x: number, y: number) => void;

interface Props {
    gates: Gate[],

    newGate: NewGateActionCreator
}

function getDropConnectorSpec(newGate: NewGateActionCreator, coordinateConverter: CoordinateConverter) {
    const spec: DropTargetHookSpec<SpecificationDragItem, void, {}> = {
        accept: 'specification',

        drop(item, monitor) {
            const dropPosition = monitor.getSourceClientOffset();
            if (dropPosition === null)
                throw Error("Null drop position");

            const relativeDropPosition = coordinateConverter(dropPosition);
            if (relativeDropPosition === null)
                throw Error("Drop when element not mounted");

            newGate(item.specification, relativeDropPosition.x, relativeDropPosition.y);
        }
    };

    return spec;
}

const WorkbenchPane: React.FunctionComponent<Props> = ({gates, newGate}) => {
    const [coordinateConnector, relativeCoordinates] = useRelativeCoordinateFrame<HTMLDivElement>();
    const dropSpec = getDropConnectorSpec(newGate, relativeCoordinates);
    const [, dropConnector] = useDrop(dropSpec);

    const firstGate: StandardGate = {
        type: 'standard',
        location: {x: 0, y: 0},
        data: {
            name: 'My Gate',
            numInputs: 3,
            numOutputs: 2
        }
    };

    const secondGate: StandardGate = {
        type: 'standard',
        location: {x: 30, y: 50},
        data: {
            name: 'My Other Gate',
            numInputs: 3,
            numOutputs: 2
        }
    };

    const linkage = {
        type: 'standard',
        from: {
            gateId: '0',
            positionOnGate: {x: 5, y: 5}
        },
        to: {
            gateId: '1',
            positionOnGate: {x: 5, y: 5}
        }
    };

    return (
        <div
            className='workbench'
            ref={dropConnector}
        >
            <LogicGateSchematic
                schematic={{
                    gates: {
                        '0': firstGate,
                        '1': secondGate
                    },
                    linkages: [
                        linkage
                    ]
                }}
            />
        </div>
    );
};

export default WorkbenchPane;