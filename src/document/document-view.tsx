/**
 * @author WMXPY
 * @namespace Document
 * @description Document View
 */

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useNavigateDatabaseDocumentsView } from "../navigation/hooks/use-routes";
import { useAsyncTitle } from "../navigation/hooks/use-title";
import { DocumentPropertyCards } from "./components/property-card/property-cards";
import { useDocument } from "./hooks/use-document";
import { getDocumentPrimary } from "./util/primary";

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

    const navigateToDocuments = useNavigateDatabaseDocumentsView();

    useAsyncTitle(
        () => Boolean(document),
        () => {

            const primary = getDocumentPrimary(
                document!.database.database.schema,
                document!.document.properties,
            );

            return [
                primary,
                "Document",
            ];
        },
        [String(document)],
    );

    if (!document) {
        return null;
    }

    return (<div
        className="h-full overflow-auto"
    >
        <Breadcrumbs
            size="lg"
            className="pt-4"
        >
            <BreadcrumbItem
                onClick={() => {
                    navigateToDocuments(
                        document.database.database.uniqueIdentifier,
                        {
                            replace: true,
                        },
                    );
                }}
            >
                {document.database.database.databaseName}
            </BreadcrumbItem>
            <BreadcrumbItem>
                {document.document.uniqueIdentifier}
            </BreadcrumbItem>
        </Breadcrumbs>
        <DocumentPropertyCards
            document={document}
            databaseUniqueIdentifier={databaseUniqueIdentifier}
            documentUniqueIdentifier={documentUniqueIdentifier}
            schema={document.database.database.schema}
            properties={document.document.properties}
        />
    </div>);
};
