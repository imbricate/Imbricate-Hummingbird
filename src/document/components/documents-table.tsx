/**
 * @author WMXPY
 * @namespace Document_Components
 * @description Documents Table
 */

import { IImbricateDatabase, IImbricateDocument } from "@imbricate/core";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { FC } from "react";
import { arrangeDocuments } from "../util/arrange-documents";

export type DocumentsTableProps = {

    readonly database: IImbricateDatabase;
    readonly documents: IImbricateDocument[];
};

export const DocumentsTable: FC<DocumentsTableProps> = (
    props: DocumentsTableProps,
) => {

    if (!props.database.schema) {
        return null;
    }

    const arrangedDocuments = arrangeDocuments(
        props.database,
        props.documents,
    );

    console.log(arrangedDocuments);

    return (<Table
        removeWrapper
    >
        <TableHeader>
            {arrangedDocuments.propertyIdentifiers.map((
                propertyIdentifier: string,
            ) => {
                return <TableColumn
                    key={propertyIdentifier}
                >
                    {arrangedDocuments.propertyNameMap[propertyIdentifier]}
                </TableColumn>;
            })}
        </TableHeader>
        <TableBody>
            {arrangedDocuments.documents.map((document) => {
                return (<TableRow key={document.documentIdentifier}>
                    {arrangedDocuments.propertyIdentifiers.map((
                        propertyIdentifier: string,
                    ) => {
                        return (<TableCell
                            key={propertyIdentifier}
                        >
                            {document.propertyValueMap[propertyIdentifier].value}
                        </TableCell>);
                    })}
                </TableRow>);
            })}
        </TableBody>
    </Table>);
};
