/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Boolean Value
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Checkbox } from "@nextui-org/react";
import React, { FC } from "react";

export type DocumentBooleanValueProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.BOOLEAN>;
    readonly updateProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.BOOLEAN>) => void;
};

export const DocumentBooleanValue: FC<DocumentBooleanValueProps> = (
    props: DocumentBooleanValueProps,
) => {

    return (<Checkbox
        size="lg"
        isSelected={props.property.value}
        onChange={(event) => {

            props.updateProperty(
                event.target.checked,
            );
        }}
    />);
};
