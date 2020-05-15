import React from "react";
import {useDrag} from "react-dnd";
import GateIO, {IOType} from "../../logic/subcomponents/GateIO";
import useHiddenPreview from "../../app/util/useHiddenPreview";

interface Props {
    ioType: IOType
}

const LinkableGateIO: React.FunctionComponent<Props> = ({ioType}) => {
    const [, dragConnector, previewConnector] = useDrag({
        item: {
            type: 'linkage'
        }
    });

    useHiddenPreview(previewConnector);

    return (
        <GateIO
            ioType={ioType}
            ref={dragConnector}
        />
    );
};

export default LinkableGateIO;