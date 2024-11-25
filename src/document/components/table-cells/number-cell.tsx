/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Number Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { DocumentEditingController } from "../../controller/editing-controller";
import { getDefaultValueOfProperty } from "../../util/default-value";

export type DocumentTableNumberCellProps = {

    readonly document: IImbricateDocument;
    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.NUMBER>;
    readonly editingController: DocumentEditingController;
    readonly editing: boolean;
};

export const DocumentTableNumberCell: FC<DocumentTableNumberCellProps> = (
    props: DocumentTableNumberCellProps,
) => {

    const propertyValue: number = (props.property && typeof props.property.value !== "undefined")
        ? props.property.value
        : getDefaultValueOfProperty(IMBRICATE_PROPERTY_TYPE.NUMBER);

    if (props.editing) {

        const updatedProperties = props.editingController.getUpdatedProperties(props.document);

        if (!updatedProperties) {
            throw new Error("[Imbricate] Updated property not found");
        }

        const updatedProperty = updatedProperties[props.propertyKey] as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.NUMBER> | undefined;

        const value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.NUMBER> | undefined =
            updatedProperty?.value ?? undefined;

        if (typeof value === "undefined") {
            throw new Error("[Imbricate] Updated property value not found");
        }

        return (<Input
            value={String(value)}
            fullWidth={false}
            onChange={(event) => {

                props.editingController.setUpdatingProperty(
                    props.document,
                    props.propertyKey,
                    event.target.value,
                );
            }}
        />);
    }

    return (<div
        className="select-text"
    >
        {propertyValue}
    </div>);
};
