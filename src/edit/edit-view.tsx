/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit View
 */

import { Button, Divider } from "@nextui-org/react";
import * as monaco from "monaco-editor";
import React, { FC, useEffect } from "react";
import { FaRegSave } from "react-icons/fa";
import { useText } from "../text/hooks/use-text";

export type EditViewProps = {

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;
    readonly propertyUniqueIdentifier: string;
};

export const EditView: FC<EditViewProps> = (props: EditViewProps) => {

    const text = useText(
        props.databaseUniqueIdentifier,
        props.documentUniqueIdentifier,
        props.propertyUniqueIdentifier,
    );

    console.log(text);

    const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const onboardedRef = React.useRef(false);

    useEffect(() => {

        const container = document.getElementById("edit-view-monaco");
        if (!container) {
            return;
        }

        if (onboardedRef.current) {
            return;
        }
        onboardedRef.current = true;
        const editor = monaco.editor.create(container, {
            value: "test",
            language: "markdown",
            automaticLayout: true,
            minimap: {
                enabled: false,
            },
        });

        editorRef.current = editor;

        return () => {
            editor.dispose();

            editorRef.current = null;
            onboardedRef.current = false;
        };
    }, []);

    return <div className="h-screen flex flex-col">
        <div
            className="m-2 flex items-center"
        >
            <div className="flex-1">
                Edit
            </div>
            <Button
                variant="solid"
                size="sm"
                color="primary"
                startContent={<FaRegSave />}
                onClick={() => {
                    if (!editorRef.current) {
                        return null;
                    }

                    console.log(editorRef.current.getValue());
                }}
            >
                Save
            </Button>
        </div>
        <Divider />
        <div
            id="edit-view-monaco"
            className="flex-1"
        />
    </div>;
};
