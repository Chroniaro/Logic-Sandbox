import React from "react";
import {useSelector} from "react-redux";
import {dragInfoSelector} from "../interface";
import SpecificationPreview from "./SpecificationPreview";
import DragPreview from "../../util/DragPreview";

const SpecificationDragPreview: React.FunctionComponent = () => {
    const dragInfo = useSelector(dragInfoSelector);

    if (dragInfo === null)
        return null;

    return (
        <DragPreview position={dragInfo.nodePosition}>
            <SpecificationPreview
                specification={dragInfo.specification}
            />
        </DragPreview>
    );
}

export default SpecificationDragPreview;