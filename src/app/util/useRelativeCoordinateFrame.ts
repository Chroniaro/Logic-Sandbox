import {RefObject, useRef} from "react";
import {Point} from "./geometry";

export type CoordinateConverter = (point: Point) => Point;

export function useRelativeCoordinateFrame<Element extends HTMLElement>(): [RefObject<Element>, CoordinateConverter] {
    const ref = useRef<Element>(null);

    const relativeCoordinates: CoordinateConverter = (({x, y}) => {
        const component = ref.current;
        if (component === null)
            throw Error("Component ref was null.");
        const boundingBox = component.getBoundingClientRect();

        return {
            x: x - boundingBox.x + component.scrollLeft,
            y: y - boundingBox.y + component.scrollTop
        };
    });

    return [ref, relativeCoordinates];
}