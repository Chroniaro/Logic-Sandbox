import {RefObject, useEffect} from "react";

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

export function nullCheckCanvasRefAndContext(canvasRef: RefObject<HTMLCanvasElement>):
    [HTMLCanvasElement, CanvasRenderingContext2D] {

    const canvas = nullCheck(
        canvasRef.current,
        "Canvas ref is null."
    );

    const graphics = nullCheck(
        canvas.getContext('2d'),
        "Unable to obtain 2D graphics context from canvas."
    );

    return [canvas, graphics];
}

// type ListenerType<ThisType, EventType> = (this: ThisType, event: EventType) => void;

interface EventSource<Key, ListenerType> {
    addEventListener(key: Key, listener: ListenerType): void;

    removeEventListener(key: Key, listener: ListenerType): void;
}

export function useHTMLEventListener<Key, ListenerType, ElementType extends EventSource<Key, ListenerType>>
(ref: RefObject<ElementType>, key: Key, listener: ListenerType) {
    useEffect(
        () => {
            const target = ref.current;

            if (target === null)
                return undefined;

            target.addEventListener(key, listener);
            return () => target.removeEventListener(key, listener);
        },
        [ref, key, listener]
    );
}