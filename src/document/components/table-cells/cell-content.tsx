/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Cell Content
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { IoIosWarning } from "react-icons/io";
import { getDefaultValueOfProperty } from "../../util/default-value";

export type DocumentTableCellContentProps = {

    readonly schemaType: IMBRICATE_PROPERTY_TYPE;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
};

export const DocumentTableCellContent: FC<DocumentTableCellContentProps> = (
    props: DocumentTableCellContentProps,
) => {

    const propertyValue: number = (props.property && typeof props.property.value !== "undefined")
        ? props.property.value
        : getDefaultValueOfProperty(props.schemaType);

    const isDiff: boolean = props.schemaType !== props.property.type;

    return (<div
        className="select-text flex gap-1 items-center"
    >
        {isDiff && <Popover
            placement="right"
        >
            <PopoverTrigger>
                <Button
                    isIconOnly
                    color="primary"
                    variant="light"
                    size="sm"
                >
                    <IoIosWarning />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div>
                    {`Type Mismatch: ${props.schemaType} !== ${props.property.type}`}
                </div>
            </PopoverContent>
        </Popover>} {propertyValue}
    </div>);
};