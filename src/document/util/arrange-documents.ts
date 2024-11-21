/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Arrange Documents
 */

import { DocumentPropertyValue, IImbricateDatabase, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { DocumentEditingController } from "../controller/editing-controller";

type ArrangeDocumentsResultItemFloatingProperty = {

    readonly propertyIdentifier: string;
    readonly propertyValue: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
};

export type ArrangeDocumentsResultItem = {

    readonly documentIdentifier: string;
    readonly propertyValueMap: Record<string, DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>>;
    readonly floatingProperties: ArrangeDocumentsResultItemFloatingProperty[];
    readonly editing: boolean;
};

export type ArrangeDocumentsResult = {

    readonly propertyIdentifiers: string[];
    readonly propertyNameMap: Record<string, string>;
    readonly propertyTypesMap: Record<string, IMBRICATE_PROPERTY_TYPE>;
    readonly documents: ArrangeDocumentsResultItem[];
};

export const arrangeDocuments = (
    database: IImbricateDatabase,
    documents: IImbricateDocument[],
    editingController: DocumentEditingController,
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

    const propertyTypesMap: Record<string, IMBRICATE_PROPERTY_TYPE> = database.schema.properties
        .reduce((previous: Record<string, IMBRICATE_PROPERTY_TYPE>, current) => {
            return {
                ...previous,
                [current.propertyIdentifier]: current.propertyType,
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
                editing: editingController.isDocumentEditing(document),
            };
        });

    return {
        propertyIdentifiers,
        propertyNameMap,
        propertyTypesMap,
        documents: documentsResult,
    };
};
