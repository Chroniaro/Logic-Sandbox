import React from "react";
import {SpecificationDragItem} from "../types";
import GateView from "./GateView";

interface Props {
    item: SpecificationDragItem
}

const GatePreview: React.FunctionComponent<Props> = ({item}) => (
    <GateView specification={item.specification}/>
);

export default GatePreview;