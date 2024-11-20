/**
 * @author WMXPY
 * @namespace Document_Components
 * @description Documents Table
 */

import { IImbricateDatabase, IImbricateDocument, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { FC } from "react";

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

    return (<Table
        removeWrapper
    >
        <TableHeader>
            {props.database.schema.properties.map((
                schemaProperty: ImbricateDatabaseSchemaProperty,
            ) => {
                return <TableColumn
                    key={schemaProperty.propertyIdentifier}
                >
                    {schemaProperty.propertyName}
                </TableColumn>;
            })}
        </TableHeader>
        <TableBody>
            {props.documents.map((document: IImbricateDocument) => {
                return (<TableRow key={document.uniqueIdentifier}>
                    {props.database.schema.properties.map((
                        schemaProperty: ImbricateDatabaseSchemaProperty,
                    ) => {
                        return <TableCell
                            key={schemaProperty.propertyIdentifier}
                        >
                            {123}
                        </TableCell>;
                    })}
                </TableRow>);
            })}
        </TableBody>
    </Table>);
};
