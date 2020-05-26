import React from "react";
import {GateLayout} from "../../schematics/schematic";
import {Point, Rectangle} from "../../util/geometry";
import IODragRegion from "./IODragRegion";

interface Props {
    gateLayout: GateLayout,
    viewPosition: Point,
}

const GateIO: React.FunctionComponent<Props> = ({gateLayout, viewPosition}) => {
    const inputRegions = getDragRegions(viewPosition, gateLayout.data.layout.children.inputs.children);
    const outputRegions = getDragRegions(viewPosition, gateLayout.data.layout.children.outputs.children);

    return (
        <>
            {inputRegions}
            {outputRegions}
        </>
    );
};

export default GateIO;

function getDragRegions(viewPosition: Point, regions: { [key: string]: { boundary: Rectangle } }) {
    return Object.entries(regions).map(
        ([key, region]) => (
            <IODragRegion
                key={key}
                region={region.boundary}
                viewPosition={viewPosition}
            />
        )
    );
}