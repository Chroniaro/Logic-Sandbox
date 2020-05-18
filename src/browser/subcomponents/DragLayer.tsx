import React from "react";
import {useDragLayer} from "react-dnd";
import {isSpecificationDragItem} from "../../logic/types";
import SpecificationPreview from "./SpecificationPreview";
import {getTranslateCSSProperty} from "../../app/util/util";

function getPreview(item: unknown) {
    if (isSpecificationDragItem(item))
        return <SpecificationPreview specification={item.specification}/>;

    return null;
}

function getTranslateCSS(x: number, y: number) {
    const translate = getTranslateCSSProperty(x, y);
    return {
        transform: translate
    }
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
        <div style={getTranslateCSS(position.x, position.y)} className='refHandle dragLayer'>
            {preview}
        </div>
    );
};


export default DragLayer;