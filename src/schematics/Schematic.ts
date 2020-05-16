import {Point} from "../app/util/types";

export interface Gate {
    type: string;
    location: Point;
    data: any;
}

export interface GateWithType<Type extends string, Data> extends Gate {
    type: Type;
    data: Data;
}

export interface LinkablePoint {
    gateId: string;
    positionOnGate: Point;
}

export interface Linkage {
    type: string;
    from: LinkablePoint;
    to: LinkablePoint;
}

export interface LinkageWithType<Type extends string> extends Linkage {
    type: Type;
}

export default interface Schematic {
    gates: { [uuid: string]: Gate };
    linkages: Linkage[];
}