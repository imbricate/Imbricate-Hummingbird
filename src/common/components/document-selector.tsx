/**
 * @author WMXPY
 * @namespace Common_Components
 * @description Document Selector
 */

import { IImbricateDatabase, IImbricateDocument } from "@imbricate/core";
import React, { FC } from "react";
import { CommonPropertyDatabaseSelect, CommonPropertyDatabaseSelectSelectedDatabase } from "./selector/database-selector";
import { CommonPropertyDocumentSelect } from "./selector/document-selector";

export type CommonDocumentSelectResponse = {

    readonly selectedOriginUniqueIdentifier: string;
    readonly selectedDatabase: IImbricateDatabase;
    readonly selectedDocument: IImbricateDocument;
};

export type CommonDocumentSelectProps = {

    readonly allowedDatabases?: string[];
    readonly filterDocument?: (document: IImbricateDocument) => boolean;

    readonly onSelectConfirm: (response: CommonDocumentSelectResponse) => void;
    readonly onSelectCancel: () => void;
};

export const CommonDocumentSelect: FC<CommonDocumentSelectProps> = (
    props: CommonDocumentSelectProps,
) => {

    const [selectedDatabase, setSelectedDatabase] = React.useState<CommonPropertyDatabaseSelectSelectedDatabase | null>(null);
    const [selectedDocument, setSelectedDocument] = React.useState<IImbricateDocument | null>(null);

    return (<div
        className="flex flex-col gap-2 w-full"
    >
        <CommonPropertyDatabaseSelect
            allowedDatabases={props.allowedDatabases}
            selectedDatabase={selectedDatabase ? selectedDatabase.selectedDatabase : null}
            onSelectDatabase={(newDatabase) => {
                props.onSelectCancel();
                setSelectedDocument(null);
                setSelectedDatabase(newDatabase);
            }}
        />
        {selectedDatabase
            && <CommonPropertyDocumentSelect
                filterDocument={props.filterDocument}
                databaseUniqueIdentifier={selectedDatabase.selectedDatabase.uniqueIdentifier}
                databaseSchema={selectedDatabase.selectedDatabase.schema}
                selectedDocument={selectedDocument}
                onSelectDocument={(newDocument) => {
                    setSelectedDocument(newDocument);
                    props.onSelectConfirm({
                        selectedOriginUniqueIdentifier: selectedDatabase.selectedOriginUniqueIdentifier,
                        selectedDatabase: selectedDatabase.selectedDatabase,
                        selectedDocument: newDocument,
                    });
                }}
            />}
    </div>);
};
