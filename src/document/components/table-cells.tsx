/**
 * @author WMXPY
 * @namespace Document_Components
 * @description Documents Table Cells
 */

import { TableCell } from "@nextui-org/react";
import React from "react";
import { ArrangeDocumentsResultItem } from "../util/arrange-documents";
import { getDefaultValueOfProperty } from "../util/default-value";
import { DocumentsTableExtraCell } from "./table-cells/extra";

export type DocumentsTableCellsProps = {

    readonly propertyIdentifiers: string[];
    readonly document: ArrangeDocumentsResultItem;
};

export const createDocumentsTableCells = (
    props: DocumentsTableCellsProps,
): JSX.Element[] => {

    return [
        ...props.propertyIdentifiers.map((
            propertyIdentifier: string,
        ) => {

            const property = props.document.propertyValueMap[propertyIdentifier];
            const propertyValue: string = property
                ? property.value
                    ? property.value
                    : getDefaultValueOfProperty(property.type)
                : null;

            return (<TableCell
                key={propertyIdentifier}
            >
                {propertyValue}
            </TableCell>);
        }),
        <TableCell
            key="$extra"
        >
            <DocumentsTableExtraCell
                item={props.document}
            />
        </TableCell>,
    ];
};
