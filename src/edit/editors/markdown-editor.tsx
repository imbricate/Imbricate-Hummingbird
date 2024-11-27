/**
 * @author WMXPY
 * @namespace Edit_Editors
 * @description Markdown Editor
 */

import * as monaco from "monaco-editor";
import React, { FC, useEffect } from "react";
import { ImbricateOriginObject } from "../../origin/hooks/use-origins";
import { useText } from "../../text/hooks/use-text";
import { GetValueRef } from "../types/editor-refs";

export type EditMarkdownEditorProps = {

    readonly getValueRef: GetValueRef;
    readonly origin: ImbricateOriginObject;
    readonly textUniqueIdentifier?: string;
};

export const EditMarkdownEditor: FC<EditMarkdownEditorProps> = (props: EditMarkdownEditorProps) => {

    const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const onboardedRef = React.useRef(false);

    const textContent = useText(
        props.origin.origin.uniqueIdentifier,
        props.textUniqueIdentifier,
    );

    useEffect(() => {

        if (!textContent) {
            return;
        }

        const container = document.getElementById("edit-view-monaco");
        if (!container) {
            return;
        }

        if (onboardedRef.current) {
            return;
        }

        onboardedRef.current = true;
        const editor = monaco.editor.create(container, {
            value: textContent.textContent,
            language: "markdown",
            automaticLayout: true,
            minimap: {
                enabled: false,
            },
            wordWrap: "on",
            wrappingIndent: "same",
        });

        editorRef.current = editor;

        props.getValueRef.current = async () => {

            const updatedTextContent = editor.getValue();

            const createdText = await props.origin.origin.getTextManager()
                .createText(updatedTextContent);

            return createdText.uniqueIdentifier;
        };

        return () => {
            editor.dispose();

            editorRef.current = null;
            onboardedRef.current = false;

            props.getValueRef.current = null;
        };
    }, [textContent]);

    return <div
        id="edit-view-monaco"
        className="flex-1"
    />;
};
