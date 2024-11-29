/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Boolean Value
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Checkbox } from "@nextui-org/react";
import React, { FC } from "react";

export type DocumentBooleanValueProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.BOOLEAN>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.BOOLEAN>) => void;
};

export const DocumentBooleanValue: FC<DocumentBooleanValueProps> = (
    props: DocumentBooleanValueProps,
) => {

    return (<Checkbox
        size="lg"
        isSelected={props.property.value}
        onChange={(event) => {

            props.updateProperty({
                type: IMBRICATE_PROPERTY_TYPE.BOOLEAN,
                value: event.target.checked,
            });
        }}
    />);
};
