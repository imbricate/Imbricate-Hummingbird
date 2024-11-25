/**
 * @author WMXPY
 * @namespace Document_Components
 * @description Documents Table
 */

import { IImbricateDatabase, IImbricateDocument } from "@imbricate/core";
import { Button, Table, TableBody, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import { MdMore, MdOutlineContentCopy } from "react-icons/md";
import { DocumentEditingController } from "../controller/editing-controller";
import { ArrangeDocumentsResult, ArrangeDocumentsResultItem, arrangeDocuments } from "../util/arrange-documents";
import { createDocumentsTableCells } from "./table-cells";

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

    return (<div>
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
        <Table
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
                        editingController: editingControllerRef.current!,
                    });
                    return (<TableRow
                        key={document.document.uniqueIdentifier}
                    >
                        {cells}
                    </TableRow>);
                })}
            </TableBody>
        </Table>
    </div>);
};
