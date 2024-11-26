/**
 * @author WMXPY
 * @namespace Database_Hooks
 * @description Use Databases
 */

import { IImbricateDatabase } from "@imbricate/core";
import { useEffect, useState } from "react";
import { findCache, saveCache } from "../../common/cache/cache";
import { DATABASE_CACHE_IDENTIFIER } from "../../common/cache/static";
import { executeDeduplicate } from "../../common/ongoing/ongoing";
import { ImbricateOriginObject, useOrigins } from "../../origin/hooks/use-origins";

export type ImbricateDatabasesObject = {

    readonly origin: ImbricateOriginObject;
    readonly database: IImbricateDatabase;
};

export const useDatabases = (
    originUniqueIdentifier?: string,
): ImbricateDatabasesObject[] => {

    const origins: ImbricateOriginObject[] = useOrigins();
    const [databases, setDatabases] = useState<ImbricateDatabasesObject[]>([]);

    const deps: string = origins
        .map((origin: ImbricateOriginObject) => origin.origin.uniqueIdentifier)
        .join("|");

    useEffect(() => {

        if (origins.length === 0) {
            return;
        }

        const cache = findCache<ImbricateDatabasesObject[]>(
            DATABASE_CACHE_IDENTIFIER,
            [deps],
        );
        if (cache) {

            console.debug("[Hummingbird] List Databases (Cache)", origins);

            setDatabases(cache);
            return;
        }

        const execute = async () => {

            const response: ImbricateDatabasesObject[] = [];

            const targetOrigins: ImbricateOriginObject[] = originUniqueIdentifier
                ? origins.filter((origin: ImbricateOriginObject) => origin.origin.uniqueIdentifier === originUniqueIdentifier)
                : origins;

            for (const origin of targetOrigins) {

                const databases = await executeDeduplicate(
                    `list-databases-${origin.origin.uniqueIdentifier}`,
                    () => origin.origin
                        .getDatabaseManager()
                        .listDatabases(),
                );

                for (const database of databases) {
                    response.push({
                        origin,
                        database,
                    });
                }
            }

            saveCache(DATABASE_CACHE_IDENTIFIER, [deps], response);
            setDatabases(response);
        };

        execute();
    }, [deps]);

    return databases;
};
