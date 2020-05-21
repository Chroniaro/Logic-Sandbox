import React, {useCallback, useEffect, useRef} from "react";
import {renderSchematic, SchematicLayout} from "./schematic";
import {moveRectangle, Point} from "../app/util/geometry";
import {nullCheck, nullCheckCanvasRefAndContext, useHTMLEventListener} from "../app/util/util";

interface Props {
    schematicLayout: SchematicLayout;
    viewPosition: Point;
}

const SchematicViewport: React.FunctionComponent<Props> = ({schematicLayout, viewPosition, children}) => {
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