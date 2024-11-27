/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Markdown Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger, Tooltip } from "@nextui-org/react";
import React, { FC } from "react";
import { FaEye } from "react-icons/fa6";
import { MdAddCircleOutline, MdEdit, MdOutlineInfo } from "react-icons/md";
import { CommonCopyItem } from "../../../common/components/copy-item";
import { openEditWindow, openViewWindow } from "../../../common/window/window";
import { DocumentTableCellContent } from "./cell-content";

export type DocumentTableMarkdownCellProps = {

    readonly databaseUniqueIdentifier?: string;
    readonly documentUniqueIdentifier?: string;

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.MARKDOWN> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.MARKDOWN>) => void;
    readonly editing: boolean;
};

export const DocumentTableMarkdownCell: FC<DocumentTableMarkdownCellProps> = (
    props: DocumentTableMarkdownCellProps,
) => {

    if (props.editing) {

        return (<div
            className="flex items-center gap-1"
        >
            <div>
                N/A
            </div>
            <Popover
                placement="left"
            >
                <PopoverTrigger>
                    <Button
                        isIconOnly
                        color="primary"
                        variant="light"
                        size="sm"
                    >
                        <MdOutlineInfo />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    Markdown property is not editable, please edit the markdown file directly after saving the document.
                </PopoverContent>
            </Popover>
        </div>);
    }

    return (<DocumentTableCellContent
        schemaType={IMBRICATE_PROPERTY_TYPE.MARKDOWN}
        property={props.property}
        render={(value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE>) => {

            const markdownAlreadyExists = typeof value === "string" && value.length > 0;

            if (markdownAlreadyExists) {

                return (<Tooltip
                    content={<CommonCopyItem
                        startContent="Text Unique Identifier"
                        content={value as string}
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
        }}
    />);
};
