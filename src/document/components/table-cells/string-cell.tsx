/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description String Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { getDefaultValueOfProperty } from "../../util/default-value";

export type DocumentTableStringCellProps = {

    readonly document: IImbricateDocument;
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

    const propertyValue: string = (props.property && typeof props.property.value !== "undefined")
        ? props.property.value
        : getDefaultValueOfProperty(IMBRICATE_PROPERTY_TYPE.STRING);

    return (<div
        className="select-text"
    >
        {propertyValue}
    </div>);
};
