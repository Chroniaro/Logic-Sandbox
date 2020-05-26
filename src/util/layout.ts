import {Dimensions, padRectangle, Point, Rectangle} from "./geometry";

export type LayoutSpecification = Group | Leaf;

export interface Group {
    type: 'group';
    direction: 'vertical' | 'horizontal';
    horizontalPadding?: number;
    verticalPadding?: number;
    children: {
        [key: string]:
            LayoutSpecification
    };
}

export interface Leaf {
    type: 'leaf';
    dimensions: Dimensions;
}

export type Layout<Specification extends LayoutSpecification> =
    Specification extends Group ?
        {
            type: 'group',
            boundary: Rectangle,
            children: {
                [key in keyof Specification['children']]:
                Layout<Specification['children'][key]>
            }
        } : {
            type: 'leaf',
            boundary: Rectangle,
        }

export default function layout<Specification extends LayoutSpecification>
(position: Point, specification: Specification): Layout<Specification> {

    switch (specification.type) {
        case 'leaf':
            return layoutLeaf(position, specification as Leaf) as Layout<Specification>;
        case 'group':
            return layoutGroup(position, specification as Group) as Layout<Specification>;
        default:
            throw Error("Unrecognized specification type: " + specification.type);
    }
}

function layoutLeaf(position: Point, leaf: Leaf): Layout<Leaf> {
    return {
        type: 'leaf',
        boundary: {
            ...position,
            ...leaf.dimensions,
        }
    }
}

type Coordinate = keyof Point;
type Dimension = keyof Dimensions;

interface LayoutOrientation {
    majorCoordinate: Coordinate;
    majorDimension: Dimension;
    minorCoordinate: Coordinate;
    minorDimension: Dimension;
}

const orientations: { [key: string]: LayoutOrientation } = {
    horizontal: {
        majorCoordinate: 'x',
        majorDimension: 'width',
        minorCoordinate: 'y',
        minorDimension: 'height',
    },
    vertical: {
        majorCoordinate: 'y',
        majorDimension: 'height',
        minorCoordinate: 'x',
        minorDimension: 'width',
    },
};

function layoutGroup(position: Point, group: Group): Layout<Group> {
    const horizontalPadding = group.horizontalPadding ? group.horizontalPadding : 0;
    const verticalPadding = group.verticalPadding ? group.verticalPadding : 0;
    const padding = {
        width: horizontalPadding,
        height: verticalPadding,
    };

    const orientation = orientations[group.direction];

    const [childLayouts, boundary] = layoutChildren(position, group.children, orientation, padding);
    for (const childLayout of Object.values(childLayouts))
        center(childLayout, orientation, boundary);

    return {
        type: 'group',
        boundary,
        children: childLayouts
    }
}

type AnyLayout = Layout<LayoutSpecification>;
type LayoutMap = { [key: string]: AnyLayout };
type LayoutSpecificationMap = { [key: string]: LayoutSpecification }

function layoutChildren(
    position: Point, children: LayoutSpecificationMap, orientation: LayoutOrientation, padding: Dimensions
): [LayoutMap, Rectangle] {

    const {
        majorCoordinate,
        majorDimension,
        minorCoordinate,
        minorDimension
    } = orientation;

    const majorPadding = padding[majorDimension];
    const minorPadding = padding[minorDimension];

    let majorSize = majorPadding;
    let minorSize = minorPadding;
    let childLayouts: LayoutMap = {};

    for (const [key, child] of Object.entries(children)) {
        const childPosition: Point = {
            x: 0, y: 0, // defaults to make the type checker happy
            [majorCoordinate]: position[majorCoordinate] + majorSize,
            [minorCoordinate]: position[minorCoordinate] + minorPadding,
        };

        const childLayout = layout(childPosition, child);

        majorSize += childLayout.boundary[majorDimension] + majorPadding;
        minorSize = Math.max(minorSize, childLayout.boundary[minorDimension] + 2 * minorPadding);

        childLayouts[key] = childLayout;
    }

    const boundary: Rectangle = {
        ...position,
        width: 0, height: 0, // defaults to make the type checker happy
        [majorDimension]: majorSize,
        [minorDimension]: minorSize,
    };

    return [childLayouts, boundary];
}

function center(childLayout: AnyLayout, orientation: LayoutOrientation, boundary: Rectangle) {
    const coordinate = orientation.minorCoordinate;
    const dimension = orientation.minorDimension;

    const targetOffset = (boundary[dimension] - childLayout.boundary[dimension]) / 2;
    const actualOffset = childLayout.boundary[coordinate] - boundary[coordinate];
    const delta = targetOffset - actualOffset;
    shift(childLayout, coordinate, delta);
    if (childLayout.type === 'group') {
        const padding: Dimensions = {
            width: 0, height: 0, // default values
            [dimension]: targetOffset, // override value
        };
        childLayout.boundary = padRectangle(childLayout.boundary, padding);
    }
}

function shift(layout: Layout<LayoutSpecification>, coordinate: Coordinate, amount: number) {
    layout.boundary[coordinate] += amount;

    if (layout.type === 'group')
        for (const child of Object.values(layout.children))
            shift(child, coordinate, amount);
}