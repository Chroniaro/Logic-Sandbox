import React, {useCallback} from "react";
import SpecificationCard from "./subcomponents/SpecificationCard";
import {useDispatch, useSelector} from "react-redux";
import {newSpecification, specificationsSelector} from "./interface";
import SpecificationDragPreview from "./subcomponents/SpecificationDragPreview";

const Browser: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const clickHandler = useCallback(
        () => {
            dispatch(newSpecification())
        },
        [dispatch]
    );

    const specifications = useSelector(specificationsSelector);

    return (
        <div className='browser'>
            <SpecificationDragPreview/>
            <button onClick={clickHandler}>+</button>
            {
                specifications.map(specification => (
                    <SpecificationCard
                        key={specification.uuid}
                        specification={specification}
                    />
                ))
            }
        </div>
    );
};

export default Browser;