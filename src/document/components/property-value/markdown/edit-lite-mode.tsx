/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue_Markdown
 * @description Edit Lite Mode
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, ButtonGroup } from "@nextui-org/react";
import React, { FC } from "react";
import { FaEye } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { openEditWindow, openViewWindow } from "../../../../common/window/window";

export type DocumentMarkdownValueEditLiteModeProps = {

    readonly databaseUniqueIdentifier?: string;
    readonly documentUniqueIdentifier?: string;

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>) => void;
};

export const DocumentMarkdownValueEditLiteMode: FC<DocumentMarkdownValueEditLiteModeProps> = (
    props: DocumentMarkdownValueEditLiteModeProps,
) => {

    return (<div
        className="flex flex-col gap-1 w-full"
    >
        <ButtonGroup>
            <Button
                fullWidth
                startContent={<MdEdit />}
                color="secondary"
                variant="flat"
                onClick={() => {

                    if (!props.databaseUniqueIdentifier || !props.documentUniqueIdentifier) {
                        throw new Error("[Imbricate] Database or document unique identifier not found");
                    }

                    openEditWindow(
                        props.databaseUniqueIdentifier,
                        props.documentUniqueIdentifier,
                        props.propertyKey,
                    );
                }}
            >
                Edit Markdown Document
            </Button>
            <Button
                fullWidth
                startContent={<FaEye />}
                variant="faded"
                onClick={() => {

                    if (!props.databaseUniqueIdentifier || !props.documentUniqueIdentifier) {
                        throw new Error("[Imbricate] Database or document unique identifier not found");
                    }

                    openViewWindow(
                        props.databaseUniqueIdentifier,
                        props.documentUniqueIdentifier,
                        props.propertyKey,
                    );
                }}
            >
                View Markdown Document
            </Button>
        </ButtonGroup>
    </div>);
};
