import {GateRenderer, GraphicsContext} from "./SchematicRenderContext";
import {GateWithType} from "./Schematic";
import {padRectangle, Rectangle} from "../app/util/geometry";

const standardGateType = 'standard';

export interface StandardGateData {
    name: string;
    numInputs: number;
    numOutputs: number;
}

export type StandardGate = GateWithType<typeof standardGateType, StandardGateData>;

function isStandardGate(gate: GateWithType<typeof standardGateType, Partial<StandardGateData>>): gate is StandardGate {
    if (typeof (gate.data.numInputs) !== 'number')
        return false;

    if (typeof (gate.data.numOutputs) !== 'number')
        return false;

    return true;
}

const fontSize = 16;
const charWidthRatio = 0.65;
const ioSize = 16;
const textMargin = 5;
const outerMargin = 3;
const borderThickness = 3;
const cornerRadius = 5;

interface StandardGateRegions {
    text: Rectangle,
    body: Rectangle,
    inputs: Rectangle[],
    outputs: Rectangle[],
    outerBoundary: Rectangle,
}

// The only thing worse than CSS is doing layouts by hand...
function computeRegions(gate: GateWithType<typeof standardGateType, StandardGateData>): StandardGateRegions {
    const textHeight = fontSize;

    const minimumBodyHeight = textHeight + 2 * textMargin;
    const inputsHeight = ioSize * gate.data.numInputs;
    const outputsHeight = ioSize * gate.data.numOutputs;
    const bodyHeight = Math.max(minimumBodyHeight, inputsHeight, outputsHeight);

    const textVerticalOffset = (bodyHeight - textHeight) / 2;

    const text = {
        x: gate.position.x + ioSize + textMargin,
        y: gate.position.y + textVerticalOffset,
        width: fontSize * gate.data.name.length * charWidthRatio,
        height: textHeight
    };

    const body = padRectangle(text, textMargin, textVerticalOffset);

    const inputs = [];
    for (let i = 0; i < gate.data.numInputs; ++i)
        inputs[i] = {
            x: gate.position.x,
            y: gate.position.y + (bodyHeight - inputsHeight) / 2 + i * ioSize,
            width: ioSize,
            height: ioSize,
        };

    const outputs = [];
    for (let i = 0; i < gate.data.numOutputs; ++i)
        outputs[i] = {
            x: body.x + body.width,
            y: gate.position.y + (bodyHeight - outputsHeight) / 2 + i * ioSize,
            width: ioSize,
            height: ioSize
        };

    const outerBoundary = padRectangle(body, ioSize + outerMargin, outerMargin);

    return {
        text,
        body,
        inputs,
        outputs,
        outerBoundary,
    };
}

export default class StandardGateRenderer implements GateRenderer<typeof standardGateType> {
    measure(gate: GateWithType<typeof standardGateType, any>): Rectangle {
        if (!isStandardGate(gate))
            throw Error("Gates with the standard type must conform to the StandardGate interface.");

        return computeRegions(gate).outerBoundary;
    }

    render(gate: GateWithType<typeof standardGateType, any>, graphics: CanvasRenderingContext2D): void {
        if (!isStandardGate(gate))
            throw Error("Gates with the standard type must conform to the StandardGate interface.");

        const {
            body,
            inputs,
            outputs,
            text,
        } = computeRegions(gate);

        graphics.fillStyle = "lightgrey";
        graphics.strokeStyle = "darkgrey";
        graphics.lineWidth = borderThickness;
        roundedRect(graphics, body, cornerRadius);
        graphics.fill();
        graphics.stroke();

        graphics.fillStyle = "black";
        graphics.font = fontSize + "px Arial";
        fillText(graphics, text, gate.data.name);

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
}

function roundedRect(graphics: GraphicsContext, boundingRect: Rectangle, radius: number) {
    const {x, y, width, height} = boundingRect;

    const farLeft = x;
    const left = x + radius;
    const farRight = x + width;
    const right = x + width - radius;

    const farTop = y;
    const top = y + radius;
    const farBottom = y + height;
    const bottom = y + height - radius;

    graphics.beginPath();

    graphics.moveTo(farLeft, top);

    graphics.arcTo(farLeft, farTop, left, farTop, radius);
    graphics.arcTo(farRight, farTop, farRight, top, radius);
    graphics.arcTo(farRight, farBottom, right, farBottom, radius);
    graphics.arcTo(farLeft, farBottom, farLeft, bottom, radius);

    graphics.closePath();
}

function fillText(graphics: GraphicsContext, rectangle: Rectangle, text: string) {
    graphics.save();

    graphics.textBaseline = "top";
    const textMetrics = graphics.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = textMetrics.actualBoundingBoxDescent;

    graphics.translate(rectangle.x, rectangle.y);
    graphics.scale(rectangle.width / textWidth, rectangle.height / textHeight);
    graphics.fillText(text, 0, 0);

    graphics.restore();
}