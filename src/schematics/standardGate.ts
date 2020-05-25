import {padRectangle, Point, Rectangle} from "../util/geometry";
import {fillText, layoutIOBox, layoutText, renderGateBody, renderIOBox, styleOptions} from "./renderCommons";

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

export interface StandardGateLayout {
    type: 'standard';
    data: {
        name: string;
        nameRegion: Rectangle;
        body: Rectangle;
        inputs: Rectangle[];
        outputs: Rectangle[];
        outerBoundary: Rectangle;
    }
}

export function getStandardGateLayout(gate: StandardGate): StandardGateLayout {
    const {
        fontSize,
        textMargin,
        ioSize,
        outerMargin,
    } = styleOptions;

    const {
        name,
        position,
        numInputs,
        numOutputs
    } = gate.data;

    const textHeight = fontSize;

    const inputsHeight = ioSize * numInputs;
    const outputsHeight = ioSize * numOutputs;
    const bodyHeight = Math.max(textHeight + 2 * textMargin, inputsHeight, outputsHeight);

    const textVerticalOffset = (bodyHeight - textHeight) / 2;

    const nameRegion = layoutText(name, {
        x: position.x + outerMargin + ioSize + textMargin,
        y: position.y + outerMargin + textVerticalOffset,
    });

    const body = padRectangle(nameRegion, textMargin, textVerticalOffset);

    const inputs = [];
    for (let i = 0; i < numInputs; ++i)
        inputs[i] = layoutIOBox({
            x: body.x - ioSize,
            y: body.y + (bodyHeight - inputsHeight) / 2 + i * ioSize,
        });

    const outputs = [];
    for (let i = 0; i < numOutputs; ++i)
        outputs[i] = layoutIOBox({
            x: body.x + body.width,
            y: body.y + (bodyHeight - outputsHeight) / 2 + i * ioSize,
        });

    const outerBoundary = padRectangle(body, ioSize + outerMargin, outerMargin);

    return {
        type: 'standard',
        data: {
            name,
            nameRegion,
            body,
            inputs,
            outputs,
            outerBoundary,
        }
    }
}

export function renderStandardGate(graphics: CanvasRenderingContext2D, layout: StandardGateLayout): void {
    const {
        fontSize,
        font,
    } = styleOptions;

    const {
        name,
        nameRegion,
        body,
        inputs,
        outputs,
    } = layout.data;

    renderGateBody(graphics, body);

    graphics.fillStyle = "black";
    graphics.font = fontSize + "px " + font;
    fillText(graphics, nameRegion, name);

    for (const bounds of inputs)
        renderIOBox(graphics, bounds, 'input');

    for (const bounds of outputs)
        renderIOBox(graphics, bounds, 'output');
}