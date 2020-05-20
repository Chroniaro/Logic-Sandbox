import React from "react";
import {useDrag} from "react-dnd";
import {Point, Rectangle} from "../app/util/geometry";
import {getTranslateCSSProperty} from "../app/util/util";

interface Props {
    region: Rectangle,
    viewPosition: Point
}

const IODragRegion: React.FunctionComponent<Props> = ({region, viewPosition}) => {
    const [, dragConnector] = useDrag({
        item: {
            type: 'gate-io'
        }
    });

    return (
        <div
            ref={dragConnector}
            style={{
                transform: getTranslateCSSProperty(region.x - viewPosition.x, region.y - viewPosition.y),
                width: region.width,
                height: region.height
            }}
        />
    );
};

export default IODragRegion;