/**
 * @author WMXPY
 * @namespace Database_Hooks
 * @description Databases
 */

import { IImbricateDatabase } from "@imbricate/core";
import { useEffect, useState } from "react";
import { findCache, saveCache } from "../../common/cache/cache";
import { ImbricateOriginObject, useOrigins } from "../../origin/hooks/use-origins";
import { executeDeduplicate } from "../../common/ongoing/ongoing";

const DATABASE_CACHE_IDENTIFIER: string = "databases-use-databases";

export type ImbricateDatabasesObject = {

    readonly originUniqueIdentifier: string;
    readonly originName: string;
    readonly database: IImbricateDatabase;
};

export const useDatabases = (): ImbricateDatabasesObject[] => {

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

            for (const origin of origins) {

                const databases = await executeDeduplicate(
                    `list-databases-${origin.origin.uniqueIdentifier}`,
                    () => origin.origin
                        .getDatabaseManager()
                        .listDatabases(),
                );

                for (const database of databases) {
                    response.push({
                        originUniqueIdentifier: origin.origin.uniqueIdentifier,
                        originName: origin.originName,
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