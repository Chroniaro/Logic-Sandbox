import React, {useMemo} from "react";
import {Specification} from "../logic/types";
import LogicGateSchematic from "./LogicGateSchematic";
import Schematic from "./Schematic";
import {StandardGate} from "./StandardGateRenderer";

interface Props {
    specification: Specification;
}

const SpecificationPreview: React.FunctionComponent<Props> = ({specification}) => {
    // prevent unnecessary re-renders
    const preview = useMemo(
        () => getPreviewSchematic(specification),
        [specification]
    );

    return (
        <LogicGateSchematic schematic={preview}/>
    );
};

export default SpecificationPreview;

function getPreviewSchematic(specification: Specification): Schematic {
    const previewGate: StandardGate = {
        type: "standard",
        position: {x: 0, y: 0},
        data: {
            name: specification.name,
            numInputs: 3,
            numOutputs: 2,
        }
    };

    return {
        gates: {
            'this uuid could be anything': previewGate,
        },
        linkages: []
    };
}