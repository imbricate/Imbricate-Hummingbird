/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Number Value
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";

export type DocumentNumberValueProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.NUMBER>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.NUMBER>) => void;
};

export const DocumentNumberValue: FC<DocumentNumberValueProps> = (
    props: DocumentNumberValueProps,
) => {

    return (<Input
        value={String(props.property.value)}
        fullWidth={false}
        type="number"
        onChange={(event) => {

            props.updateProperty({
                type: IMBRICATE_PROPERTY_TYPE.NUMBER,
                value: Number(event.target.value),
            });
        }}
    />);
};
