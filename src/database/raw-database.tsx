/**
 * @author WMXPY
 * @namespace Database
 * @description Raw Database
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { DocumentsTable } from "../document/components/documents-table";
import { useDocuments } from "../document/hooks/use-documents";

export const RawDatabase: FC = () => {

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;

    const documents = useDocuments(
        databaseUniqueIdentifier,
    );

    if (!documents.database) {
        return null;
    }

    return <div>
        <h2
            className="text-2xl"
        >
            {documents.database.database.databaseName}
        </h2>
        <DocumentsTable
            database={documents.database.database}
            documents={documents.documents}
        />
    </div>;
};
