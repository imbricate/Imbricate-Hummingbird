/**
 * @author WMXPY
 * @namespace Edit_Editors
 * @description Markdown Editor
 */

import * as monaco from "monaco-editor";
import React, { FC, useEffect } from "react";
import { useText } from "../../text/hooks/use-text";

export type EditMarkdownEditorProps = {

    readonly getValueRef: React.MutableRefObject<(() => any) | null>;
    readonly originUniqueIdentifier: string;
    readonly textUniqueIdentifier?: string;
};

export const EditMarkdownEditor: FC<EditMarkdownEditorProps> = (props: EditMarkdownEditorProps) => {

    const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const onboardedRef = React.useRef(false);

    const textContent = useText(
        props.originUniqueIdentifier,
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
        });

        editorRef.current = editor;

        props.getValueRef.current = () => editor.getValue();

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
