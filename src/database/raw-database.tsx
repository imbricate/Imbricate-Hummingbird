/**
 * @author WMXPY
 * @namespace Database
 * @description Raw Database
 */

import { Button } from "@nextui-org/react";
import React, { FC, useReducer } from "react";
import { useParams } from "react-router-dom";
import { DocumentsTable } from "../document/components/documents-table";
import { useDocuments } from "../document/hooks/use-documents";

export const RawDatabase: FC = () => {

    const [version, updateVersion] = useReducer((x) => x + 1, 0);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;

    const documents = useDocuments(
        databaseUniqueIdentifier,
        version,
    );

    if (!documents.database) {
        return null;
    }

    return <div>
        <div
            className="m-2"
        >
            <h2
                className="text-2xl"
            >
                {documents.database.database.databaseName}
            </h2>
            <Button>
                Create Document
            </Button>
        </div>
        <DocumentsTable
            database={documents.database.database}
            documents={documents.documents}
            forceUpdate={forceUpdate}
            updateVersion={updateVersion}
        />
    </div>;
};
