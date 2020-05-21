import React, {MouseEventHandler, useCallback, useState} from "react";
import SchematicViewport from "../schematics/SchematicViewport";
import {useDispatch, useSelector} from "react-redux";
import {mousePositionOverCanvasChanged, schematicLayoutSelector} from "./interface";
import {Point, subtractPoints} from "../util/geometry";
import GateIO from "./subcomponents/GateIO";
import {DraggableCore, DraggableEventHandler} from "react-draggable";

const WorkbenchPane: React.FunctionComponent = () => {
    const [viewPosition, onViewDrag] = useDraggableViewPosition();
    const [onMouseMove, onMouseOut] = useTrackMouseOverCanvas(viewPosition);
    const schematicLayout = useSelector(schematicLayoutSelector);

    return (
        <div className='workbench'>
            <DraggableCore
                onDrag={onViewDrag}
                cancel='.gate-io-region'
            >
                <div
                    className='gates refHandle'
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

function useTrackMouseOverCanvas(viewPosition: Point): [MouseEventHandler<HTMLElement>, MouseEventHandler<HTMLElement>] {
    const dispatch = useDispatch();

    const onMouseMove: MouseEventHandler<HTMLElement> = useCallback(
        (event) => {
            const positionOverCanvas = {
                x: event.clientX - event.currentTarget.offsetLeft + viewPosition.x,
                y: event.clientY - event.currentTarget.offsetTop + viewPosition.y,
            };

            dispatch(mousePositionOverCanvasChanged(positionOverCanvas));
        },
        [dispatch, viewPosition]
    );

    const onMouseOut: MouseEventHandler<HTMLElement> = useCallback(
        () => {
            dispatch(mousePositionOverCanvasChanged(null));
        },
        [dispatch]
    )

    return [onMouseMove, onMouseOut];
}