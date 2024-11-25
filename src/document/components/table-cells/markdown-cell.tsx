/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Markdown Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { getDefaultValueOfProperty } from "../../util/default-value";

export type DocumentTableMarkdownCellProps = {

    readonly document: IImbricateDocument;
    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.MARKDOWN> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.MARKDOWN>) => void;
    readonly editing: boolean;
};

export const DocumentTableMarkdownCell: FC<DocumentTableMarkdownCellProps> = (
    props: DocumentTableMarkdownCellProps,
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
