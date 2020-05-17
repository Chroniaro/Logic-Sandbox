export interface Point {
    x: number;
    y: number;
}

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const ZERO_RECTANGLE: Rectangle = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

export function enclosingRectangle(...rectangles: Rectangle[]): Rectangle {
    if (rectangles.length === 0)
        return ZERO_RECTANGLE;

    const x1 = Math.min(...rectangles.map(rect => rect.x));
    const y1 = Math.min(...rectangles.map(rect => rect.y));
    const x2 = Math.max(...rectangles.map(rect => rect.x + rect.width));
    const y2 = Math.max(...rectangles.map(rect => rect.y + rect.height));

    return {
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1,
    }
}

export function padRectangle(rect: Rectangle, horizontalPadding: number, verticalPadding?: number) {
    if (verticalPadding === undefined)
        verticalPadding = horizontalPadding;

    return {
        x: rect.x - horizontalPadding,
        y: rect.y - verticalPadding,
        width: rect.width + 2 * horizontalPadding,
        height: rect.height + 2 * verticalPadding,
    }
}

export function center(rectangle: Rectangle) {
    return {
        x: rectangle.x + rectangle.width / 2,
        y: rectangle.y + rectangle.height / 2,
    }
}

// useful for calling library functions involving rectangles
export function rectangleToList(rectangle: Rectangle): [number, number, number, number] {
    return [rectangle.x, rectangle.y, rectangle.width, rectangle.height];
}