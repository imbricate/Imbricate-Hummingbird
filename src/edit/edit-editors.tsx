/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit Editors
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import React, { FC } from "react";
import { UsePropertyResponse } from "../property/hooks/use-property";
import { EditMarkdownEditor } from "./editors/markdown-editor";
import { GetValueRef } from "./types/editor-refs";

export type EditEditorsProps = {

    readonly usePropertyResponse: UsePropertyResponse;
    readonly getValueRef: GetValueRef;
};

export const EditEditors: FC<EditEditorsProps> = (props: EditEditorsProps) => {

    switch (props.usePropertyResponse.schemaProperty.propertyType) {

        case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
            return (<EditMarkdownEditor
                getValueRef={props.getValueRef}
                origin={props.usePropertyResponse.origin}
                textUniqueIdentifier={props.usePropertyResponse.documentProperty.value as string | undefined}
            />);
    }

    return (<div>
        Editor Not Found
    </div>);
};
