/**
 * @author WMXPY
 * @namespace Document_Hooks
 * @description Use Documents
 */

import { IImbricateDocument } from "@imbricate/core";
import { useEffect, useState } from "react";
import { executeDeduplicate } from "../../common/ongoing/ongoing";
import { useDatabases } from "../../database/hooks/use-databases";

export type ImbricateDocumentObject = {

    readonly document: IImbricateDocument;
};

export const useDocuments = (
    databaseUniqueIdentifier: string,
): ImbricateDocumentObject[] => {

    const databases = useDatabases();
    const [documents, setDocuments] = useState<ImbricateDocumentObject[]>([]);

    const targetDatabase = databases.find((database) => {
        return database.database.uniqueIdentifier === databaseUniqueIdentifier;
    });

    useEffect(() => {

        const execute = async () => {

            if (!targetDatabase) {
                return;
            }

            const documents: IImbricateDocument[] = await executeDeduplicate(
                `list-documents-${targetDatabase.database.uniqueIdentifier}`,
                () => {
                    return targetDatabase.database.queryDocuments({});
                },
            );

            const response: ImbricateDocumentObject[] = documents.map((document: IImbricateDocument) => {

                return {
                    document,
                };
            });

            setDocuments(response);
        };

        execute();
    }, [databaseUniqueIdentifier, targetDatabase]);

    return documents;
};
