/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Cell Content
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { IoIosWarning } from "react-icons/io";
import { getDefaultValueOfProperty } from "../../util/default-value";

export type DocumentTableCellContentProps = {

    readonly schemaType: IMBRICATE_PROPERTY_TYPE;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;

    readonly render?: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE>) => React.ReactNode;
};

export const DocumentTableCellContent: FC<DocumentTableCellContentProps> = (
    props: DocumentTableCellContentProps,
) => {

    const propertyValue: number = (props.property && typeof props.property.value !== "undefined")
        ? props.property.value as number
        : getDefaultValueOfProperty(props.schemaType) as number;

    const propsPropertyType: IMBRICATE_PROPERTY_TYPE = props.property
        ? props.property.type
        : props.schemaType;
    const isDiff: boolean = props.schemaType !== propsPropertyType;

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
                    {`Type Mismatch: ${props.schemaType} !== ${propsPropertyType}`}
                </div>
            </PopoverContent>
        </Popover>}

        {props.render ? props.render(propertyValue) : propertyValue}
    </div>);
};
