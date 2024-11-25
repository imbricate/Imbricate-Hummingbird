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
import { useText } from "../text/hooks/use-text";
import { useOriginInitialization } from "../origin/hooks/use-initialization";

export const EditView: FC = () => {

    useOriginInitialization();

    const params = useParams();

    const databaseUniqueIdentifier: string = params["database-unique-identifier"] as string;
    const documentUniqueIdentifier: string = params["document-unique-identifier"] as string;
    const propertyUniqueIdentifier: string = params["property-unique-identifier"] as string;

    const text = useText(databaseUniqueIdentifier, documentUniqueIdentifier, propertyUniqueIdentifier);

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
