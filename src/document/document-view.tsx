/**
 * @author WMXPY
 * @namespace Document
 * @description Document View
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { DocumentPropertyCards } from "./components/property-card/property-cards";
import { useDocument } from "./hooks/use-document";

export const DocumentView: FC = () => {

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;
    const documentUniqueIdentifier: string =
        params["document-unique-identifier"] as string;

    const document = useDocument(
        databaseUniqueIdentifier,
        documentUniqueIdentifier,
    );

    if (!document) {
        return null;
    }

    return (<div>
        <DocumentPropertyCards
            document={document}
            databaseUniqueIdentifier={databaseUniqueIdentifier}
            documentUniqueIdentifier={documentUniqueIdentifier}
            schema={document.database.database.schema}
            properties={document.document.properties}
        />
    </div>);
};
