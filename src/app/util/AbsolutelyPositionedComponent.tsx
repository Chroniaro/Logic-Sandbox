import React from "react";

interface Props {
    x: number,
    y: number
}

const AbsolutelyPositionedComponent: React.FunctionComponent<Props> = ({x, y, children}) => (
    <span
        style={{
            position: 'absolute',
            left: x,
            top: y
        }}
    >
        {children}
    </span>
);

export default AbsolutelyPositionedComponent;