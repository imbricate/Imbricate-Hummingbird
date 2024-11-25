/**
 * @author WMXPY
 * @namespace Text_Hooks
 * @description Use Text
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { UseDocumentResponse, useDocument } from "../../document/hooks/use-document";

export type UseTextResponse = {

    readonly schemaProperty: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>;
    readonly documentProperty: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
};

export const useText = (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
    propertyUniqueIdentifier: string,
): UseTextResponse | null => {

    const document: UseDocumentResponse = useDocument(
        databaseUniqueIdentifier,
        documentUniqueIdentifier,
    );

    if (!document.document || !document.database) {
        return null;
    }

    const targetProperty = document.database.database.schema.properties.find((property) => {
        return property.propertyIdentifier === propertyUniqueIdentifier;
    });

    if (!targetProperty) {
        return null;
    }

    const relatedProperty = document.document.properties[targetProperty.propertyIdentifier];

    return {
        schemaProperty: targetProperty,
        documentProperty: relatedProperty,
    };
};
