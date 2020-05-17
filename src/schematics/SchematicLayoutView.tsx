import React, {useEffect, useRef} from "react";
import {renderSchematic, SchematicLayout} from "./schematic";

interface Props {
    schematicLayout: SchematicLayout;
}

const SchematicLayoutView: React.FunctionComponent<Props> = ({schematicLayout}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(
        () => {
            const canvas = canvasRef.current;
            if (canvas === null)
                throw Error("Canvas ref is null.");

            const graphics = canvas.getContext('2d');
            if (graphics === null)
                throw Error("Unable to obtain 2D graphics context from canvas.");

            renderSchematic(graphics, schematicLayout, {x: 0, y: 0});
        },
        [schematicLayout]
    );

    return (
        <canvas
            className='logic-gate-canvas'
            ref={canvasRef}
            width={schematicLayout.outerBoundary.width}
            height={schematicLayout.outerBoundary.height}
        />
    );
};

export default SchematicLayoutView;