/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit Editors
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import React, { FC } from "react";
import { UsePropertyResponse } from "../property/hooks/use-property";
import { EditImbriscriptEditor } from "./editors/imbriscript-editor";
import { EditJsonEditor } from "./editors/json-editor";
import { EditMarkdownEditor } from "./editors/markdown-editor";
import { GetValueRef } from "./types/editor-refs";

export type EditEditorsProps = {

    readonly usePropertyResponse: UsePropertyResponse;
    readonly getValueRef: GetValueRef;
};

export const EditEditors: FC<EditEditorsProps> = (props: EditEditorsProps) => {

    switch (props.usePropertyResponse.schemaProperty.propertyType) {

        case IMBRICATE_PROPERTY_TYPE.MARKDOWN: {

            const textUniqueIdentifier: string | undefined =
                props.usePropertyResponse.documentProperty
                    ? props.usePropertyResponse.documentProperty.value as string
                    : undefined;

            return (<EditMarkdownEditor
                getValueRef={props.getValueRef}
                origin={props.usePropertyResponse.origin}
                textUniqueIdentifier={textUniqueIdentifier}
            />);
        }
        case IMBRICATE_PROPERTY_TYPE.IMBRISCRIPT: {

            const textUniqueIdentifier: string | undefined =
                props.usePropertyResponse.documentProperty
                    ? props.usePropertyResponse.documentProperty.value as string
                    : undefined;

            return (<EditImbriscriptEditor
                getValueRef={props.getValueRef}
                origin={props.usePropertyResponse.origin}
                textUniqueIdentifier={textUniqueIdentifier}
            />);
        }
        case IMBRICATE_PROPERTY_TYPE.JSON: {

            const textUniqueIdentifier: string | undefined =
                props.usePropertyResponse.documentProperty
                    ? props.usePropertyResponse.documentProperty.value as string
                    : undefined;

            return (<EditJsonEditor
                getValueRef={props.getValueRef}
                origin={props.usePropertyResponse.origin}
                textUniqueIdentifier={textUniqueIdentifier}
            />);
        }
    }

    return (<div>
        Editor Not Found
    </div>);
};
