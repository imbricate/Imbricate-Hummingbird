/**
 * @author WMXPY
 * @namespace Edit_Editors
 * @description ImbriScript Editor
 */

import * as monaco from "monaco-editor";
import React, { FC, useEffect } from "react";
import { ImbricateOriginObject } from "../../origin/hooks/use-origins";
import { S_TextLoading, S_TextNotFound, S_TextNotInitialized, useText } from "../../text/hooks/use-text";
import { GetValueRef } from "../types/editor-refs";

export type EditImbriscriptEditorProps = {

    readonly getValueRef: GetValueRef;
    readonly onValueChange: () => void;

    readonly origin: ImbricateOriginObject;
    readonly textUniqueIdentifier?: string;
};

export const EditImbriscriptEditor: FC<EditImbriscriptEditorProps> = (props: EditImbriscriptEditorProps) => {

    const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const onboardedRef = React.useRef(false);

    const textContent = useText(
        props.origin.origin.uniqueIdentifier,
        props.textUniqueIdentifier,
    );

    useEffect(() => {

        if (textContent === S_TextLoading
            || textContent === S_TextNotFound
        ) {
            return;
        }

        const editorValue = textContent === S_TextNotInitialized
            ? "// New ImbriScript"
            : textContent.textContent;

        const container = document.getElementById("edit-view-monaco");
        if (!container) {
            return;
        }

        if (onboardedRef.current) {
            return;
        }

        onboardedRef.current = true;
        const editor = monaco.editor.create(container, {
            value: editorValue,
            language: "javascript",
            automaticLayout: true,
            minimap: {
                enabled: false,
            },
            wordWrap: "on",
            wrappingIndent: "same",
        });

        const model = editor.getModel();
        if (!model) {
            return;
        }

        model.onDidChangeContent(() => {
            props.onValueChange();
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
