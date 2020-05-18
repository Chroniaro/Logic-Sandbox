import {padRectangle, Point, Rectangle} from "../app/util/geometry";
import {fillText, roundedRect, styleOptions} from "./renderUtil";

export interface StandardGate {
    type: 'standard';
    data: {
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
        charWidthRatio,
        outerMargin,
    } = styleOptions;

    const {
        name,
        position,
        numInputs,
        numOutputs
    } = gate.data;

    const textHeight = fontSize;

    const minimumBodyHeight = textHeight + 2 * textMargin;
    const inputsHeight = ioSize * numInputs;
    const outputsHeight = ioSize * numOutputs;
    const bodyHeight = Math.max(minimumBodyHeight, inputsHeight, outputsHeight);

    const textVerticalOffset = (bodyHeight - textHeight) / 2;

    const nameRegion = {
        x: position.x + ioSize + textMargin,
        y: position.y + textVerticalOffset,
        width: fontSize * name.length * charWidthRatio,
        height: textHeight
    };

    const body = padRectangle(nameRegion, textMargin, textVerticalOffset);

    const inputs = [];
    for (let i = 0; i < numInputs; ++i)
        inputs[i] = {
            x: position.x,
            y: position.y + (bodyHeight - inputsHeight) / 2 + i * ioSize,
            width: ioSize,
            height: ioSize,
        };

    const outputs = [];
    for (let i = 0; i < numOutputs; ++i)
        outputs[i] = {
            x: body.x + body.width,
            y: position.y + (bodyHeight - outputsHeight) / 2 + i * ioSize,
            width: ioSize,
            height: ioSize
        };

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
        borderThickness,
        cornerRadius,
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

    graphics.fillStyle = "lightgrey";
    graphics.strokeStyle = "darkgrey";
    graphics.lineWidth = borderThickness;
    roundedRect(graphics, body, cornerRadius);
    graphics.fill();
    graphics.stroke();

    graphics.fillStyle = "black";
    graphics.font = fontSize + "px " + font;
    fillText(graphics, nameRegion, name);

    graphics.fillStyle = "lightblue";
    graphics.strokeStyle = "blue";
    for (const input of inputs) {
        const paddedInput = padRectangle(input, -2);
        roundedRect(graphics, paddedInput, 2);
        graphics.fill();
        graphics.stroke();
    }

    graphics.fillStyle = "pink";
    graphics.strokeStyle = "red";
    for (const output of outputs) {
        const paddedOutput = padRectangle(output, -2);
        roundedRect(graphics, paddedOutput, 2);
        graphics.fill();
        graphics.stroke();
    }
}