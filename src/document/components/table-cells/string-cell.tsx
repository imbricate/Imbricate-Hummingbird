/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description String Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { DocumentTableCellContent } from "./cell-content";

export type DocumentTableStringCellProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.STRING> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.STRING>) => void;
    readonly editing: boolean;
};

export const DocumentTableStringCell: FC<DocumentTableStringCellProps> = (
    props: DocumentTableStringCellProps,
) => {

    if (props.editing) {

        const updatedProperty = props.getEditingProperty();

        if (typeof updatedProperty === "undefined") {
            throw new Error("[Imbricate] Updated property value not found");
        }

        return (<Input
            value={updatedProperty}
            fullWidth={false}
            onChange={(event) => {

                props.updateEditingProperty(
                    event.target.value,
                );
            }}
        />);
    }

    return (<DocumentTableCellContent
        schemaType={IMBRICATE_PROPERTY_TYPE.STRING}
        property={props.property}
    />);
};
