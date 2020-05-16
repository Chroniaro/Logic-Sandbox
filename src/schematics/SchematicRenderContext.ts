import Schematic, {Gate, GateWithType, LinkageWithType} from "./Schematic";
import {Rectangle} from "../app/util/types";

export type GraphicsContext = CanvasRenderingContext2D;

export interface GateRenderer<T extends string> {
    render(gate: GateWithType<T, any>, graphics: GraphicsContext): Rectangle;
}

export type GateBoundaries = { [uuid: string]: Rectangle };

export interface LinkageRenderer<T extends string> {
    render(
        linkage: LinkageWithType<T>,
        gates: { [uuid: string]: Gate },
        graphics: GraphicsContext,
        gateBoundaries: GateBoundaries,
    ): void;
}

export interface SchematicRenderResults {
    boundingRect: Rectangle,
    gateBoundaries: GateBoundaries
}

export default class SchematicRenderContext {
    constructor(
        private readonly gateRenderers: { [Type in string]: GateRenderer<Type> },
        private readonly linkageRenderers: { [Type in string]: LinkageRenderer<Type> },
    ) {
        Object.freeze(gateRenderers);
        Object.freeze(linkageRenderers);
    };

    render(schematic: Schematic, graphics: GraphicsContext): SchematicRenderResults {
        let boundingRect: Rectangle | null = null;

        let gateBoundaries: GateBoundaries = {};
        for (const [uuid, gate] of Object.entries(schematic.gates)) {
            const renderer = this.gateRenderers[gate.type];
            if (renderer === undefined)
                throw Error("No gate renderer found for type " + gate.type);

            const gateBoundingRect = renderer.render(gate, graphics);
            gateBoundaries[uuid] = gateBoundingRect;
            boundingRect = minimumEnclosingRect(boundingRect, gateBoundingRect);
        }

        for (const linkage of Object.values(schematic.linkages)) {
            const renderer: LinkageRenderer<typeof linkage.type> = this.linkageRenderers[linkage.type];
            if (renderer === undefined)
                throw Error("No linkage renderer found for type " + linkage.type);

            renderer.render(linkage, schematic.gates, graphics, gateBoundaries);
        }

        if (boundingRect === null)
            boundingRect = ZERO_RECTANGLE;

        return {
            boundingRect,
            gateBoundaries
        };
    }
}

const ZERO_RECTANGLE = {
    position: {x: 0, y: 0},
    width: 0,
    height: 0,
};

function minimumEnclosingRect(rect1: Rectangle | null, rect2: Rectangle): Rectangle {
    if (rect1 === null)
        return rect2;

    let xs = [
        rect1.position.x,
        rect1.position.x + rect1.width,
        rect2.position.x,
        rect2.position.x + rect2.width,
    ];

    let ys = [
        rect1.position.y,
        rect1.position.y + rect1.height,
        rect2.position.y,
        rect2.position.y + rect2.height,
    ];

    let x1 = Math.min(...xs);
    let y1 = Math.min(...ys);
    let x2 = Math.max(...xs);
    let y2 = Math.max(...ys);

    return {
        position: {x: x1, y: y1},
        width: x2 - x1,
        height: y2 - y1
    }
}