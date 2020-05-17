import Schematic, {Gate, GateWithType, LinkageWithType} from "./Schematic";
import {enclosingRectangle, Rectangle} from "../app/util/geometry";

export type GraphicsContext = CanvasRenderingContext2D;

export interface GateRenderer<T extends string> {
    measure(gate: GateWithType<T, any>): Rectangle;

    render(gate: GateWithType<T, any>, graphics: GraphicsContext): void;
}

export type GateBoundaries = { [uuid: string]: Rectangle };

export interface LinkageRenderer<T extends string> {
    render(
        linkage: LinkageWithType<T>,
        gates: { [uuid: string]: Gate },
        graphics: GraphicsContext,
        metrics: SchematicMetrics,
    ): void;
}

export interface SchematicMetrics {
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

    measure(schematic: Schematic): SchematicMetrics {
        let gateBoundaries: GateBoundaries = {};

        for (const [uuid, gate] of Object.entries(schematic.gates)) {
            const renderer = this.getGateRenderer(gate.type);
            gateBoundaries[uuid] = renderer.measure(gate);
        }

        const boundingRect = enclosingRectangle(...Object.values(gateBoundaries));

        return {
            boundingRect,
            gateBoundaries
        }
    }

    render(schematic: Schematic, canvas: HTMLCanvasElement): void {
        const graphics = canvas.getContext('2d');
        if (graphics === null)
            throw Error("Canvas graphics context is null.");

        const metrics = this.measure(schematic);

        canvas.width = metrics.boundingRect.width;
        canvas.height = metrics.boundingRect.height;

        graphics.clearRect(0, 0, canvas.width, canvas.height);

        const {gateBoundaries, boundingRect} = metrics;

        graphics.save();
        graphics.translate(-boundingRect.x, -boundingRect.y);

        for (const [uuid, gate] of Object.entries(schematic.gates)) {
            const boundary = gateBoundaries[uuid];
            graphics.save();
            graphics.rect(boundary.x, boundary.y, boundary.width, boundary.height);
            this.getGateRenderer(gate.type).render(gate, graphics);
            graphics.restore();
        }

        for (const linkage of Object.values(schematic.linkages)) {
            const renderer: LinkageRenderer<typeof linkage.type> = this.linkageRenderers[linkage.type];
            if (renderer === undefined)
                throw Error("No linkage renderer found for type " + linkage.type);

            renderer.render(linkage, schematic.gates, graphics, metrics);
        }

        graphics.restore();
    }

    private getGateRenderer(type: string) {
        const renderer = this.gateRenderers[type];

        if (renderer === undefined)
            throw Error("No gate renderer found for type " + type);

        return renderer;
    }
}