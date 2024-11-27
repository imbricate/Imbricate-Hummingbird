/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Date Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { parseDate } from "@internationalized/date";
import { Checkbox, DatePicker, DateValue } from "@nextui-org/react";
import React, { FC } from "react";
import { DocumentTableCellContent } from "./cell-content";

export type DocumentTableDateCellProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.DATE>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.DATE> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.DATE>) => void;
    readonly editing: boolean;
};

export const DocumentTableDateCell: FC<DocumentTableDateCellProps> = (
    props: DocumentTableDateCellProps,
) => {

    if (props.editing) {

        const updatedProperty = props.getEditingProperty();

        if (typeof updatedProperty === "undefined") {
            throw new Error("[Imbricate] Updated property value not found");
        }

        ;

        return (<DatePicker
            size="lg"
            value={parseDate(new Date().toISOString())}
            onChange={(newDate: DateValue) => {

                alert(newDate);
            }}
        />);
    }

    return (<DocumentTableCellContent
        schemaType={IMBRICATE_PROPERTY_TYPE.BOOLEAN}
        property={props.property}
        render={(value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE>) => {

            const propertyValue: boolean = value as boolean;

            return (<Checkbox
                size="lg"
                isSelected={propertyValue}
                isDisabled
            />);
        }}
    />);
};
