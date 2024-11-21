/**
 * @author WMXPY
 * @namespace Document_Hooks
 * @description Use Documents
 */

import { IImbricateDocument } from "@imbricate/core";
import { useEffect, useRef, useState } from "react";
import { executeDeduplicate } from "../../common/ongoing/ongoing";
import { ImbricateDatabasesObject, useDatabases } from "../../database/hooks/use-databases";

export type ImbricateDocumentResponse = {

    readonly database: ImbricateDatabasesObject | null;
    readonly documents: IImbricateDocument[];
};

export const useDocuments = (
    databaseUniqueIdentifier: string,
    version: number,
): ImbricateDocumentResponse => {

    const databases = useDatabases();
    const [documents, setDocuments] = useState<IImbricateDocument[]>([]);

    const documentsRef = useRef<string>(databaseUniqueIdentifier);

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
                async () => {
                    const result = await targetDatabase.database.queryDocuments({});
                    return result;
                },
            );

            documentsRef.current = databaseUniqueIdentifier;
            setDocuments(documents);
        };

        execute();
    }, [databaseUniqueIdentifier, targetDatabase, version]);

    if (documentsRef.current !== databaseUniqueIdentifier) {
        return {
            database: targetDatabase ?? null,
            documents: [],
        };
    }

    return {
        database: targetDatabase ?? null,
        documents,
    };
};
