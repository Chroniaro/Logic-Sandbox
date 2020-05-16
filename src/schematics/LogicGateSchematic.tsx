import React, {useContext, useEffect, useRef} from "react";
import Schematic from "./Schematic";
import SchematicRenderContext from "./SchematicRenderContext";
import StandardGateRenderer from "./StandardGateRenderer";
import StandardLinkageRenderer from "./StandardLinkageRenderer";

const SchematicContext = React.createContext<SchematicRenderContext | null>(null);

interface Props {
    schematic: Schematic;
}

const LogicGateSchematic: React.FunctionComponent<Props> = ({schematic}) => {
    const schematicContext = useContext(SchematicContext);
    if (schematicContext === null)
        throw Error("A SchematicRenderContext must be provided to render schematics.");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(
        () => {
            const canvas = canvasRef.current;
            if (canvas === null)
                throw Error("Canvas ref is null.");

            const graphics = canvas.getContext('2d');
            if (graphics === null)
                throw Error("Canvas graphics context is null.");

            schematicContext.render(schematic, graphics);
        },
        [canvasRef, schematicContext, schematic]
    );

    return (
        <canvas className='logic-gate-canvas' ref={canvasRef}/>
    );
};

export default LogicGateSchematic;

interface ContextProps {
    context?: SchematicRenderContext;
}

export const SchematicRenderContextProvider: React.FunctionComponent<ContextProps> = ({context, children}) => {
    let value = context;
    if (value === undefined)
        value = getStandardRenderContext();

    return (
        <SchematicContext.Provider value={value}>
            {children}
        </SchematicContext.Provider>
    );
};

export function getStandardRenderContext() {
    return new SchematicRenderContext(
        {
            'standard': new StandardGateRenderer()
        },
        {
            'standard': new StandardLinkageRenderer()
        }
    );
}