/**
 * @author WMXPY
 * @namespace Database_Hooks
 * @description Databases
 */

import { IImbricateDatabase } from "@imbricate/core";
import { useEffect, useState } from "react";
import { ImbricateOriginObject, useOrigins } from "../../origin/hooks/use-origins";

export type ImbricateDatabasesObject = {

    readonly originUniqueIdentifier: string;
    readonly originName: string;
    readonly database: IImbricateDatabase;
};

export const useDatabases = (): ImbricateDatabasesObject[] => {

    const origins: ImbricateOriginObject[] = useOrigins();
    const [databases, setDatabases] = useState<ImbricateDatabasesObject[]>([]);

    useEffect(() => {

        if (origins.length === 0) {
            return;
        }

        const execute = async () => {

            console.debug("[Hummingbird] List Databases", origins);

            const response: ImbricateDatabasesObject[] = [];

            for (const origin of origins) {

                const databases = await origin.origin
                    .getDatabaseManager()
                    .listDatabases();

                for (const database of databases) {
                    response.push({
                        originUniqueIdentifier: origin.origin.uniqueIdentifier,
                        originName: origin.originName,
                        database,
                    });
                }
            }

            setDatabases(response);
        };
        execute();
    }, [origins]);

    return databases;
};
