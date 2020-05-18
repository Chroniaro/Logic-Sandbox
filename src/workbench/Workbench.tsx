import React, {useRef} from "react";
import SchematicViewport from "../schematics/SchematicViewport";
import {useDispatch, useSelector} from "react-redux";
import {newGate, schematicLayoutSelector} from "./interface";
import {useDrop} from "react-dnd";
import {SpecificationDragItem} from "../logic/types";
import {nullCheck} from "../app/util/util";
import {center, Rectangle, subtractPoints} from "../app/util/geometry";

const WorkbenchPane: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const schematicLayout = useSelector(schematicLayoutSelector);

    const positionRef = useRef<HTMLDivElement>(null);
    const [, dropRef] = useDrop<SpecificationDragItem, void, {}>({
        accept: 'specification',
        drop(item, monitor) {
            const positionDiv = nullCheck(positionRef.current, "Position ref was null.");
            const clientRect: Rectangle = positionDiv.getBoundingClientRect();
            const canvasCenter = center(clientRect);
            const clientDropPos = nullCheck(monitor.getSourceClientOffset(), "Drop position was null.");
            const dropPos = subtractPoints(clientDropPos, canvasCenter);
            dispatch(newGate(
                item.specification,
                dropPos.x,
                dropPos.y,
            ));
        }
    });

    return (
        <div
            className='workbench'
            ref={dropRef}
        >
            <div
                className='gates refHandle'
                ref={positionRef}
            >
                <SchematicViewport schematicLayout={schematicLayout} centerOfView={{x: 0, y: 0}}/>
            </div>
        </div>
    );
};

export default WorkbenchPane;