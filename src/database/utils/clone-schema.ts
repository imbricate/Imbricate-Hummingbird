/**
 * @author WMXPY
 * @namespace Database_Utils
 * @description Clone Schema
 */

import { ImbricateDatabaseSchema } from "@imbricate/core";

export const cloneImbricateSchema = (schema: ImbricateDatabaseSchema): ImbricateDatabaseSchema => {

    const clonedProperties = schema.properties.map((property) => {
        return {
            ...property,
        };
    });

    return {
        ...schema,
        properties: clonedProperties,
    };
};
