/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Markdown Cell
 */

import { DocumentPropertyValue, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { getDefaultValueOfProperty } from "../../util/default-value";
import { DocumentEditingController } from "../../controller/editing-controller";

export type DocumentTableMarkdownCellProps = {

    readonly document: IImbricateDocument;
    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>;
    readonly editingController: DocumentEditingController;
    readonly editing: boolean;
};

export const DocumentTableMarkdownCell: FC<DocumentTableMarkdownCellProps> = (
    props: DocumentTableMarkdownCellProps,
) => {

    const propertyValue: string = (props.property && typeof props.property.value !== "undefined")
        ? props.property.value
        : getDefaultValueOfProperty(IMBRICATE_PROPERTY_TYPE.STRING);

    if (props.editing) {

        const updatedProperty = props.editingController
            .getUpdatedProperties(props.document);

        if (!updatedProperty) {
            throw new Error("[Imbricate] Updated property not found");
        }

        const value = updatedProperty[props.propertyKey]?.value ?? undefined;

        if (typeof value === "undefined") {
            throw new Error("[Imbricate] Updated property value not found");
        }

        return (<Input
            value={value}
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
