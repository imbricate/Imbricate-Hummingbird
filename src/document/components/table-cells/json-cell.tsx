/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description JSON Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger, Tooltip } from "@nextui-org/react";
import React, { FC } from "react";
import { FaEye } from "react-icons/fa6";
import { MdAddCircleOutline, MdEdit, MdOutlineInfo } from "react-icons/md";
import { CommonCopyItem } from "../../../common/components/copy-item";
import { openEditWindow, openViewWindow } from "../../../common/window/window";
import { DocumentTableCellContent } from "./cell-content";

export type DocumentTableJsonCellProps = {

    readonly databaseUniqueIdentifier?: string;
    readonly documentUniqueIdentifier?: string;

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.JSON>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.JSON> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.JSON>) => void;
    readonly editing: boolean;
};

export const DocumentTableJsonCell: FC<DocumentTableJsonCellProps> = (
    props: DocumentTableJsonCellProps,
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
                    JSON property is not editable, please edit the JSON file directly after saving the document.
                </PopoverContent>
            </Popover>
        </div>);
    }

    return (<DocumentTableCellContent
        schemaType={IMBRICATE_PROPERTY_TYPE.JSON}
        property={props.property}
        render={(value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE>) => {

            const fileAlreadyExists = typeof value === "string" && value.length > 0;

            if (fileAlreadyExists) {

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
                            JSON
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
                JSON
            </Button>);
        }}
    />);
};
