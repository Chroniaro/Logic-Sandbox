import SchematicRenderContext from "./SchematicRenderContext";
import React, {useContext} from "react";
import StandardGateRenderer from "./StandardGateRenderer";
import StandardLinkageRenderer from "./StandardLinkageRenderer";

const SchematicContext = React.createContext<SchematicRenderContext | null>(null);

interface Props {
    context?: SchematicRenderContext;
}

const SchematicRenderContextProvider: React.FunctionComponent<Props> = ({context, children}) => {
    let value = context;
    if (value === undefined)
        value = getStandardRenderContext();

    return (
        <SchematicContext.Provider value={value}>
            {children}
        </SchematicContext.Provider>
    );
};

export default SchematicRenderContextProvider;

export function useSchematicRenderContext() {
    const schematicContext = useContext(SchematicContext);
    if (schematicContext === null)
        throw Error("A SchematicRenderContext must be provided to render schematics.");

    return schematicContext;
}

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