import {Specification} from "../../logic/types";
import {useMemo} from "react";
import {getSchematicLayout} from "../../schematics/schematic";

export default function useSpecificationPreviewLayout(specification: Specification) {
    return useMemo(
        () => getSchematicLayout({
            gates: [
                {
                    type: 'standard',
                    data: {
                        uuid: 'preview',
                        position: {x: 0, y: 0},
                        name: specification.name,
                        numInputs: 3,
                        numOutputs: 2,
                    }
                }
            ],
            linkages: []
        }),
        [specification]
    );
}