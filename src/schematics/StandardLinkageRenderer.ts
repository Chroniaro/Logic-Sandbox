import {Gate, LinkageWithType} from "./Schematic";
import {LinkageRenderer} from "./SchematicRenderContext";

const standardLinkageType = 'standard';

export default class StandardLinkageRenderer implements LinkageRenderer<typeof standardLinkageType> {
    render(linkage: LinkageWithType<typeof standardLinkageType>, gates: { [p: string]: Gate }, graphics: CanvasRenderingContext2D): void {
        const fromGate: Gate = gates[linkage.from.gateId];
        const toGate: Gate = gates[linkage.to.gateId];

        const x1 = fromGate.location.x + linkage.from.positionOnGate.x;
        const y1 = fromGate.location.y + linkage.from.positionOnGate.y;
        const x2 = toGate.location.x + linkage.to.positionOnGate.x;
        const y2 = toGate.location.y + linkage.to.positionOnGate.y;

        graphics.moveTo(x1, y1);
        graphics.lineTo(x2, y2);
        graphics.stroke();
    };
}
