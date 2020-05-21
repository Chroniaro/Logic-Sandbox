import React, {MouseEventHandler, useCallback, useRef, useState} from "react";
import SchematicViewport from "../schematics/SchematicViewport";
import {useDispatch, useSelector} from "react-redux";
import {mousePositionOverCanvasChanged, schematicLayoutSelector} from "./interface";
import {Point, subtractPoints} from "../app/util/geometry";
import GateIO from "./subcomponents/GateIO";
import {DraggableCore, DraggableEventHandler} from "react-draggable";

const WorkbenchPane: React.FunctionComponent = () => {
    const [viewPosition, onViewDrag] = useDraggableViewPosition();

    const positionRef = useRef<HTMLDivElement>(null);

    const [onMouseOver, onMouseMove, onMouseOut] = useTrackMouseOverCanvas(viewPosition);

    const schematicLayout = useSelector(schematicLayoutSelector);

    return (
        <div className='workbench'>
            <DraggableCore
                onDrag={onViewDrag}
            >
                <div
                    className='gates refHandle'
                    ref={positionRef}
                    onMouseOver={onMouseOver}
                    onMouseMove={onMouseMove}
                    onMouseOut={onMouseOut}
                >
                    <SchematicViewport
                        schematicLayout={schematicLayout}
                        viewPosition={viewPosition}
                    > {
                        Object.entries(schematicLayout.gateLayouts).map(
                            ([uuid, gateLayout]) => (
                                <GateIO
                                    key={uuid}
                                    gateLayout={gateLayout}
                                    viewPosition={viewPosition}
                                />
                            )
                        )
                    } </SchematicViewport>
                </div>
            </DraggableCore>
        </div>
    );
};

export default WorkbenchPane;

function useDraggableViewPosition(): [Point, DraggableEventHandler] {
    const [viewPosition, setViewPosition] = useState({x: 0, y: 0});

    const onViewDrag: DraggableEventHandler = useCallback(
        (event, data) => {
            setViewPosition(
                oldViewPosition =>
                    subtractPoints(
                        oldViewPosition,
                        {
                            x: data.deltaX,
                            y: data.deltaY,
                        }
                    )
            );
        },
        []
    );

    return [viewPosition, onViewDrag];
}

function useTrackMouseOverCanvas(viewPosition: Point) {
    const dispatch = useDispatch();

    const onMouseOver: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            const positionOverCanvas = {
                x: event.clientX - event.currentTarget.offsetLeft + viewPosition.x,
                y: event.clientY - event.currentTarget.offsetTop + viewPosition.y,
            };

            dispatch(mousePositionOverCanvasChanged(positionOverCanvas));
        },
        [dispatch, viewPosition]
    );

    const onMouseMove = onMouseOver;

    const onMouseOut = useCallback(
        () => {
            dispatch(mousePositionOverCanvasChanged(null));
        },
        [dispatch]
    )

    return [onMouseOver, onMouseMove, onMouseOut];
}