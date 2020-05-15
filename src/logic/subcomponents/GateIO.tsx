import React from "react";

export type IOType = 'input' | 'output';

interface Props {
    ioType: IOType;
}

const GateIO = React.forwardRef<HTMLImageElement, Props>(({ioType}, forwardRef) => (
    <img
        ref={forwardRef}
        className={'gate-' + ioType}
        src={ioType + '.png'}
        alt=''
    />
));

export default GateIO;