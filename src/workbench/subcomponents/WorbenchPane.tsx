import React from "react";
import {Gate} from "../types";
import {Specification, SpecificationDragItem} from "../../logic/types";
import LinkageDragLayer from "./LinkageDragLayer";
import {DropTargetHookSpec, useDrop} from "react-dnd";
import Gates from "./Gates";
import {CoordinateConverter, useRelativeCoordinateFrame} from "../../app/util/useRelativeCoordinateFrame";

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

    return (
        <div
            className='workbench'
            ref={dropConnector}
        >
            <LinkageDragLayer relativeCoordinates={relativeCoordinates}/>
            <Gates gates={gates} ref={coordinateConnector}/>
        </div>
    );
};

export default WorkbenchPane;