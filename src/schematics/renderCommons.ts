import {corners, Dimensions, padRectangle, Point, project, Rectangle} from "../util/geometry";
import {Group, Leaf} from "../util/layout";

export const styleOptions = {
    fontSize: 16,
    font: 'Courier', // A fixed-width font makes things look nicer with the shenanigans, but it is not required
    charWidthRatio: 0.6, // String sizes are estimated, and then the actual strings are stretched to fit the estimate
    ioSize: 16,
    textMargin: 5,
    borderThickness: 3,
    cornerRadius: 5,
};

export function roundedPath(graphics: CanvasRenderingContext2D, points: Point[], radius: number) {
    if (points.length < 2)
        return;

    const [firstPoint, ...remainingPoints] = points;

    graphics.beginPath();
    graphics.moveTo(firstPoint.x, firstPoint.y);

    while (remainingPoints.length > 1) {
        const nextCorner = remainingPoints.shift()!;
        const endPoint = project(nextCorner, remainingPoints[0], radius);
        graphics.arcTo(nextCorner.x, nextCorner.y, endPoint.x, endPoint.y, radius);
    }

    const lastPoint = remainingPoints[0];
    graphics.lineTo(lastPoint.x, lastPoint.y);
}

export function roundedPolygon(graphics: CanvasRenderingContext2D, vertices: Point[], radius: number) {
    if (vertices.length < 3)
        throw Error("A polygon must have at least three vertices.");

    const first = vertices[0];
    const last = vertices[vertices.length - 1];
    const connectingPoint = project(first, last, radius);
    const path = [connectingPoint, ...vertices, connectingPoint];

    roundedPath(graphics, path, radius);
}

export function roundedRect(graphics: CanvasRenderingContext2D, boundingRect: Rectangle, radius: number) {
    roundedPolygon(graphics, corners(boundingRect), radius);
}

export function getIOBoxDimensions(): Dimensions {
    const {ioSize} = styleOptions;
    return {
        width: ioSize,
        height: ioSize,
    };
}

export function getIOBoxColumn(amount: number): Group {
    let childSpecifications: { [key: string]: Leaf } = {};
    for (let i = 0; i < amount; ++i)
        childSpecifications[i] = {
            type: 'leaf',
            dimensions: getIOBoxDimensions(),
        };

    return {
        type: 'group',
        direction: 'vertical',
        children: childSpecifications,
    }
}

export function renderIOBox(graphics: CanvasRenderingContext2D, bounds: Rectangle, type: 'input' | 'output') {
    const {borderThickness} = styleOptions;
    const insetBounds = padRectangle(bounds, -borderThickness);

    graphics.save();

    graphics.lineWidth = borderThickness;
    if (type === 'input') {
        graphics.fillStyle = "lightblue";
        graphics.strokeStyle = "blue";
    } else {
        graphics.fillStyle = "pink";
        graphics.strokeStyle = "red";
    }

    roundedRect(graphics, insetBounds, 2);
    graphics.fill();
    graphics.stroke();

    graphics.restore();
}

export function estimateTextDimensions(text: string): Dimensions {
    const {
        fontSize,
        charWidthRatio,
    } = styleOptions;

    return {
        width: fontSize * text.length * charWidthRatio,
        height: fontSize,
    }
}

export function fillText(graphics: CanvasRenderingContext2D, rectangle: Rectangle, text: string) {
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

export function renderGateBody(graphics: CanvasRenderingContext2D, bounds: Rectangle) {
    const {
        borderThickness,
        cornerRadius,
    } = styleOptions;

    const insetBounds = padRectangle(bounds, -borderThickness / 2);

    graphics.save();

    graphics.fillStyle = "lightgrey";
    graphics.strokeStyle = "darkgrey";
    graphics.lineWidth = borderThickness;
    roundedRect(graphics, insetBounds, cornerRadius);
    graphics.fill();
    graphics.stroke();

    graphics.restore();
}