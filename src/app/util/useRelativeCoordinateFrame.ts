import {RefObject, useRef} from "react";
import {Point} from "./types";

export type CoordinateConverter = (point: Point) => Point | null;

export function useRelativeCoordinateFrame<Element extends HTMLElement>(): [RefObject<Element>, CoordinateConverter] {
    const ref = useRef<Element>(null);

    const relativeCoordinates: CoordinateConverter = ({x, y}) => {
        const component = ref.current;
        if (component === null)
            return null;
        const boundingBox = component.getBoundingClientRect();

        return {
            x: x - boundingBox.x + component.scrollLeft,
            y: y - boundingBox.y + component.scrollTop
        };
    };

    return [ref, relativeCoordinates];
}