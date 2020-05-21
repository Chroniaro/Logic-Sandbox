import React from "react";
import {GateLayout} from "../../schematics/schematic";
import {Point, Rectangle} from "../../util/geometry";
import IODragRegion from "./IODragRegion";

interface Props {
    gateLayout: GateLayout,
    viewPosition: Point,
}

const GateIO: React.FunctionComponent<Props> = ({gateLayout, viewPosition}) => {
    const inputRegions = getDragRegions(viewPosition, gateLayout.data.inputs);
    const outputRegions = getDragRegions(viewPosition, gateLayout.data.outputs);

    return (
        <>
            {inputRegions}
            {outputRegions}
        </>
    );
};

export default GateIO;

function getDragRegions(viewPosition: Point, regions: Rectangle[]) {
    return regions.map(
        (region, index) => (
            <IODragRegion
                key={index}
                region={region}
                viewPosition={viewPosition}
            />
        )
    );
}