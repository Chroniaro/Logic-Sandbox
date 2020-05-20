import React, {RefObject, useCallback, useEffect, useRef} from "react";
import {renderSchematic, SchematicLayout} from "./schematic";
import {moveRectangle, Point, subtractPoints} from "../app/util/geometry";
import {nullCheck, nullCheckCanvasRefAndContext, useHTMLEventListener} from "../app/util/util";

export type ViewMoveHandler = (delta: Point) => void;

interface Props {
    schematicLayout: SchematicLayout;
    viewPosition: Point;
    onViewMove?: ViewMoveHandler;
}

const SchematicViewport: React.FunctionComponent<Props> = ({schematicLayout, viewPosition, onViewMove, children}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const updateCanvas = useCallback(
        () => {
            const [canvas, graphics] = nullCheckCanvasRefAndContext(canvasRef);
            const boundary = nullCheck(containerRef.current).getBoundingClientRect();

            canvas.width = boundary.width;
            canvas.height = boundary.height;

            const viewBox = moveRectangle(boundary, viewPosition);
            renderSchematic(graphics, schematicLayout, viewBox);
        },
        [schematicLayout, viewPosition]
    );

    useEffect(updateCanvas, [updateCanvas]);
    useHTMLEventListener(useRef(window), 'resize', updateCanvas);

    useOnDrag(canvasRef, onViewMove);

    return (
        <div className='resizeable-canvas-container' ref={containerRef}>
            <canvas
                ref={canvasRef}
                width={0}
                height={0}
            />
            {children}
        </div>
    );
};

export default SchematicViewport;

function useOnDrag(ref: RefObject<HTMLCanvasElement>, onDrag?: ViewMoveHandler) {
    const dragState = useRef<Point | null>(null);

    const resetDrag = useCallback(
        () => dragState.current = null,
        []
    );

    const startDrag = useCallback(
        (event: MouseEvent) => {
            dragState.current = event;
        },
        []
    );

    const drag = useCallback(
        (event: MouseEvent) => {
            if (onDrag === undefined)
                resetDrag();
            else if (dragState.current !== null) {
                onDrag(subtractPoints(event, dragState.current));
                dragState.current = event;
            }
        },
        [resetDrag, onDrag]
    );

    useHTMLEventListener(ref, 'mousedown', startDrag);
    useHTMLEventListener(ref, 'mousemove', drag);
    useHTMLEventListener(ref, 'mouseout', resetDrag);
    useHTMLEventListener(ref, 'mouseup', resetDrag);
}