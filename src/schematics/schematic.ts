import {getStandardGateLayout, renderStandardGate, StandardGate, StandardGateLayout} from "./standardGate";
import {StandardLinkage} from "./standardLinkage";
import {enclosingRectangle, intersects, Point, Rectangle, rectangleToList} from "../app/util/geometry";

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

export function renderSchematic(graphics: CanvasRenderingContext2D, layout: SchematicLayout,
                                viewBox?: Rectangle, position?: Point) {
    if (viewBox === undefined)
        viewBox = layout.outerBoundary;
    if (position === undefined)
        position = {x: 0, y: 0};

    graphics.save();

    graphics.translate(position.x - viewBox.x, position.y - viewBox.y);
    graphics.rect(...rectangleToList(viewBox));
    graphics.clip();
    graphics.clearRect(...rectangleToList(viewBox));

    for (const gateLayout of layout.gateLayouts)
        if (intersects(gateLayout.data.outerBoundary, viewBox))
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