/**
 * @author WMXPY
 * @namespace Database
 * @description Raw Database
 */

import React, { FC, useReducer } from "react";
import { useParams } from "react-router-dom";
import { DocumentsTable } from "../document/components/documents-table";
import { ImbricateDocumentResponse, useDocuments } from "../document/hooks/use-documents";
import { useAsyncTitle } from "../navigation/hooks/use-title";
import { DatabaseHeader } from "./components/database-header";

export const RawDatabase: FC = () => {

    const [version, updateVersion] = useReducer((x) => x + 1, 0);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;

    const documents: ImbricateDocumentResponse = useDocuments(
        databaseUniqueIdentifier,
        version,
    );

    useAsyncTitle(
        () => Boolean(documents.database),
        () => {
            const databaseName: string = documents.database!.database.databaseName;

            return [
                databaseName,
                "Database",
            ];
        },
        [documents.database?.database.databaseName],
    );

    if (!documents.database) {
        return null;
    }

    return <div
        className="h-full flex flex-col"
    >
        <DatabaseHeader
            database={documents.database.database}
        />
        <DocumentsTable
            database={documents.database.database}
            documents={documents.documents}
            forceUpdate={forceUpdate}
            updateVersion={updateVersion}
        />
    </div>;
};
