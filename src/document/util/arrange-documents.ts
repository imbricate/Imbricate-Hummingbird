/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Arrange Documents
 */

import { DocumentPropertyValue, IImbricateDatabase, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";

type ArrangeDocumentsResultItemFloatingProperty = {

    readonly propertyIdentifier: string;
    readonly propertyValue: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
};

type ArrangeDocumentsResultItem = {

    readonly documentIdentifier: string;
    readonly propertyValueMap: Record<string, DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>>;
    readonly floatingProperties: ArrangeDocumentsResultItemFloatingProperty[];
};

export type ArrangeDocumentsResult = {

    readonly propertyIdentifiers: string[];
    readonly propertyNameMap: Record<string, string>;
    readonly documents: ArrangeDocumentsResultItem[];
};

export const arrangeDocuments = (
    database: IImbricateDatabase,
    documents: IImbricateDocument[],
): ArrangeDocumentsResult => {

    const propertyIdentifiers: string[] = database.schema.properties
        .map((property) => property.propertyIdentifier);

    const propertyNameMap: Record<string, string> = database.schema.properties
        .reduce((previous: Record<string, string>, current) => {
            return {
                ...previous,
                [current.propertyIdentifier]: current.propertyName,
            };
        }, {});

    const documentsResult: ArrangeDocumentsResultItem[] = documents
        .map((document): ArrangeDocumentsResultItem => {

            const propertyValueMap: Record<string, DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>> = database.schema.properties
                .reduce((
                    previous: Record<string, DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>>,
                    current,
                ) => {
                    return {
                        ...previous,
                        [current.propertyIdentifier]: document.properties[current.propertyIdentifier],
                    };
                }, {});

            const floatingProperties = Object.keys(document.properties)
                .filter((key) => !propertyIdentifiers.includes(key))
                .map((key) => ({
                    propertyIdentifier: key,
                    propertyValue: document.properties[key],
                }));

            return {
                documentIdentifier: document.uniqueIdentifier,
                propertyValueMap,
                floatingProperties,
            };
        });

    return {
        propertyIdentifiers,
        propertyNameMap,
        documents: documentsResult,
    };
};