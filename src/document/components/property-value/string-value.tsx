/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description String Value
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";

export type DocumentStringValueProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>;
    readonly updateProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.STRING>) => void;
};

export const DocumentStringValue: FC<DocumentStringValueProps> = (
    props: DocumentStringValueProps,
) => {

    return (<Input
        value={props.property.value}
        fullWidth={false}
        onChange={(event) => {

            props.updateProperty(
                event.target.value,
            );
        }}
    />);
};