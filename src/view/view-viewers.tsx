/**
 * @author WMXPY
 * @namespace View
 * @description View Viewers
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import React, { FC } from "react";
import { UsePropertyResponse } from "../property/hooks/use-property";
import { ViewMarkdownViewer } from "./components/viewers/markdown-viewer";

export type ViewViewersProps = {

    readonly usePropertyResponse: UsePropertyResponse;
};

export const ViewViewers: FC<ViewViewersProps> = (props: ViewViewersProps) => {

    switch (props.usePropertyResponse.schemaProperty.propertyType) {

        case IMBRICATE_PROPERTY_TYPE.MARKDOWN: {

            const textUniqueIdentifier: string | undefined =
                props.usePropertyResponse.documentProperty
                    ? props.usePropertyResponse.documentProperty.value as string
                    : undefined;

            return (<ViewMarkdownViewer
                origin={props.usePropertyResponse.origin}
                textUniqueIdentifier={textUniqueIdentifier}
            />);
        }
    }

    return (<div>
        Viewer Not Found
    </div>);
};
