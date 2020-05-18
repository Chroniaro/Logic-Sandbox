import React from "react";
import {Specification} from "../../logic/types";
import SpecificationCard from "./SpecificationCard";
import DragLayer from "./DragLayer";

interface Props {
    specifications: Specification[],

    newSpecification: () => void
}

const BrowserPane: React.FunctionComponent<Props> = ({specifications, newSpecification}) => {
    return (
        <div className='browser'>
            <DragLayer/>

            <button onClick={newSpecification}>+</button>
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

export default BrowserPane;