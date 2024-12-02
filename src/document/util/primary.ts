/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Primary
 */

import { DocumentProperties, ImbricateDatabaseSchema } from "@imbricate/core";

export const getSchemaPrimaryPropertyKey = (
    schema: ImbricateDatabaseSchema,
): string => {

    for (const property of schema.properties) {

        if (property.isPrimaryKey) {
            return property.propertyIdentifier;
        }
    }

    if (schema.properties.length === 0) {
        return null as any;
    }

    return schema.properties[0].propertyIdentifier;
};

export const getDocumentPrimary = (
    schema: ImbricateDatabaseSchema,
    document: DocumentProperties,
): string => {

    const primaryPropertyKey: string = getSchemaPrimaryPropertyKey(schema);

    if (!primaryPropertyKey) {
        return null as any;
    }

    if (typeof document[primaryPropertyKey] !== "object") {
        return null as any;
    }

    const property = document[primaryPropertyKey];
    return String(property.value);
};
