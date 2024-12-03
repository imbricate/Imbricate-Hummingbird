/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Primary
 */

import { DocumentProperties, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema } from "@imbricate/core";

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

    for (const property of schema.properties) {
        if (property.propertyType === IMBRICATE_PROPERTY_TYPE.STRING) {
            return property.propertyIdentifier;
        }
    }

    return schema.properties[0].propertyIdentifier;
};

export const getDocumentPrimary = (
    schema: ImbricateDatabaseSchema,
    document: DocumentProperties,
): string | null => {

    const primaryPropertyKey: string = getSchemaPrimaryPropertyKey(schema);

    if (!primaryPropertyKey) {
        return null;
    }

    if (typeof document[primaryPropertyKey] !== "object") {
        return null;
    }

    const property = document[primaryPropertyKey];
    return String(property.value);
};
