/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Boolean Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Checkbox } from "@nextui-org/react";
import React, { FC } from "react";
import { DocumentTableCellContent } from "./cell-content";

export type DocumentTableBooleanCellProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.BOOLEAN>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.BOOLEAN> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.BOOLEAN>) => void;
    readonly editing: boolean;
};

export const DocumentTableBooleanCell: FC<DocumentTableBooleanCellProps> = (
    props: DocumentTableBooleanCellProps,
) => {

    if (props.editing) {

        const updatedProperty = props.getEditingProperty();

        if (typeof updatedProperty === "undefined") {
            throw new Error("[Imbricate] Updated property value not found");
        }

        return (<Checkbox
            size="lg"
            isSelected={updatedProperty}
            onChange={(event) => {

                props.updateEditingProperty(
                    event.target.checked,
                );
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
