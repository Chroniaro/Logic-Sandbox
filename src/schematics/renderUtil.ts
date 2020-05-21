import {Rectangle} from "../util/geometry";

export const styleOptions = {
    fontSize: 16,
    font: 'Courier',
    charWidthRatio: 0.6, // String sizes are estimated, and then the actual sizes are stretched to fit the estimate
    ioSize: 16,
    textMargin: 5,
    outerMargin: 3,
    borderThickness: 3,
    cornerRadius: 5,
};

export function roundedRect(graphics: CanvasRenderingContext2D, boundingRect: Rectangle, radius: number) {
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