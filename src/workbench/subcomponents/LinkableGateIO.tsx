import React from "react";
import {useDrag} from "react-dnd";
import GateIO, {IOType} from "../../logic/subcomponents/GateIO";
import InvisibleDiv from "../../app/util/InvisibleDiv";

interface Props {
    ioType: IOType
}

const LinkableGateIO: React.FunctionComponent<Props> = ({ioType}) => {
    const [, dragConnector, previewConnector] = useDrag({
        item: {
            type: 'linkage'
        }
    });

    return (
        <>
            <GateIO
                ioType={ioType}
                ref={dragConnector}
            />
            <InvisibleDiv ref={previewConnector}/>
        </>
    );
};

export default LinkableGateIO;