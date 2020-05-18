import React, {useMemo} from "react";
import {Specification} from "../logic/types";
import SchematicLayoutView from "./SchematicLayoutView";
import {getSchematicLayout, Schematic} from "./schematic";

interface Props {
    specification: Specification;
}

const SpecificationPreview: React.FunctionComponent<Props> = ({specification}) => {
    // prevent unnecessary re-renders
    const previewLayout = useMemo(
        () => getSchematicLayout(
            getPreviewSchematic(specification)
        ),
        [specification]
    );

    return (
        <SchematicLayoutView schematicLayout={previewLayout}/>
    );
};

export default SpecificationPreview;

function getPreviewSchematic(specification: Specification): Schematic {
    return {
        gates: [
            {
                type: "standard",
                data: {
                    position: {x: 0, y: 0},
                    name: specification.name,
                    numInputs: 3,
                    numOutputs: 2,
                }
            }
        ],
        linkages: []
    };
}