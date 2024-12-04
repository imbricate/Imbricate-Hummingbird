/**
 * @author WMXPY
 * @namespace Lens_Util
 * @description Prepare Databases
 */

import { executeDeduplicate } from "../../common/ongoing/ongoing";
import { ImbricateDatabasesObject } from "../../database/hooks/use-databases";
import { ImbricateOriginObject } from "../../origin/hooks/use-origins";
import { getOriginStorageInstance } from "../../origin/origin-storage";
import { realizeOrigins } from "../../origin/util/realize-origins";

export const prepareDatabases = async (
    originUniqueIdentifier?: string,
): Promise<ImbricateDatabasesObject[]> => {

    const originInstances = getOriginStorageInstance();

    const origins: ImbricateOriginObject[] = realizeOrigins(originInstances);


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

    return response;
};
