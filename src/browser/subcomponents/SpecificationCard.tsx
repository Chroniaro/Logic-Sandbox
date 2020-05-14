import React, {useEffect} from "react";
import {Specification, SpecificationDragItem} from "../../logic/types";
import {useDrag} from "react-dnd";
import GateView from "../../logic/subcomponents/GateView";
import {getEmptyImage} from "react-dnd-html5-backend";

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

    useEffect(() => {
        previewConnector(getEmptyImage(), {captureDraggingState: true})
    }, [previewConnector]);

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