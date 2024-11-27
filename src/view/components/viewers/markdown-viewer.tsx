/**
 * @author WMXPY
 * @namespace View_Components_Viewers
 * @description Markdown Viewer
 */

import React, { FC } from "react";
import { ImbricateOriginObject } from "../../../origin/hooks/use-origins";
import { useText } from "../../../text/hooks/use-text";

export type ViewMarkdownViewerProps = {

    readonly origin: ImbricateOriginObject;
    readonly textUniqueIdentifier?: string;
};

export const ViewMarkdownViewer: FC<ViewMarkdownViewerProps> = (props: ViewMarkdownViewerProps) => {

    const textContent = useText(
        props.origin.origin.uniqueIdentifier,
        props.textUniqueIdentifier,
    );

    if (!textContent) {
        return null;
    }

    return <div>
        {textContent.textContent}
    </div>;
};
