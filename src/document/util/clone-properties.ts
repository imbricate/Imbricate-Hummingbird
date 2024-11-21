/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Clone Properties
 */

import { DocumentProperties } from "@imbricate/core";

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
