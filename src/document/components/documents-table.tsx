/**
 * @author WMXPY
 * @namespace Document_Components
 * @description Documents Table
 */

import { IImbricateDatabase, IImbricateDocument } from "@imbricate/core";
import { Button, Table, TableBody, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import React, { FC } from "react";
import { MdMore, MdOutlineContentCopy } from "react-icons/md";
import { ArrangeDocumentsResult, ArrangeDocumentsResultItem, arrangeDocuments } from "../util/arrange-documents";
import { createDocumentsTableCells } from "./table-cells";
import { DocumentEditingController } from "../controller/editing-controller";

export type DocumentsTableProps = {

    readonly database: IImbricateDatabase;
    readonly documents: IImbricateDocument[];
};

export const DocumentsTable: FC<DocumentsTableProps> = (
    props: DocumentsTableProps,
) => {

    const editingControllerRef = React.useRef(
        DocumentEditingController.create(props.database),
    );

    if (!props.database.schema) {
        return null;
    }

    const arrangedDocuments: ArrangeDocumentsResult = arrangeDocuments(
        props.database,
        props.documents,
        editingControllerRef.current,
    );

    return (<Table
        removeWrapper
    >
        <TableHeader>
            <React.Fragment>
                {arrangedDocuments.propertyIdentifiers.map((
                    propertyIdentifier: string,
                ) => {
                    return <TableColumn
                        key={propertyIdentifier}
                    >
                        <Tooltip
                            content={<div className="flex gap-1 justify-center items-center">
                                {propertyIdentifier}
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onClick={() => {
                                        navigator.clipboard.writeText(propertyIdentifier);
                                    }}
                                >
                                    <MdOutlineContentCopy />
                                </Button>
                            </div>}
                            delay={1000}
                            placement="bottom"
                        >
                            {arrangedDocuments.propertyNameMap[propertyIdentifier]}
                        </Tooltip>
                    </TableColumn>;
                })}
            </React.Fragment>
            <TableColumn
                className="flex items-center"
            >
                Extra&nbsp;<MdMore />
            </TableColumn>
        </TableHeader>
        <TableBody>
            {arrangedDocuments.documents.map((
                document: ArrangeDocumentsResultItem,
            ) => {

                const cells = createDocumentsTableCells({
                    propertyIdentifiers: arrangedDocuments.propertyIdentifiers,
                    propertyTypesMap: arrangedDocuments.propertyTypesMap,
                    document,
                    editingController: editingControllerRef.current,
                });
                return (<TableRow
                    key={document.documentIdentifier}
                >
                    {cells}
                </TableRow>);
            })}
        </TableBody>
    </Table>);
};
