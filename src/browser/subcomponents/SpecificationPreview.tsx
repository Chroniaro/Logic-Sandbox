import React, {useMemo} from "react";
import {Specification} from "../../logic/types";
import {getSchematicLayout, SchematicLayout} from "../../schematics/schematic";
import FullSchematic from "../../schematics/FullSchematic";

interface Props {
    specification: Specification;
}

const SpecificationPreview: React.FunctionComponent<Props> = ({specification}) => {
    const previewLayout = useMemo(
        () => getPreviewLayout(specification),
        [specification]
    );

    return (
        <FullSchematic schematicLayout={previewLayout}/>
    );
};

export default SpecificationPreview;

function getPreviewLayout(specification: Specification): SchematicLayout {
    return getSchematicLayout({
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
    });
}