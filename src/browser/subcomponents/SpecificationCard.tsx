import React from "react";
import {Specification, SpecificationDragItem} from "../../logic/types";
import {useDrag} from "react-dnd";
import useHiddenPreview from "../../app/util/useHiddenPreview";
import SpecificationPreview from "./SpecificationPreview";

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

    useHiddenPreview(previewConnector);

    return (
        <div
            className='browser-specification-card'
        >
            <div>{specification.name}</div>
            <div ref={dragConnector} className='refHandle'>
                <SpecificationPreview specification={specification}/>
            </div>
        </div>
    );
};

export default SpecificationCard;