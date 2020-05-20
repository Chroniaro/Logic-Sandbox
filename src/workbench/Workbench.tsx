import React, {useCallback, useRef} from "react";
import SchematicViewport from "../schematics/SchematicViewport";
import {useDispatch, useSelector} from "react-redux";
import {newGate, schematicLayoutSelector, viewDragged, viewPositionSelector} from "./interface";
import {useDrop} from "react-dnd";
import {SpecificationDragItem} from "../logic/types";
import {nullCheck} from "../app/util/util";
import {Point, subtractPoints} from "../app/util/geometry";
import IODragRegion from "./IODragRegion";

const WorkbenchPane: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const viewPosition = useSelector(viewPositionSelector);
    const schematicLayout = useSelector(schematicLayoutSelector);

    const positionRef = useRef<HTMLDivElement>(null);
    const [, dropRef] = useDrop({
        accept: 'specification',

        drop(item, monitor) {
            const positionDiv = nullCheck(positionRef.current, "Position ref was null.");
            const position: Point = positionDiv.getBoundingClientRect();
            const clientDropPos = nullCheck(monitor.getSourceClientOffset(), "Drop position was null.");
            const dropPos = subtractPoints(clientDropPos, position);
            dispatch(newGate(
                (item as SpecificationDragItem).specification,
                dropPos.x + viewPosition.x,
                dropPos.y + viewPosition.y,
            ));
        }
    });

    const onViewMove = useCallback(
        delta => dispatch(viewDragged(delta)),
        [dispatch]
    );

    return (
        <div
            className='workbench'
            ref={dropRef}
        >
            <div
                className='gates refHandle'
                ref={positionRef}
            >
                <SchematicViewport schematicLayout={schematicLayout} viewPosition={viewPosition}
                                   onViewMove={onViewMove}>
                    {
                        schematicLayout.gateLayouts.map(
                            gateLayout => (
                                <>
                                    {
                                        gateLayout.data.inputs.map(
                                            region => <IODragRegion region={region} viewPosition={viewPosition}/>
                                        )
                                    }
                                    {
                                        gateLayout.data.outputs.map(
                                            region => <IODragRegion region={region} viewPosition={viewPosition}/>
                                        )
                                    }
                                </>
                            )
                        )
                    }
                </SchematicViewport>

            </div>
        </div>
    );
};

export default WorkbenchPane;