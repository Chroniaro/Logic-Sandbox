import React from "react";
import Triangle, {Style} from "./Triangle";

interface Props {
    styles: Style[]
}

const RowOfTriangles: React.FunctionComponent<Props> = ({styles}) => {
    return (
        <div className='row-of-triangles'> {
            styles.map((style, index) => (
                <Triangle key={index} triangleStyle={style}/>
            ))
        } </div>
    );
};

export default RowOfTriangles;