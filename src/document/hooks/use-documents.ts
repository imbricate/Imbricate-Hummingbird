/**
 * @author WMXPY
 * @namespace Document_Hooks
 * @description Use Documents
 */

import { IImbricateDocument } from "@imbricate/core";
import { useEffect, useState } from "react";
import { executeDeduplicate } from "../../common/ongoing/ongoing";
import { ImbricateDatabasesObject, useDatabases } from "../../database/hooks/use-databases";

export type ImbricateDocumentResponse = {

    readonly database: ImbricateDatabasesObject | null;
    readonly documents: IImbricateDocument[];
};

export const useDocuments = (
    databaseUniqueIdentifier: string,
): ImbricateDocumentResponse => {

    const databases = useDatabases();
    const [documents, setDocuments] = useState<IImbricateDocument[]>([]);

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

            setDocuments(documents);
        };

        execute();
    }, [databaseUniqueIdentifier, targetDatabase]);

    return {
        database: targetDatabase ?? null,
        documents,
    };
};
