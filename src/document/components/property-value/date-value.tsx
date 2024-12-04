/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Date Value
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { DatePicker, DateValue } from "@nextui-org/react";
import React, { FC } from "react";
import { UIDateToDate, dateToUIDate } from "../../util/parse-date";

export type DocumentDateValueProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.DATE>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.DATE>) => void;
};

export const DocumentDateValue: FC<DocumentDateValueProps> = (
    props: DocumentDateValueProps,
) => {

    const parsedDate = typeof props.property.value === "string"
        ? dateToUIDate(new Date(props.property.value))
        : undefined;

    return (<DatePicker
        aria-label="Date picker"
        value={parsedDate}
        onChange={(newDate: DateValue) => {

            const date = UIDateToDate(newDate);
            props.updateProperty({
                type: IMBRICATE_PROPERTY_TYPE.DATE,
                value: date.toISOString(),
            });
        }}
    />);
};
