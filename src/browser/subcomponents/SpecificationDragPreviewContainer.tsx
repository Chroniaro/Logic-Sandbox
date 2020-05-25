import React from "react";
import {useSelector} from "react-redux";
import {dragInfoSelector} from "../interface";
import SpecificationDragPreview from "./SpecificationDragPreview";

const SpecificationDragPreviewContainer: React.FunctionComponent = () => {
    const dragInfo = useSelector(dragInfoSelector);

    if (dragInfo === null)
        return null;

    return (
        <SpecificationDragPreview dragInfo={dragInfo}/>
    );
}

export default SpecificationDragPreviewContainer;