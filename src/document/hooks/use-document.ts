/**
 * @author WMXPY
 * @namespace Document_Hooks
 * @description Use Document
 */

import { IImbricateDocument } from "@imbricate/core";
import { useEffect, useState } from "react";
import { executeDeduplicate } from "../../common/ongoing/ongoing";
import { useDatabase } from "../../database/hooks/use-database";
import { ImbricateDatabasesObject } from "../../database/hooks/use-databases";

export type UseDocumentResponse = {

    readonly database: ImbricateDatabasesObject | null;
    readonly document: IImbricateDocument | null;
};

export const useDocument = (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
): UseDocumentResponse => {

    const database = useDatabase(
        databaseUniqueIdentifier,
    );

    const [document, setDocument] = useState<IImbricateDocument | null>(null);

    useEffect(() => {

        const execute = async () => {

            if (!database) {
                return;
            }

            const document: IImbricateDocument | null = await executeDeduplicate(
                `get-document-${database.database.uniqueIdentifier}`,
                async () => {
                    const result = await database.database.getDocument(
                        documentUniqueIdentifier,
                    );
                    return result;
                },
            );

            setDocument(document);
        };

        execute();
    }, [database]);

    return {
        database,
        document,
    };
};
