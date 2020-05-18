import {getStandardGateLayout, renderStandardGate, StandardGate, StandardGateLayout} from "./standardGate";
import {StandardLinkage} from "./standardLinkage";
import {enclosingRectangle, Point, Rectangle, rectangleToList} from "../app/util/geometry";

export type Gate = StandardGate;
export type GateLayout = StandardGateLayout;

export type Linkage = StandardLinkage;

export interface Schematic {
    gates: Gate[];
    linkages: Linkage[];
}

export interface SchematicLayout {
    gateLayouts: GateLayout[];
    outerBoundary: Rectangle;
}

export function getSchematicLayout(schematic: Schematic): SchematicLayout {
    const gateLayouts = schematic.gates.map(getGateLayout);

    const outerBoundary = enclosingRectangle(
        ...Object.values(gateLayouts)
            .map(layout => layout.data.outerBoundary)
    );

    return {
        gateLayouts,
        outerBoundary
    }
}

function getGateLayout(gate: Gate) {
    return getStandardGateLayout(gate);
}

export function renderSchematic(graphics: CanvasRenderingContext2D, layout: SchematicLayout, position: Point) {
    graphics.save();

    const boundary = layout.outerBoundary;
    graphics.translate(position.x - boundary.x, position.y - boundary.y);
    graphics.rect(...rectangleToList(boundary));
    graphics.clip();
    graphics.clearRect(...rectangleToList(boundary));

    for (const gateLayout of layout.gateLayouts)
        renderGate(graphics, gateLayout);

    graphics.restore();
}

function renderGate(graphics: CanvasRenderingContext2D, layout: GateLayout) {
    graphics.save();

    const gateBoundary = layout.data.outerBoundary;
    graphics.rect(...rectangleToList(gateBoundary));
    graphics.clip();

    // noinspection JSRedundantSwitchStatement
    switch (layout.type) {
        case 'standard':
            renderStandardGate(graphics, layout);
            break;
    }

    graphics.restore();
}