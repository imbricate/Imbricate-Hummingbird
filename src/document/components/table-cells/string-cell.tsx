/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description String Cell
 */

import { DocumentPropertyValue, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { getDefaultValueOfProperty } from "../../util/default-value";
import { DocumentEditingController } from "../../controller/editing-controller";

export type DocumentTableStringCellProps = {

    readonly document: IImbricateDocument;
    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>;
    readonly editingController: DocumentEditingController;
    readonly editing: boolean;
};

export const DocumentTableStringCell: FC<DocumentTableStringCellProps> = (
    props: DocumentTableStringCellProps,
) => {

    const propertyValue: string = (props.property && typeof props.property.value !== "undefined")
        ? props.property.value
        : getDefaultValueOfProperty(IMBRICATE_PROPERTY_TYPE.STRING);

    if (props.editing) {

        const updatedProperty = props.editingController.getUpdatedProperties(props.document);

        console.log(updatedProperty);
        if (!updatedProperty) {
            return null;
        }

        return (<Input
            value={propertyValue}
            fullWidth={false}
        />);
    }

    return (<div
        className="select-text"
    >
        {propertyValue}
    </div>);
};
