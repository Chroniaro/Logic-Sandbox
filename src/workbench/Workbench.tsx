import React from "react";
import SchematicLayoutView from "../schematics/SchematicLayoutView";
import {useDispatch, useSelector} from "react-redux";
import {newGate, schematicLayoutSelector} from "./interface";
import {useRelativeCoordinateFrame} from "../app/util/useRelativeCoordinateFrame";
import {useDrop} from "react-dnd";
import {SpecificationDragItem} from "../logic/types";

const WorkbenchPane: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const schematicLayout = useSelector(schematicLayoutSelector);

    const [coordinateFrameRef, componentCoordinateConverter] = useRelativeCoordinateFrame<HTMLDivElement>();

    const [, dropRef] = useDrop<SpecificationDragItem, void, {}>({
        accept: 'specification',
        drop(item, monitor) {
            const clientPosition = monitor.getSourceClientOffset();
            if (clientPosition === null)
                throw Error("Drop location was null.");

            const componentPosition = componentCoordinateConverter(clientPosition);

            dispatch(newGate(
                item.specification,
                componentPosition.x + schematicLayout.outerBoundary.x,
                componentPosition.y + schematicLayout.outerBoundary.y,
            ));
        }
    });

    return (
        <div
            className='workbench'
            ref={dropRef}
        >
            <div
                className='refHandle'
                ref={coordinateFrameRef}
            >
                <SchematicLayoutView schematicLayout={schematicLayout}/>
            </div>
        </div>
    );
};

export default WorkbenchPane;