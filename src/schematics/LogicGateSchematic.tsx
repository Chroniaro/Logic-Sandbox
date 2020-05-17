import React, {useEffect, useRef} from "react";
import {renderSchematicToCanvas, Schematic} from "./schematic";

interface Props {
    schematic: Schematic;
}

const LogicGateSchematic: React.FunctionComponent<Props> = ({schematic}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(
        () => {
            const canvas = canvasRef.current;
            if (canvas === null)
                throw Error("Canvas ref is null.");

            renderSchematicToCanvas(canvas, schematic);
        },
        [schematic]
    );

    return (
        <canvas
            className='logic-gate-canvas'
            ref={canvasRef}
            height={0} // makes canvas invisible until effect takes place
            width={0}
        />
    );
};

export default LogicGateSchematic;