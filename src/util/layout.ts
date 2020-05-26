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

function layoutGroup(position: Point, group: Group): Layout<Group> {
    const horizontalPadding = group.horizontalPadding ? group.horizontalPadding : 0;
    const verticalPadding = group.verticalPadding ? group.verticalPadding : 0;

    let width = horizontalPadding;
    let height = verticalPadding;
    let childLayouts: { [key: string]: Layout<LayoutSpecification> } = {};

    for (const [key, child] of Object.entries(group.children)) {
        // children are later centered with respect to the baseline,
        // so the x coordinate doesn't matter for a vertical group and vice versa
        const childPosition = {
            x: position.x + width, // relevant for horizontal groups
            y: position.y + height, // relevant for vertical groups
        };

        const childLayout = layout(childPosition, child);

        if (group.direction === 'horizontal') {
            width += childLayout.boundary.width + horizontalPadding;
            height = Math.max(height, childLayout.boundary.height + 2 * verticalPadding);
        } else {
            height += childLayout.boundary.height + verticalPadding;
            width = Math.max(width, childLayout.boundary.width + 2 * horizontalPadding);
        }

        childLayouts[key] = childLayout;
    }

    const boundary = {
        ...position,
        width,
        height
    };

    for (const childLayout of Object.values(childLayouts))
        center(childLayout, group.direction, boundary);

    return {
        type: 'group',
        boundary,
        children: childLayouts
    }
}

function center(childLayout: Layout<LayoutSpecification>, baseLineDirection: 'horizontal' | 'vertical', boundary: Rectangle) {
    if (baseLineDirection === 'horizontal') {
        const targetOffset = (boundary.height - childLayout.boundary.height) / 2;
        const actualOffset = childLayout.boundary.y - boundary.y;
        const delta = targetOffset - actualOffset;
        shiftVertical(childLayout, delta);
        if (childLayout.type === 'group')
            childLayout.boundary = padRectangle(childLayout.boundary, 0, targetOffset);
    } else {
        const targetOffset = (boundary.width - childLayout.boundary.width) / 2;
        const actualOffset = childLayout.boundary.x - boundary.x;
        const delta = targetOffset - actualOffset;
        shiftHorizontal(childLayout, delta);
        if (childLayout.type === 'group')
            childLayout.boundary = padRectangle(childLayout.boundary, targetOffset, 0);
    }
}

function shiftHorizontal(layout: Layout<LayoutSpecification>, amount: number) {
    layout.boundary.x += amount;

    if (layout.type === 'group')
        for (const child of Object.values(layout.children))
            shiftHorizontal(child, amount);
}

function shiftVertical(layout: Layout<LayoutSpecification>, amount: number) {
    layout.boundary.y += amount;

    if (layout.type === 'group')
        for (const child of Object.values(layout.children))
            shiftVertical(child, amount);
}