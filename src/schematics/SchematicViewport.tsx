import React, {RefObject, useCallback, useRef} from "react";
import {renderSchematic, SchematicLayout} from "./schematic";
import {Point, Rectangle} from "../app/util/geometry";
import {getTranslateCSSProperty, nullCheck, useCanvasRenderFunction} from "../app/util/util";

interface Props {
    schematicLayout: SchematicLayout;
    centerOfView: Point;
}

function getBoundary(containerRef: RefObject<HTMLDivElement>): Rectangle {
    const container = nullCheck(containerRef.current, "Container ref was null.");
    return container.getBoundingClientRect();
}

function positionCanvas(canvas: HTMLCanvasElement, rectangle: Rectangle) {
    canvas.style.transform = getTranslateCSSProperty(rectangle.x, rectangle.y);
    canvas.width = rectangle.width;
    canvas.height = rectangle.height;
}

function render(graphics: CanvasRenderingContext2D, layout: SchematicLayout, centerOfView: Point,
                width: number, height: number) {
    const viewBox = {
        x: centerOfView.x - width / 2,
        y: centerOfView.y - height / 2,
        width, height
    };

    renderSchematic(graphics, layout, viewBox);
}

function onResize(callback: () => void) {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
}

const SchematicViewport: React.FunctionComponent<Props> = ({schematicLayout, centerOfView}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const canvasRef = useCanvasRenderFunction(
        useCallback(
            (graphics, canvas) => {
                const updateCanvasCallback = () => {
                    const boundary = getBoundary(containerRef);
                    positionCanvas(canvas, boundary);
                    render(graphics, schematicLayout, centerOfView, boundary.width, boundary.height);
                };
                updateCanvasCallback();

                return onResize(updateCanvasCallback);
            },
            [schematicLayout, centerOfView]
        )
    );

    return (
        <div className='resizeable-canvas-container' ref={containerRef}>
            <canvas ref={canvasRef} width={0} height={0}/>
        </div>
    );
};

export default SchematicViewport;