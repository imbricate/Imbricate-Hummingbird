/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit View
 */

import { Button, Divider } from "@nextui-org/react";
import * as monaco from "monaco-editor";
import React, { FC, useEffect } from "react";
import { FaRegSave } from "react-icons/fa";
import { useParams } from "react-router-dom";

export const EditView: FC = () => {

    const params = useParams();

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
