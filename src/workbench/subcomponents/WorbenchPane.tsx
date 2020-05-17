import React from "react";
import {Gate} from "../types";
import {Specification} from "../../logic/types";
import LogicGateSchematic from "../../schematics/LogicGateSchematic";
import {StandardGate} from "../../schematics/StandardGateRenderer";

type NewGateActionCreator = (specification: Specification, x: number, y: number) => void;

interface Props {
    gates: Gate[],

    newGate: NewGateActionCreator
}

const WorkbenchPane: React.FunctionComponent<Props> = () => {
    const firstGate: StandardGate = {
        type: 'standard',
        position: {x: 0, y: 0},
        data: {
            name: 'My Gate',
            numInputs: 3,
            numOutputs: 2
        }
    };

    const secondGate: StandardGate = {
        type: 'standard',
        position: {x: 500, y: 50},
        data: {
            name: 'WWWWWWWWW',
            numInputs: 3,
            numOutputs: 2
        }
    };

    return (
        <div
            className='workbench'
        >
            <div style={{width: '100%'}}>
                <LogicGateSchematic
                    schematic={{
                        gates: {
                            '0': firstGate,
                            '1': secondGate
                        },
                        linkages: []
                    }}
                />
            </div>
        </div>
    );
};

export default WorkbenchPane;