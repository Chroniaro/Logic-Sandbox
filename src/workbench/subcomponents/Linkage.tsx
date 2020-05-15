import "./Linkage.css";

import React from "react";

interface Props {
    x1: number,
    y1: number,
    x2: number,
    y2: number
}

const Linkage: React.FunctionComponent<Props> = (props) => (
    <svg className="linkage">
        <line {...props} />
    </svg>
);

export default Linkage;