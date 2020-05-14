import {DragObjectWithType, DropTargetMonitor, useDrop, XYCoord} from "react-dnd";
import React, {useRef} from "react";
import {DropTargetHookSpec} from "react-dnd/lib/interfaces";

export type RelativeDropCallback<DragObject extends DragObjectWithType, DropResult, CollectedProps> =
    (item: DragObject, monitor: DropTargetMonitor, relativeDropPosition: XYCoord) => DropResult | undefined;

export type RelativeDropTargetHookSpec<DragObject extends DragObjectWithType, DropResult, CollectedProps> = {
    [K in keyof DropTargetHookSpec<DragObject, DropResult, CollectedProps>]:
    K extends 'drop' ?
        RelativeDropCallback<DragObject, DropResult, CollectedProps> :
        DropTargetHookSpec<DragObject, DropResult, CollectedProps>[K]
}

export type ConnectRelativeDropTarget = (ref: HTMLElement | null) => React.ReactElement | null;

/**
 * This hook acts like useDrop, except the drop function gets passed two additional parameters
 * representing the x and y coordinates of the drop location in the coordinate frame of the
 * HTML element being used as a target.
 *
 * @param spec A plain javascript object giving additional details about how the target should
 * behave as a drop location.
 */
export function useRelativeDropPosition<DragObject extends DragObjectWithType, DropResult, CollectedProps>
(spec: RelativeDropTargetHookSpec<DragObject, DropResult, CollectedProps>):
    [CollectedProps, ConnectRelativeDropTarget] {

    const componentRef = useRef<HTMLElement>();

    const [collectedProps, dropConnector] = useDrop<DragObject, DropResult, CollectedProps>({
        ...spec,

        drop(item, monitor) {
            const component = componentRef.current;
            if (component === undefined)
                throw Error("Drop occurred while component was not mounted");

            const absoluteDropPosition = monitor.getSourceClientOffset();
            if (absoluteDropPosition === null)
                throw Error("Drop position is undefined");

            const relativeDropPosition = {
                x: absoluteDropPosition.x - component.offsetLeft + component.scrollLeft,
                y: absoluteDropPosition.y - component.offsetTop + component.scrollTop
            };

            if (spec.drop !== undefined)
                return spec.drop(item, monitor, relativeDropPosition);
        }
    });

    const combinedRef: ConnectRelativeDropTarget = ref => {
        if (ref === null)
            componentRef.current = undefined;
        else
            componentRef.current = ref;

        return dropConnector(ref);
    };

    return [collectedProps, combinedRef];
}