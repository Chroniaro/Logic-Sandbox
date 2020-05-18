import React, {CSSProperties} from "react";
import {useDragLayer} from "react-dnd";
import {isSpecificationDragItem} from "../logic/types";
import {Point} from "./util/geometry";
import SpecificationPreview from "../schematics/SpecificationPreview";

function getStyle(position: Point): CSSProperties {
    const translate = `translate(${position.x}px, ${position.y}px)`;

    return ({
        position: 'fixed', // use client coordinates
        zIndex: 100, // the preview you are dragging should be on top of everything
        pointerEvents: 'none', // prevent preview from interfering with drag
        transform: translate, // better performance than using top and left
        WebkitTransform: translate, // who knows if this works on anything other than Chrome, but might as well try
    });
}

function getPreview(item: unknown) {
    if (isSpecificationDragItem(item))
        return <SpecificationPreview specification={item.specification}/>;

    return null;
}

const DragLayer: React.FunctionComponent = () => {
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
        <div style={getStyle(position)} className='refHandle'>
            {preview}
        </div>
    );
};


export default DragLayer;