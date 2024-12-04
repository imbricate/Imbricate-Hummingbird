/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description String Value
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { FaStar } from "react-icons/fa";

export type DocumentStringValueProps = {

    readonly showPropertyName?: boolean;

    readonly propertySchema: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE.STRING>;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>) => void;
};

export const DocumentStringValue: FC<DocumentStringValueProps> = (
    props: DocumentStringValueProps,
) => {

    const propertyName: string = props.propertySchema.propertyName;
    const label = props.showPropertyName
        ? (<div
            className="flex gap-1 items-center"
        >
            {props.propertySchema.isPrimaryKey && <FaStar />}
            {propertyName}
        </div>)
        : undefined;

    return (<Input
        value={props.property.value}
        label={label}
        fullWidth={false}
        onChange={(event) => {

            props.updateProperty({
                type: IMBRICATE_PROPERTY_TYPE.STRING,
                value: event.target.value,
            });
        }}
    />);
};
