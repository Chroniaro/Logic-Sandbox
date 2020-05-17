import {getStandardGateLayout, renderStandardGate, StandardGate, StandardGateLayout} from "./standardGate";
import {StandardLinkage} from "./standardLinkage";
import {enclosingRectangle, Point, Rectangle, rectangleToList} from "../app/util/geometry";

export type Gate = StandardGate;
export type GateLayout = StandardGateLayout;

export type Linkage = StandardLinkage;

export interface Schematic {
    gates: { [uuid: string]: Gate };
    linkages: Linkage[];
}

export interface SchematicLayout {
    gateLayouts: { [uuid: string]: GateLayout };
    outerBoundary: Rectangle;
}

export function getSchematicLayout(schematic: Schematic): SchematicLayout {
    const gateLayouts: { [uuid: string]: GateLayout } = {};
    for (const [uuid, gate] of Object.entries(schematic.gates))
        gateLayouts[uuid] = getStandardGateLayout(gate);

    const outerBoundary = enclosingRectangle(
        ...Object.values(gateLayouts)
            .map(layout => layout.outerBoundary)
    );

    return {
        gateLayouts,
        outerBoundary
    }
}

export function renderSchematic(graphics: CanvasRenderingContext2D, schematic: Schematic, position: Point, layout?: SchematicLayout) {
    graphics.save();

    if (layout === undefined)
        layout = getSchematicLayout(schematic);

    const boundary = layout.outerBoundary;
    graphics.translate(position.x - boundary.x, position.y - boundary.y);
    graphics.rect(0, 0, boundary.width, boundary.height);
    graphics.clip();
    graphics.clearRect(0, 0, boundary.width, boundary.height);

    for (const [uuid, gate] of Object.entries(schematic.gates))
        renderGate(graphics, gate, layout.gateLayouts[uuid]);

    graphics.restore();
}

function renderGate(graphics: CanvasRenderingContext2D, gate: Gate, layout: StandardGateLayout) {
    graphics.save();

    const gateBoundary = layout.outerBoundary;
    graphics.rect(...rectangleToList(gateBoundary));
    graphics.clip();

    // noinspection JSRedundantSwitchStatement
    switch (gate.type) {
        case "standard":
            renderStandardGate(graphics, gate, layout);
            break;
    }

    graphics.restore();
}

export function renderSchematicToCanvas(canvas: HTMLCanvasElement, schematic: Schematic) {
    const graphics = canvas.getContext('2d');
    if (graphics === null)
        throw Error("Cannot create 2D graphics context for canvas.");

    const layout = getSchematicLayout(schematic);
    canvas.width = layout.outerBoundary.width;
    canvas.height = layout.outerBoundary.height;

    renderSchematic(graphics, schematic, {x: 0, y: 0}, layout);
}