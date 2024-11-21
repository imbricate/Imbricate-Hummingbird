/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description String Cell
 */

import { TableCell } from "@nextui-org/react";
import React from "react";
import { ArrangeDocumentsResultItem } from "../../util/arrange-documents";
import { DocumentsTableExtraCell } from "../table-cells/extra";

export type DocumentsTableEditingCellsProps = {

    readonly propertyIdentifiers: string[];
    readonly document: ArrangeDocumentsResultItem;
};

export const createDocumentStringCell = (
    props: DocumentsTableEditingCellsProps,
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
