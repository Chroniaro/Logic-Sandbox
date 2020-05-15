import React from "react";

const InvisibleDiv = React.forwardRef<HTMLDivElement, {}>((props, forwardRef) => (
    <div
        style={{
            width: '0',
            height: '0',
            margin: '0'
        }}
        ref={forwardRef}
    />
));

export default InvisibleDiv;