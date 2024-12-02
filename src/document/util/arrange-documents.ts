/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Arrange Documents
 */

import { DocumentProperties, DocumentPropertyValue, IImbricateDatabase, IImbricateDocument, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { DocumentEditingController } from "../controller/editing-controller";

type ArrangeDocumentsResultItemFloatingProperty = {

    readonly propertyIdentifier: string;
    readonly propertyValue: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
};

export type ArrangeDocumentsResultItem = {

    readonly document: IImbricateDocument;
    readonly propertyValueMap: Record<string, DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>>;
    readonly floatingProperties: ArrangeDocumentsResultItemFloatingProperty[];
    readonly editing: boolean;
};

export type ArrangeDocumentsResult = {

    readonly propertyIdentifiers: string[];
    readonly propertyNameMap: Record<string, string>;
    readonly propertyTypesMap: Record<string, IMBRICATE_PROPERTY_TYPE>;
    readonly schemaMap: Record<string, ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>>;
    readonly documents: ArrangeDocumentsResultItem[];
    readonly creatingDocuments: Array<[string, DocumentProperties]>;

    readonly primaryPropertyIdentifier?: string;
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

    const schemaMap: Record<string, ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>> = database.schema.properties.reduce((previous, current) => {
        return {
            ...previous,
            [current.propertyIdentifier]: current,
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
                document,
                propertyValueMap,
                floatingProperties,
                editing: editingController.isDocumentEditing(document),
            };
        });

    const creatingDocuments: Array<[string, DocumentProperties]> = editingController.getCreatingDocuments();

    const primaryPropertyIdentifier: string | undefined = database.schema.properties.find((property) => property.isPrimaryKey)?.propertyIdentifier;

    return {
        propertyIdentifiers,
        propertyNameMap,
        propertyTypesMap,
        schemaMap,
        documents: documentsResult,
        creatingDocuments,
        primaryPropertyIdentifier,
    };
};
