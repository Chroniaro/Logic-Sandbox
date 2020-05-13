import React from "react";
import {Specification} from "../../logic/types";
import SpecificationCard from "./SpecificationCard";

interface Props {
    specifications: Specification[],

    newSpecification: () => void
}

const BrowserPane: React.FunctionComponent<Props> = ({specifications, newSpecification}) => {
    return (
        <div className='browser'>
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