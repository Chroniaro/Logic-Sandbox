import React, {useCallback, useRef} from "react";
import {Specification} from "../../logic/types";
import SpecificationPreview from "./SpecificationPreview";
import {DraggableCore, DraggableEventHandler} from "react-draggable";
import {useDispatch} from "react-redux";
import {newGateDragged, newGateDragStart, newGateDropped} from "../interface";
import {Point, subtractPoints} from "../../app/util/geometry";

interface Props {
    specification: Specification
}

const SpecificationCard: React.FunctionComponent<Props> = ({specification}) => {
    const dispatch = useDispatch();

    const grabPositionRef = useRef<Point>({x: 0, y: 0});

    const onStart: DraggableEventHandler = useCallback(
        (event, data) => {
            const clientPosition: Point = {
                x: data.x,
                y: data.y,
            };

            const nodePosition = {
                x: data.node.offsetLeft,
                y: data.node.offsetTop,
            };

            grabPositionRef.current = subtractPoints(clientPosition, nodePosition);

            dispatch(newGateDragStart(
                specification,
                nodePosition
            ));
        },
        [dispatch, specification]
    );

    const onDrag: DraggableEventHandler = useCallback(
        (event, data) => {
            const clientPosition = {
                x: data.x,
                y: data.y,
            };

            const nodePosition = subtractPoints(clientPosition, grabPositionRef.current);

            dispatch(newGateDragged(nodePosition))
        },
        [dispatch]
    );

    const onStop: DraggableEventHandler = useCallback(
        () => {
            dispatch(newGateDropped(
                specification,
                grabPositionRef.current
            ));
        },
        [dispatch, specification]
    );

    return (
        <div
            className='browser-specification-card'
        >
            <div>{specification.name}</div>
            <DraggableCore
                onStart={onStart}
                onDrag={onDrag}
                onStop={onStop}
            >
                <div className='refHandle'>
                    <SpecificationPreview specification={specification}/>
                </div>
            </DraggableCore>

        </div>
    );
};

export default SpecificationCard;