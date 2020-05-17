import React from "react";
import {Gate} from "../types";
import {Specification} from "../../logic/types";
import SchematicLayoutView from "../../schematics/SchematicLayoutView";
import {StandardGate} from "../../schematics/standardGate";
import {getSchematicLayout, Schematic} from "../../schematics/schematic";

type NewGateActionCreator = (specification: Specification, x: number, y: number) => void;

interface Props {
    gates: Gate[],

    newGate: NewGateActionCreator
}

const firstGate: StandardGate = {
    type: 'standard',
    data: {
        position: {x: 0, y: 0},
        name: 'My Gate',
        numInputs: 3,
        numOutputs: 2
    }
};

const secondGate: StandardGate = {
    type: 'standard',
    data: {
        position: {x: 500, y: 50},
        name: 'WWWWWWWWW',
        numInputs: 3,
        numOutputs: 2
    }
};

const schematic: Schematic = {
    gates: {
        '0': firstGate,
        '1': secondGate
    },
    linkages: []
};

const schematicLayout = getSchematicLayout(schematic);

const WorkbenchPane: React.FunctionComponent<Props> = () => {
    return (
        <div
            className='workbench'
        >
            <div style={{width: '100%'}}>
                <SchematicLayoutView schematicLayout={schematicLayout}/>
            </div>
        </div>
    );
};

export default WorkbenchPane;