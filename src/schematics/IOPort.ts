import {Point} from "../util/geometry";
import layout from "../util/layout";
import {getIOBoxColumn, renderGateBody, renderIOBoxColumn, styleOptions} from "./renderCommons";

export interface IOPort {
    type: 'io';
    data: {
        uuid: string;
        position: Point;

        ioType: 'input' | 'output';
        numBoxes: number;
    }
}

function getLayoutGeometry(gate: IOPort) {
    const {textMargin} = styleOptions;
    const {
        position,
        numBoxes,
    } = gate.data;

    return layout(position, {
        type: 'group',
        direction: 'horizontal',
        horizontalPadding: textMargin,
        verticalPadding: textMargin,

        children: {
            boxes: getIOBoxColumn(numBoxes)
        }
    });
}

export interface IOPortLayout {
    type: 'io',
    data: {
        ioType: 'input' | 'output',
        layout: ReturnType<typeof getLayoutGeometry>,
    }
}

export function getIOPortLayout(gate: IOPort): IOPortLayout {
    return {
        type: 'io',
        data: {
            ioType: gate.data.ioType,
            layout: getLayoutGeometry(gate),
        }
    }
}

export function renderIOPort(graphics: CanvasRenderingContext2D, gateLayout: IOPortLayout) {
    const {
        ioType,
        layout
    } = gateLayout.data;

    renderGateBody(graphics, layout.boundary);
    renderIOBoxColumn(graphics, layout.children.boxes, ioType);
}