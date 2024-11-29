/**
 * @author WMXPY
 * @namespace Database
 * @description Raw Database
 */

import React, { FC, useReducer } from "react";
import { useParams } from "react-router-dom";
import { DocumentsTable } from "../document/components/documents-table";
import { ImbricateDocumentResponse, useDocuments } from "../document/hooks/use-documents";
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

    if (!documents.database) {
        return null;
    }

    return <div>
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
