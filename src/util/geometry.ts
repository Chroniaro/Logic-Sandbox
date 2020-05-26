export interface Point {
    x: number;
    y: number;
}

export function subtractPoints(point1: Point, point2: Point): Point {
    return {
        x: point1.x - point2.x,
        y: point1.y - point2.y,
    }
}

export interface Dimensions {
    width: number,
    height: number,
}

export interface Rectangle extends Point, Dimensions {
}

export function moveRectangle(rectangle: Rectangle, newPosition: Point): Rectangle {
    return {
        ...newPosition,
        width: rectangle.width,
        height: rectangle.height,
    }
}

function rectangleWithCorners(x1: number, y1: number, x2: number, y2: number) {
    return {
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1,
    }
}

export const ZERO_RECTANGLE = rectangleWithCorners(0, 0, 0, 0,);

export function enclosingRectangle(...rectangles: Rectangle[]): Rectangle {
    if (rectangles.length === 0)
        return ZERO_RECTANGLE;

    const x1 = Math.min(...rectangles.map(rect => rect.x));
    const y1 = Math.min(...rectangles.map(rect => rect.y));
    const x2 = Math.max(...rectangles.map(rect => rect.x + rect.width));
    const y2 = Math.max(...rectangles.map(rect => rect.y + rect.height));

    return rectangleWithCorners(x1, y1, x2, y2);
}

export function intersection(...rectangles: Rectangle[]): Rectangle {
    if (rectangles.length === 0)
        return ZERO_RECTANGLE;

    const x1 = Math.max(...rectangles.map(rect => rect.x));
    const y1 = Math.max(...rectangles.map(rect => rect.y));
    const x2 = Math.min(...rectangles.map(rect => rect.x + rect.width));
    const y2 = Math.min(...rectangles.map(rect => rect.y + rect.height));

    if (x1 >= x2 || y1 >= y2)
        return ZERO_RECTANGLE;

    return rectangleWithCorners(x1, y1, x2, y2);
}

export function intersects(rectangle1: Rectangle, rectangle2: Rectangle) {
    return intersection(rectangle1, rectangle2) !== ZERO_RECTANGLE;
}

export function padRectangle(rectangle: Rectangle, padding: Dimensions | number): Rectangle {
    if (typeof (padding) === 'number')
        padding = {
            width: padding,
            height: padding,
        };

    return {
        x: rectangle.x - padding.width,
        y: rectangle.y - padding.height,
        width: rectangle.width + 2 * padding.width,
        height: rectangle.height + 2 * padding.height,
    }
}

function distanceFromOrigin(point: Point) {
    const {x, y} = point;
    return Math.sqrt(x * x + y * y);
}

export function project(from: Point, toward: Point, distance: number) {
    const delta = subtractPoints(toward, from);
    const magnitudeOfDelta = distanceFromOrigin(delta);

    if (magnitudeOfDelta < distance)
        throw Error("Projection distance is greater than the distance between the points.");

    return {
        x: from.x + delta.x * distance / magnitudeOfDelta,
        y: from.y + delta.y * distance / magnitudeOfDelta,
    };
}

export function center(rectangle: Rectangle) {
    return {
        x: rectangle.x + rectangle.width / 2,
        y: rectangle.y + rectangle.height / 2,
    }
}

// useful for calling library functions involving rectangles
export function rectangleToXYWH(rectangle: Rectangle): [number, number, number, number] {
    return [rectangle.x, rectangle.y, rectangle.width, rectangle.height];
}

export function corners(rectangle: Rectangle): [Point, Point, Point, Point] {
    const xs = [rectangle.x, rectangle.x + rectangle.width];
    const ys = [rectangle.y, rectangle.y + rectangle.height];

    const points = [];
    for (const x of xs)
        for (const y of ys)
            points.push({x, y});

    return [ // clockwise order starting with top left
        points[0],
        points[2],
        points[3],
        points[1],
    ];
}