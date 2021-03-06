import {Point} from "../util/geometry";
import {LinkageLayout} from "./schematic";

export interface StandardLinkage {
    type: 'standard';
    data: {
        from: Point;
        to: Point;
    }
}

export interface StandardLinkageLayout {
    type: 'standard';
    data: {
        from: Point;
        to: Point;
    }
}

export function getStandardLinkageLayout(linkage: StandardLinkage): StandardLinkageLayout {
    return linkage;
}

export function renderStandardLinkage(graphics: CanvasRenderingContext2D, layout: LinkageLayout) {
    graphics.save();

    const {from, to} = layout.data;

    graphics.strokeStyle = 'black';
    graphics.lineWidth = 3;

    graphics.beginPath();
    graphics.moveTo(from.x, from.y);
    graphics.lineTo(to.x, to.y);
    graphics.stroke();

    graphics.restore();
}