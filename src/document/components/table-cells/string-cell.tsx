/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description String Cell
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Input } from "@nextui-org/react";
import React, { FC } from "react";
import { getDefaultValueOfProperty } from "../../util/default-value";

export type DocumentTableStringCellProps = {

    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>;
    readonly editing: boolean;
};

export const DocumentTableStringCell: FC<DocumentTableStringCellProps> = (
    props: DocumentTableStringCellProps,
) => {

    const propertyValue: string = (props.property && typeof props.property.value !== "undefined")
        ? props.property.value
        : getDefaultValueOfProperty(IMBRICATE_PROPERTY_TYPE.STRING);

    if (props.editing) {

        return (<Input
            value={propertyValue}
            fullWidth={false}
        />);
    }

    return (<React.Fragment>
        {propertyValue}
    </React.Fragment>);
};
