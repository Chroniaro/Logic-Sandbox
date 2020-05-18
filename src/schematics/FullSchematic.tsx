import React, {useCallback} from "react";
import {renderSchematic, SchematicLayout} from "./schematic";
import {useCanvasRenderFunction} from "../app/util/util";

interface Props {
    schematicLayout: SchematicLayout;
}

const FullSchematic: React.FunctionComponent<Props> = ({schematicLayout}) => {
    const canvasRef = useCanvasRenderFunction(
        useCallback(
            graphics => renderSchematic(graphics, schematicLayout),
            [schematicLayout]
        )
    );

    const {width, height} = schematicLayout.outerBoundary;
    return (
        <canvas ref={canvasRef} width={width} height={height}/>
    );
};

export default FullSchematic;