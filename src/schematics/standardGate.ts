import {Point} from "../util/geometry";
import {
    estimateTextDimensions,
    fillText,
    getIOBoxColumn,
    renderGateBody,
    renderIOBoxColumn,
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

function getLayoutGeometry(gate: StandardGate) {
    const {textMargin} = styleOptions;
    const {
        name,
        position,
        numInputs,
        numOutputs,
    } = gate.data;

    return layout(position, {
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
}

export interface StandardGateLayout {
    type: 'standard';
    data: {
        name: string;
        layout: ReturnType<typeof getLayoutGeometry>;
    }
}

export function getStandardGateLayout(gate: StandardGate): StandardGateLayout {
    return {
        type: 'standard',
        data: {
            name: gate.data.name,
            layout: getLayoutGeometry(gate),
        }
    }
}

export function renderStandardGate(graphics: CanvasRenderingContext2D, gateLayout: StandardGateLayout): void {
    const {font, fontSize} = styleOptions;
    const {name, layout} = gateLayout.data;

    renderGateBody(graphics, layout.children.body.boundary);

    graphics.fillStyle = "black";
    graphics.font = fontSize + "px " + font;
    fillText(graphics, layout.children.body.children.nameRegion.boundary, name);

    renderIOBoxColumn(graphics, layout.children.inputs, 'input');
    renderIOBoxColumn(graphics, layout.children.outputs, 'output');
}