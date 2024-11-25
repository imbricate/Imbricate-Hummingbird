/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Boolean Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { getDefaultValueOfProperty } from "../../util/default-value";

export type DocumentTableBooleanCellProps = {

    readonly document: IImbricateDocument;
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

        return (<Input
            value={String(updatedProperty)}
            fullWidth={false}
            onChange={(event) => {

                props.updateEditingProperty(
                    Boolean(event.target.value),
                );
            }}
        />);
    }

    const propertyValue: boolean = (props.property && typeof props.property.value !== "undefined")
        ? props.property.value
        : getDefaultValueOfProperty(IMBRICATE_PROPERTY_TYPE.BOOLEAN);

    return (<div
        className="select-text"
    >
        {propertyValue}
    </div>);
};
