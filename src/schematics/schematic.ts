import {getStandardGateLayout, renderStandardGate, StandardGate, StandardGateLayout} from "./standardGate";
import {
    getStandardLinkageLayout,
    renderStandardLinkage,
    StandardLinkage,
    StandardLinkageLayout
} from "./standardLinkage";
import {enclosingRectangle, intersects, Point, Rectangle, rectangleToXYWH} from "../util/geometry";
import {getIOPortLayout, IOPort, IOPortLayout, renderIOPort} from "./IOPort";

export type Gate = StandardGate | IOPort;
export type GateLayout = StandardGateLayout | IOPortLayout;

export type Linkage = StandardLinkage;
export type LinkageLayout = StandardLinkageLayout;

export interface Schematic {
    gates: Gate[];
    linkages: Linkage[];
}

export type GateLayoutMap = { [uuid: string]: GateLayout };

export interface SchematicLayout {
    gateLayouts: GateLayoutMap;
    linkageLayouts: LinkageLayout[];
    outerBoundary: Rectangle;
}

export function getSchematicLayout(schematic: Schematic): SchematicLayout {
    const gateLayouts: GateLayoutMap = {};
    for (const gate of schematic.gates)
        gateLayouts[gate.data.uuid] = getGateLayout(gate);

    const linkageLayouts = schematic.linkages.map(getLinkageLayout);

    const outerBoundary = enclosingRectangle(
        ...Object.values(gateLayouts)
            .map(layout => layout.data.layout.boundary)
    );

    return {
        gateLayouts,
        linkageLayouts,
        outerBoundary
    }
}

// these functions will get more interesting when there are multiple different types of things

function getGateLayout(gate: Gate): GateLayout {
    switch (gate.type) {
        case 'standard':
            return getStandardGateLayout(gate);
        case 'io':
            return getIOPortLayout(gate);
    }
}

function getLinkageLayout(linkage: Linkage) {
    return getStandardLinkageLayout(linkage);
}

export function renderSchematic(graphics: CanvasRenderingContext2D, layout: SchematicLayout,
                                viewBox?: Rectangle, position?: Point) {
    if (viewBox === undefined)
        viewBox = layout.outerBoundary;
    if (position === undefined)
        position = {x: 0, y: 0};

    graphics.save();

    graphics.translate(position.x - viewBox.x, position.y - viewBox.y);
    graphics.rect(...rectangleToXYWH(viewBox));
    graphics.clip();
    graphics.clearRect(...rectangleToXYWH(viewBox));

    for (const gateLayout of Object.values(layout.gateLayouts))
        if (intersects(gateLayout.data.layout.boundary, viewBox))
            renderGate(graphics, gateLayout);

    for (const linkageLayout of layout.linkageLayouts)
        renderLinkage(graphics, linkageLayout);

    graphics.restore();
}

function renderGate(graphics: CanvasRenderingContext2D, layout: GateLayout) {
    graphics.save();

    const gateBoundary = layout.data.layout.boundary;
    graphics.rect(...rectangleToXYWH(gateBoundary));
    graphics.clip();

    switch (layout.type) {
        case 'standard':
            renderStandardGate(graphics, layout);
            break;
        case 'io':
            renderIOPort(graphics, layout);
            break;
    }

    graphics.restore();
}

function renderLinkage(graphics: CanvasRenderingContext2D, layout: LinkageLayout) {
    renderStandardLinkage(graphics, layout);
}