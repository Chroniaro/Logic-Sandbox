import {GateRenderer} from "./SchematicRenderContext";
import {GateWithType} from "./Schematic";
import {Rectangle} from "../app/util/types";

const standardGateType = 'standard';

export interface StandardGateData {
    name: string;
    numInputs: number;
    numOutputs: number;
}

export type StandardGate = GateWithType<typeof standardGateType, StandardGateData>;

function isStandardGate(gate: GateWithType<typeof standardGateType, Partial<StandardGateData>>): gate is StandardGate {
    console.log("Checking gate: ", gate);

    if (typeof (gate.data.numInputs) !== 'number')
        return false;

    if (typeof (gate.data.numOutputs) !== 'number')
        return false;

    return true;
}

export default class StandardGateRenderer implements GateRenderer<typeof standardGateType> {
    render(gate: GateWithType<typeof standardGateType, any>, graphics: CanvasRenderingContext2D): Rectangle {
        if (!isStandardGate(gate))
            throw Error("Gates with the standard type must conform to the StandardGate interface.");

        graphics.fillRect(gate.location.x, gate.location.y, 20, 20);

        return {
            position: gate.location,
            width: 20,
            height: 20
        };
    }
}