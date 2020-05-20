import React, {useEffect, useRef} from "react";
import {renderSchematic, SchematicLayout} from "./schematic";
import {nullCheckCanvasRefAndContext} from "../app/util/util";

interface Props {
    schematicLayout: SchematicLayout;
}

const FullSchematic: React.FunctionComponent<Props> = ({schematicLayout}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(
        () => {
            const [, graphics] = nullCheckCanvasRefAndContext(canvasRef);
            renderSchematic(graphics, schematicLayout);
        },
        [schematicLayout]
    );

    const {width, height} = schematicLayout.outerBoundary;
    return (
        <canvas ref={canvasRef} width={width} height={height}/>
    );
};

export default FullSchematic;