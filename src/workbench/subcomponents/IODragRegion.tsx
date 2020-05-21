import React, {useCallback} from "react";
import {center, Point, Rectangle} from "../../util/geometry";
import {getTranslateCSSProperty} from "../../util/util";
import {DraggableCore} from "react-draggable";
import {useDispatch} from "react-redux";
import {linkageAborted, linkageStarted} from "../interface";

interface Props {
    region: Rectangle,
    viewPosition: Point
}

const IODragRegion: React.FunctionComponent<Props> = ({region, viewPosition}) => {
    const dispatch = useDispatch();

    const onStart = useCallback(
        () => {
            dispatch(linkageStarted(center(region)))
        },
        [region, dispatch]
    );

    const onStop = useCallback(
        () => {
            dispatch(linkageAborted())
        },
        [dispatch]
    );

    return (
        <DraggableCore
            onStart={onStart}
            onStop={onStop}
        >
            <div
                className='gate-io-region'
                style={{
                    transform: getTranslateCSSProperty(region.x - viewPosition.x, region.y - viewPosition.y),
                    width: region.width,
                    height: region.height
                }}
            />
        </DraggableCore>
    );
};

export default IODragRegion;