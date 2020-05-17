import Schematic from "../schematics/Schematic";
import {StandardGate} from "../schematics/StandardGateRenderer";
import {Specification} from "./types";

export function getPreviewSchematic(specification: Specification): Schematic {
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
            'preview': previewGate,
        },
        linkages: []
    };
}