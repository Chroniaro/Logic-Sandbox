import React, {useMemo} from "react";
import {Point} from "./geometry";
import {getTranslateCSSProperty} from "./util";

interface Props {
    position: Point
}

const DragPreview: React.FunctionComponent<Props> = ({position, children}) => {
    const {x, y} = position;

    const style = useMemo(
        () => ({
            transform: getTranslateCSSProperty(x, y)
        }),
        [x, y]
    );

    return (
        <div className='dragLayer' style={style}>
            {children}
        </div>
    );
}

export default DragPreview;