/**
 * @author WMXPY
 * @namespace Document_Components
 * @description Documents Table
 */

import { IImbricateDatabase, IImbricateDocument } from "@imbricate/core";
import { Button, Table, TableBody, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import { MdMore } from "react-icons/md";
import { DocumentEditingController } from "../controller/editing-controller";
import { ArrangeDocumentsResult, ArrangeDocumentsResultItem, arrangeDocuments } from "../util/arrange-documents";
import { createDocumentsTableCells } from "./table-cells";
import { createDocumentsTableCellsCreate } from "./table-cells-create";
import { DocumentsTableHeaderCell } from "./table-headers/document-table-header-cell";

export type DocumentsTableProps = {

    readonly database: IImbricateDatabase;
    readonly documents: IImbricateDocument[];

    readonly forceUpdate: () => void;
    readonly updateVersion: () => void;
};

export const DocumentsTable: FC<DocumentsTableProps> = (
    props: DocumentsTableProps,
) => {

    const editingControllerRef = React.useRef<DocumentEditingController>();

    useEffect(() => {

        editingControllerRef.current = DocumentEditingController.create(props.database);
        const disposeStatusChange = editingControllerRef.current.listenStatusChange(() => {
            props.forceUpdate();
        });

        const disposeVersionChange = editingControllerRef.current.listenVersionChange(() => {
            props.updateVersion();
        });

        return () => {
            editingControllerRef.current = undefined;
            disposeStatusChange();
            disposeVersionChange();
        };
    }, [props.database.uniqueIdentifier]);

    if (!props.database.schema) {
        return null;
    }

    if (!editingControllerRef.current) {
        return null;
    }

    const arrangedDocuments: ArrangeDocumentsResult = arrangeDocuments(
        props.database,
        props.documents,
        editingControllerRef.current,
    );

    return (<div
        className="flex flex-col flex-1 min-w-0 min-h-0"
    >
        <div>
            <Button
                className="m-2"
                variant="bordered"
                color="primary"
                onClick={() => {
                    editingControllerRef.current!.startCreatingDocument();
                }}
            >
                Create Document
            </Button>
        </div>
        <div
            className="flex-1 min-w-0 min-h-0"
        >
            <Table
                classNames={{
                    base: "h-full overflow-auto p-1",
                }}
                isHeaderSticky
                aria-label="document-list"
                removeWrapper
                className="overflow-y-auto"
            >
                <TableHeader>
                    <React.Fragment>
                        {arrangedDocuments.propertyIdentifiers.map((
                            propertyIdentifier: string,
                        ) => {
                            return (<TableColumn
                                key={propertyIdentifier}
                            >
                                <DocumentsTableHeaderCell
                                    propertyIdentifier={propertyIdentifier}
                                    arrangedDocuments={arrangedDocuments}
                                />
                            </TableColumn>);
                        })}
                    </React.Fragment>
                    <TableColumn
                        className="flex items-center"
                    >
                        Extra&nbsp;<MdMore />
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {[
                        ...arrangedDocuments.creatingDocuments.map(([documentKey, documentProperties]) => {
                            const cells = createDocumentsTableCellsCreate({
                                propertyIdentifiers: arrangedDocuments.propertyIdentifiers,
                                propertyTypesMap: arrangedDocuments.propertyTypesMap,
                                creatingDocumentKey: documentKey,
                                creatingDocumentProperties: documentProperties,
                                editingController: editingControllerRef.current!,
                            });
                            return (<TableRow
                                key={documentKey}
                            >
                                {cells}
                            </TableRow>);
                        }),
                        ...arrangedDocuments.documents.map((
                            document: ArrangeDocumentsResultItem,
                        ) => {
                            const cells = createDocumentsTableCells({
                                databaseUniqueIdentifier: props.database.uniqueIdentifier,
                                propertyIdentifiers: arrangedDocuments.propertyIdentifiers,
                                propertyTypesMap: arrangedDocuments.propertyTypesMap,
                                document,
                                editingController: editingControllerRef.current!,
                            });
                            return (<TableRow
                                key={document.document.uniqueIdentifier}
                            >
                                {cells}
                            </TableRow>);
                        }),
                    ]}
                </TableBody>
            </Table>
        </div>

    </div>);
};
