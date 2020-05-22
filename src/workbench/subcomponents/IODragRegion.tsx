import React, {useCallback} from "react";
import {center, Point, Rectangle} from "../../util/geometry";
import {getTranslateCSSProperty} from "../../util/util";
import {DraggableCore} from "react-draggable";
import {useDispatch, useSelector} from "react-redux";
import {linkageAborted, linkageStarted, linkageTargetChanged, linkageToSelector, newLinkage} from "../interface";

interface Props {
    region: Rectangle,
    viewPosition: Point
}

const IODragRegion: React.FunctionComponent<Props> = ({region, viewPosition}) => {
    const dispatch = useDispatch();
    const linkageTo = useSelector(linkageToSelector);

    const onStart = useCallback(
        () => {
            dispatch(linkageStarted(center(region)));
        },
        [region, dispatch]
    );

    const onStop = useCallback(
        () => {
            if (linkageTo === null)
                dispatch(linkageAborted());
            else
                dispatch(newLinkage(center(region), linkageTo));
        },
        [dispatch, region, linkageTo]
    );

    const onMouseOver = useCallback(
        () => {
            dispatch(linkageTargetChanged(center(region)));
        },
        [dispatch, region]
    )

    const onMouseOut = useCallback(
        () => {
            dispatch(linkageTargetChanged(null));
        },
        [dispatch]
    )

    return (
        <DraggableCore
            onStart={onStart}
            onStop={onStop}
        >
            <div
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
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