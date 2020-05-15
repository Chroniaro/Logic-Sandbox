import React from "react";
import {useDragLayer} from "react-dnd";
import {LinkageDragType} from "../types";
import Linkage from "./Linkage";
import {CoordinateConverter} from "../../app/util/useRelativeCoordinateFrame";

interface Props {
    relativeCoordinates: CoordinateConverter;
}

const LinkageDragLayer: React.FunctionComponent<Props> = ({relativeCoordinates}) => {
    const {
        itemType,
        initialPosition,
        currentPosition
    } = useDragLayer(
        monitor => ({
            itemType: monitor.getItemType(),
            initialPosition: monitor.getInitialClientOffset(),
            currentPosition: monitor.getClientOffset()
        })
    );

    if (initialPosition === null || currentPosition === null)
        return null;

    if (itemType !== LinkageDragType)
        return null;

    const relativeInitialPosition = relativeCoordinates(initialPosition);
    const relativeCurrentPosition = relativeCoordinates(currentPosition);

    if (relativeInitialPosition === null || relativeCurrentPosition === null)
        return null;

    return (
        <Linkage
            x1={relativeInitialPosition.x}
            y1={relativeInitialPosition.y}
            x2={relativeCurrentPosition.x}
            y2={relativeCurrentPosition.y}
        />
    );
};

export default LinkageDragLayer;