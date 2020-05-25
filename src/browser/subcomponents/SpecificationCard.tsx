import React, {useCallback} from "react";
import {Specification} from "../../logic/types";
import {DraggableCore, DraggableEventHandler} from "react-draggable";
import {useDispatch, useSelector} from "react-redux";
import {newGateAborted, newGateCreated, newGateDragged, newGateDragStart} from "../interface";
import {Point, subtractPoints} from "../../util/geometry";
import {newGateStatusSelector} from "../../workbench/interface";
import useSpecificationPreviewLayout from "./useSpecificationPreviewLayout";
import FullSchematic from "../../schematics/FullSchematic";

interface Props {
    specification: Specification
}

const SpecificationCard: React.FunctionComponent<Props> = ({specification}) => {
    const previewLayout = useSpecificationPreviewLayout(specification);
    const [onStart, onDrag, onStop] = useGateDragEvents(specification);

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
                    <FullSchematic schematicLayout={previewLayout}/>
                </div>
            </DraggableCore>
        </div>
    );
};

export default SpecificationCard;

function useGateDragEvents(specification: Specification) {
    const dispatch = useDispatch();

    const newGateStatus = useSelector(newGateStatusSelector);

    const onStart: DraggableEventHandler = useCallback(
        (event, data) => {
            const cursorPosition: Point = {x: data.x, y: data.y};
            const nodePosition = {x: data.node.offsetLeft, y: data.node.offsetTop};
            const grabPosition = subtractPoints(cursorPosition, nodePosition);

            dispatch(newGateDragStart(
                specification,
                grabPosition,
                nodePosition
            ));
        },
        [dispatch, specification]
    );

    const onDrag: DraggableEventHandler = useCallback(
        (event, data) => {
            const {x, y} = data;
            dispatch(newGateDragged({x, y}))
        },
        [dispatch]
    );

    const onStop: DraggableEventHandler = useCallback(
        () => {
            if (newGateStatus.accept) {
                dispatch(
                    newGateCreated(
                        specification,
                        newGateStatus.position
                    )
                )
            } else
                dispatch(newGateAborted())
        },
        [dispatch, specification, newGateStatus]
    );

    return [onStart, onDrag, onStop];
}