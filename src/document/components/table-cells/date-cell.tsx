/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Date Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { DatePicker } from "@nextui-org/react";
import React, { FC } from "react";
import { UIDateToDate, stringDateToUIDate } from "../../util/parse-date";
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

        return (<DatePicker
            aria-label="Date picker"
            value={stringDateToUIDate(updatedProperty)}
            onChange={(newDate) => {

                if (!newDate) {
                    return;
                }

                const date = UIDateToDate(newDate);
                props.updateEditingProperty(
                    date.toISOString(),
                );
            }}
        />);
    }

    return (<DocumentTableCellContent
        schemaType={IMBRICATE_PROPERTY_TYPE.DATE}
        property={props.property}
        render={(value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE>) => {

            const propertyValue: string | null = value as any;

            if (!propertyValue) {
                return null;
            }

            return (<DatePicker
                aria-label="Date picker"
                value={stringDateToUIDate(propertyValue)}
                isReadOnly
            />);
        }}
    />);
};
