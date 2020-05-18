import {useEffect, useRef} from "react";

export function getTranslateCSSProperty(x: number, y: number): string {
    return `translate(${x}px, ${y}px)`;
}

export function nullCheck<T>(thing: T | null, message?: string): T {
    if (thing === null) {
        if (message === undefined)
            message = thing + " was null.";

        throw Error(message);
    }

    return thing;
}

export type CanvasRenderFunction = (graphics: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;

export function useCanvasRenderFunction(renderFunction: CanvasRenderFunction) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(
        () => {
            const canvas = nullCheck(
                canvasRef.current,
                "Canvas ref is null."
            );

            const graphics = nullCheck(
                canvas.getContext('2d'),
                "Unable to obtain 2D graphics context from canvas."
            );

            renderFunction(graphics, canvas);
        },
        [renderFunction]
    );

    return canvasRef;
}