import React from "react";

export type Style = 'normal' | 'selected' | 'highlighted';

interface Props {
    triangleStyle: Style;
}

const Triangle: React.FunctionComponent<Props> = ({triangleStyle}) => {
    const className = 'triangle triangle--' + triangleStyle;
    const source = 'triangle_' + triangleStyle + '.png';

    return (
        <img
            className={className}
            src={source}
            alt=''
        />
    );
};

export default Triangle;