import React, {useEffect, useRef} from "react";
import Schematic from "./Schematic";
import {useSchematicRenderContext} from "./SchematicRenderContextProvider";

interface Props {
    schematic: Schematic;
}

const LogicGateSchematic: React.FunctionComponent<Props> = ({schematic}) => {
    const schematicContext = useSchematicRenderContext();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(
        () => {
            const canvas = canvasRef.current;
            if (canvas === null)
                throw Error("Canvas ref is null.");

            schematicContext.render(schematic, canvas);
        }
    );

    return (
        <canvas
            className='logic-gate-canvas'
            ref={canvasRef}
            height={0}
            width={0}
        />
    );
};

export default LogicGateSchematic;