import React from "react";
import {Point, Rectangle} from "../../util/geometry";
import {getTranslateCSSProperty} from "../../util/util";

interface Props {
    region: Rectangle,
    viewPosition: Point
}

const IODragRegion: React.FunctionComponent<Props> = ({region, viewPosition}) => {
    return (
        <div
            style={{
                transform: getTranslateCSSProperty(region.x - viewPosition.x, region.y - viewPosition.y),
                width: region.width,
                height: region.height
            }}
        />
    );
};

export default IODragRegion;