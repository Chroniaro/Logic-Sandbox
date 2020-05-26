import {Point} from "../util/geometry";
import {
    estimateTextDimensions,
    fillText,
    getIOBoxColumn,
    renderGateBody,
    renderIOBox,
    styleOptions
} from "./renderCommons";
import layout from "../util/layout";

export interface StandardGate {
    type: 'standard';
    data: {
        uuid: string;
        position: Point;

        name: string;
        numInputs: number;
        numOutputs: number;
    }
}

export function getStandardGateLayout(gate: StandardGate) {
    const {textMargin} = styleOptions;
    const {
        name,
        position,
        numInputs,
        numOutputs,
    } = gate.data;

    const gateLayout = layout(position, {
        type: 'group',
        direction: 'horizontal',
        children: {
            inputs: getIOBoxColumn(numInputs),
            body: {
                type: 'group',
                direction: 'horizontal',
                horizontalPadding: textMargin,
                verticalPadding: textMargin,
                children: {
                    nameRegion: {
                        type: 'leaf',
                        dimensions: estimateTextDimensions(name)
                    }
                }
            },
            outputs: getIOBoxColumn(numOutputs)
        }
    });

    return {
        type: 'standard',
        data: {
            name,
            layout: gateLayout,
        }
    }
}

export type StandardGateLayout = ReturnType<typeof getStandardGateLayout>;

export function renderStandardGate(graphics: CanvasRenderingContext2D, gateLayout: StandardGateLayout): void {
    const {font, fontSize} = styleOptions;

    const {name, layout} = gateLayout.data;

    renderGateBody(graphics, layout.children.body.boundary);

    graphics.fillStyle = "black";
    graphics.font = fontSize + "px " + font;
    fillText(graphics, layout.children.body.children.nameRegion.boundary, name);

    for (const input of Object.values(layout.children.inputs.children))
        renderIOBox(graphics, input.boundary, 'input');

    for (const output of Object.values(layout.children.outputs.children))
        renderIOBox(graphics, output.boundary, 'output');
}