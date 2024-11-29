/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Markdown Value
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, ButtonGroup, Tooltip } from "@nextui-org/react";
import React, { FC } from "react";
import { FaEye } from "react-icons/fa6";
import { MdAddCircleOutline, MdEdit } from "react-icons/md";
import { CommonCopyItem } from "../../../common/components/copy-item";
import { openEditWindow, openViewWindow } from "../../../common/window/window";

export type DocumentMarkdownValueProps = {

    readonly databaseUniqueIdentifier?: string;
    readonly documentUniqueIdentifier?: string;

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>;
    readonly updateProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.MARKDOWN>) => void;
};

export const DocumentMarkdownValue: FC<DocumentMarkdownValueProps> = (
    props: DocumentMarkdownValueProps,
) => {

    const markdownAlreadyExists = props.property.value.length > 0;

    if (markdownAlreadyExists) {

        return (<Tooltip
            content={<CommonCopyItem
                startContent="Text Unique Identifier"
                content={props.property.value}
            />}
            delay={1000}
            placement="bottom"
        >
            <ButtonGroup
                color="default"
                size="sm"
                variant="flat"
            >
                <Button
                    startContent={<MdEdit />}
                    color="secondary"
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
                    Markdown
                </Button>
                <Button
                    isIconOnly
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
                    <FaEye />
                </Button>
            </ButtonGroup>
        </Tooltip>);
    }

    return (<Button
        startContent={<MdAddCircleOutline />}
        color="primary"
        size="sm"
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
        Markdown
    </Button>);
};
