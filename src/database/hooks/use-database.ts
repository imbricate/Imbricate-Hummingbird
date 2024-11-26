/**
 * @author WMXPY
 * @namespace Database_Hooks
 * @description Use Database
 */

import { IImbricateOrigin } from "@imbricate/core";
import { ImbricateDatabasesObject, useDatabases } from "../../database/hooks/use-databases";

export type UseDatabaseResponse = {
    readonly database: ImbricateDatabasesObject;
    readonly origin: IImbricateOrigin;
}

export const useDatabase = (
    databaseUniqueIdentifier: string,
): ImbricateDatabasesObject | null => {

    const databases = useDatabases();

    const targetDatabase = databases.find((database) => {
        return database.database.uniqueIdentifier === databaseUniqueIdentifier;
    });

    return targetDatabase ?? null;
};
