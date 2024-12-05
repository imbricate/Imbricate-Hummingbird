/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Date Value
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, DatePicker } from "@nextui-org/react";
import React, { FC } from "react";
import { FaUnlink } from "react-icons/fa";
import { UIDateToDate, stringDateToUIDate } from "../../util/parse-date";

export type DocumentDateValueProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.DATE>;
    readonly deleteProperty: () => void;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.DATE>) => void;
};

export const DocumentDateValue: FC<DocumentDateValueProps> = (
    props: DocumentDateValueProps,
) => {

    const parsedDate = typeof props.property.value === "string"
        ? stringDateToUIDate(props.property.value)
        : null;

    return (<div
        className="flex gap-1 w-full"
    >
        <div
            className="flex-1"
        >
            <DatePicker
                aria-label="Date picker"
                value={parsedDate}
                onChange={(newDate) => {

                    if (!newDate) {
                        return;
                    }

                    const date = UIDateToDate(newDate);
                    props.updateProperty({
                        type: IMBRICATE_PROPERTY_TYPE.DATE,
                        value: date.toISOString(),
                    });
                }}
            />
        </div>
        {parsedDate !== null && <Button
            variant="flat"
            color="danger"
            isIconOnly
            onClick={props.deleteProperty}
        >
            <FaUnlink
                className="text-large"
            />
        </Button>}
    </div>);
};
