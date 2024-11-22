/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Clone Properties
 */

import { DocumentProperties, ImbricateDatabaseSchema } from "@imbricate/core";
import { getDefaultValueOfProperty } from "./default-value";

export const cloneAndFillDocumentProperties = (
    properties: DocumentProperties,
    schema: ImbricateDatabaseSchema,
): DocumentProperties => {

    const clonedProperties: DocumentProperties = cloneDocumentProperties(properties);

    for (const property of schema.properties) {

        if (clonedProperties[property.propertyIdentifier]) {
            continue;
        }

        clonedProperties[property.propertyIdentifier] = {
            type: property.propertyType,
            value: getDefaultValueOfProperty(property.propertyType),
        };
    }

    return clonedProperties;
};

export const cloneDocumentProperties = (properties: DocumentProperties): DocumentProperties => {

    const keys: string[] = Object.keys(properties);

    const newProperties: DocumentProperties = {};

    for (const key of keys) {

        if (!properties[key]) {
            continue;
        }

        newProperties[key] = {
            type: properties[key].type,
            value: properties[key].value,
        };
    }

    return newProperties;
};
