/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Markdown Value
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { openEditWindow } from "../../../common/window/window";
import { DocumentMarkdownValueEditFullMode } from "./markdown/edit-full-mode";
import { DocumentMarkdownValueEditLiteMode } from "./markdown/edit-lite-mode";

export type DocumentMarkdownValueProps = {

    readonly liteMode?: boolean;

    readonly databaseUniqueIdentifier?: string;
    readonly documentUniqueIdentifier?: string;

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>) => void;
};

export const DocumentMarkdownValue: FC<DocumentMarkdownValueProps> = (
    props: DocumentMarkdownValueProps,
) => {

    const markdownAlreadyExists = props.property.value?.length > 0;

    if (markdownAlreadyExists) {

        if (props.liteMode) {

            return (<DocumentMarkdownValueEditLiteMode
                databaseUniqueIdentifier={props.databaseUniqueIdentifier}
                documentUniqueIdentifier={props.documentUniqueIdentifier}
                propertyKey={props.propertyKey}
                property={props.property}
                updateProperty={props.updateProperty}
            />);
        }

        return (<DocumentMarkdownValueEditFullMode
            databaseUniqueIdentifier={props.databaseUniqueIdentifier}
            documentUniqueIdentifier={props.documentUniqueIdentifier}
            propertyKey={props.propertyKey}
            property={props.property}
            updateProperty={props.updateProperty}
        />);
    }

    return (<Button
        fullWidth
        startContent={<MdAddCircleOutline />}
        color="primary"
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
        Create Markdown Document
    </Button>);
};
