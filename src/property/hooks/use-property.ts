/**
 * @author WMXPY
 * @namespace Property_Hooks
 * @description Use Property
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { UseDocumentResponse, useDocument } from "../../document/hooks/use-document";
import { ImbricateOriginObject } from "../../origin/hooks/use-origins";

export type UsePropertyResponse = {

    readonly origin: ImbricateOriginObject;
    readonly document: UseDocumentResponse;

    readonly schemaProperty: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>;
    readonly documentProperty: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
};

export const useProperty = (
    databaseUniqueIdentifier: string,
    documentUniqueIdentifier: string,
    propertyUniqueIdentifier: string,
): UsePropertyResponse | null => {

    const document: UseDocumentResponse | null = useDocument(
        databaseUniqueIdentifier,
        documentUniqueIdentifier,
    );

    if (!document) {
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
        origin: document.origin,
        document: document,
        schemaProperty: targetProperty,
        documentProperty: relatedProperty,
    };
};
