import React from "react";
import {Specification, SpecificationDragItem} from "../../logic/types";
import {useDrag} from "react-dnd";
import GatePreview from "../../logic/subcomponents/GatePreview";
import InvisibleDiv from "../../app/util/InvisibleDiv";

interface Props {
    specification: Specification
}

const SpecificationCard: React.FunctionComponent<Props> = ({specification}) => {
    const [, dragConnector, previewConnector] = useDrag<SpecificationDragItem, {}, {}>({
        item: {
            type: 'specification',
            specification
        }
    });

    return (
        <div
            className='browser-specification-card'
        >
            <div>{specification.name}</div>
            <GatePreview ref={dragConnector} specification={specification}/>
            <InvisibleDiv ref={previewConnector}/>
        </div>
    );
};

export default SpecificationCard;