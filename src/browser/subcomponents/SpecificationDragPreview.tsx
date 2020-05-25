import React from "react";
import DragPreview from "../../util/DragPreview";
import {DragInformation} from "../reducers/dragInfo";
import useSpecificationPreviewLayout from "./useSpecificationPreviewLayout";
import FullSchematic from "../../schematics/FullSchematic";

interface Props {
    dragInfo: DragInformation
}

const SpecificationDragPreview: React.FunctionComponent<Props> = ({dragInfo}) => {
    const previewLayout = useSpecificationPreviewLayout(dragInfo.specification);

    return (
        <DragPreview position={dragInfo.nodePosition}>
            <FullSchematic
                schematicLayout={previewLayout}
            />
        </DragPreview>
    );
}

export default SpecificationDragPreview;