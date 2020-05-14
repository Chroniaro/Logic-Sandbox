import React from "react";
import {Specification, SpecificationDragItem} from "../../logic/types";
import {useDrag} from "react-dnd";
import GateView from "../../logic/subcomponents/GateView";

interface Props {
    specification: Specification
}

const SpecificationCard: React.FunctionComponent<Props> = ({specification}) => {
    const [, dragConnector] = useDrag<SpecificationDragItem, {}, {}>({
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
            <GateView ref={dragConnector} specification={specification}/>
        </div>
    );
};

export default SpecificationCard;