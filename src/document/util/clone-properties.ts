/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Clone Properties
 */

import { DocumentProperties, ImbricateDatabaseSchema, getImbricateDefaultValueOfProperty } from "@imbricate/core";

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
            value: getImbricateDefaultValueOfProperty(property.propertyType),
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
