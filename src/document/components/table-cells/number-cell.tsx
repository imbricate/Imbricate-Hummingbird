/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Number Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { getDefaultValueOfProperty } from "../../util/default-value";

export type DocumentTableNumberCellProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.NUMBER>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.NUMBER> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.NUMBER>) => void;
    readonly editing: boolean;
};

export const DocumentTableNumberCell: FC<DocumentTableNumberCellProps> = (
    props: DocumentTableNumberCellProps,
) => {

    if (props.editing) {

        const updatedProperty = props.getEditingProperty();

        if (typeof updatedProperty === "undefined") {
            throw new Error("[Imbricate] Updated property value not found");
        }

        return (<Input
            value={String(updatedProperty)}
            fullWidth={false}
            onChange={(event) => {

                props.updateEditingProperty(
                    Number(event.target.value),
                );
            }}
        />);
    }

    const propertyValue: number = (props.property && typeof props.property.value !== "undefined")
        ? props.property.value
        : getDefaultValueOfProperty(IMBRICATE_PROPERTY_TYPE.NUMBER);

    return (<div
        className="select-text"
    >
        {propertyValue}
    </div>);
};
