/**
 * @author WMXPY
 * @namespace Document_Components_TableRows
 * @description Documents Table View Row
 */

import { TableCell } from "@nextui-org/react";
import React from "react";
import { ArrangeDocumentsResultItem } from "../../util/arrange-documents";
import { DocumentsTableExtraCell } from "../table-cells/extra";

export type DocumentsTableViewCellsProps = {

    readonly propertyIdentifiers: string[];
    readonly document: ArrangeDocumentsResultItem;
};

export const createDocumentsTableViewCells = (
    props: DocumentsTableViewCellsProps,
): JSX.Element[] => {

    return [
        ...props.propertyIdentifiers.map((
            propertyIdentifier: string,
        ) => {
            return (<TableCell
                key={propertyIdentifier}
            >
                {props.document.propertyValueMap[propertyIdentifier]?.value ?? "IDN"}
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
