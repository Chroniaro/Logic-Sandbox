import React, {CSSProperties} from "react";
import {useDragLayer, XYCoord} from "react-dnd";
import GatePreview from "../logic/subcomponents/GatePreview";
import {isSpecificationDragItem} from "../logic/types";

function getStyle(position: XYCoord): CSSProperties {
    const translate = `translate(${position.x}px, ${position.y}px)`;

    return ({
        position: 'fixed', // use client coordinates
        zIndex: 100, // make preview appear on top of the workbench
        pointerEvents: 'none', // prevent preview from interfering with drag
        transform: translate, // better performance than using top and left
        WebkitTransform: translate // who knows if this works on anything other than Chrome, but might as well try
    });
}

function getPreview(item: unknown) {
    if (isSpecificationDragItem(item))
        return <GatePreview specification={item.specification}/>;

    return null;
}

const DragLayer: React.FunctionComponent<{}> = () => {
    const {
        item,
        position
    } = useDragLayer(
        monitor => ({
            item: monitor.getItem(),
            position: monitor.getSourceClientOffset()
        })
    );

    if (position == null)
        return null;

    const preview = getPreview(item);
    if (preview === null)
        return null;

    return (
        <span style={getStyle(position)}>
            {preview}
        </span>
    );
};


export default DragLayer;