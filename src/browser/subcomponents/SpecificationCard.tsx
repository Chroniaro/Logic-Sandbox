import React from "react";
import {Specification, SpecificationDragItem} from "../../logic/types";
import {useDrag} from "react-dnd";

interface Props {
    specification: Specification
}

const SpecificationCard: React.FunctionComponent<Props> = ({specification}) => {
    const [, dragRef] = useDrag<SpecificationDragItem, {}, {}>({
        item: {
            type: 'specification',
            specification
        }
    });

    return (
        <div
            className='browser-specification-card'
            ref={dragRef}
        >
            {specification.name}
        </div>
    );
};

export default SpecificationCard;