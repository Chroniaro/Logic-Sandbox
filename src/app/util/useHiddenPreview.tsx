import {useEffect} from "react";
import {ConnectDragPreview} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

export default function useHiddenPreview(previewConnector: ConnectDragPreview) {
    useEffect(
        () => {
            previewConnector(getEmptyImage(), {captureDraggingState: true})
        },
        [previewConnector]
    );
}