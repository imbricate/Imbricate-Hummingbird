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
import { ImbricateOriginObject } from "../../origin/hooks/use-origins";

export type UseDocumentResponse = {

    readonly origin: ImbricateOriginObject;
    readonly database: ImbricateDatabasesObject;
    readonly document: IImbricateDocument;
};

export const useDocument = (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
): UseDocumentResponse | null => {

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
                `get-document-${documentUniqueIdentifier}`,
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

    if (!document || !database) {
        return null;
    }

    return {
        origin: database.origin,
        database,
        document,
    };
};
