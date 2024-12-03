/**
 * @author WMXPY
 * @namespace Common_Components
 * @description Property Selector
 */

import { DocumentPropertyKey, IImbricateDatabase, IImbricateDocument, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import React, { FC } from "react";
import { CommonPropertyDatabaseSelect } from "./selector/database-selector";
import { CommonPropertyDocumentSelect } from "./selector/document-selector";
import { CommonPropertyPropertySelect } from "./selector/property-selector";

export type CommonPropertySelectResponse = {

    readonly selectedDatabase: IImbricateDatabase;
    readonly selectedDocument: IImbricateDocument;
    readonly selectedProperty: DocumentPropertyKey;
};

export type CommonPropertySelectProps = {

    readonly allowedPropertyType?: IMBRICATE_PROPERTY_TYPE[];

    readonly onSelectConfirm: (response: CommonPropertySelectResponse) => void;
    readonly onSelectCancel: () => void;
};

export const CommonPropertySelect: FC<CommonPropertySelectProps> = (
    props: CommonPropertySelectProps,
) => {

    const [selectedDatabase, setSelectedDatabase] = React.useState<IImbricateDatabase | null>(null);
    const [selectedDocument, setSelectedDocument] = React.useState<IImbricateDocument | null>(null);
    const [selectedProperty, setSelectedProperty] = React.useState<DocumentPropertyKey | null>(null);

    return (<div
        className="flex flex-col gap-2"
    >
        <CommonPropertyDatabaseSelect
            selectedDatabase={selectedDatabase}
            onSelectDatabase={(newDatabase) => {
                props.onSelectCancel();
                setSelectedDocument(null);
                setSelectedDatabase(newDatabase);
            }}
        />
        {selectedDatabase
            && <CommonPropertyDocumentSelect
                databaseUniqueIdentifier={selectedDatabase.uniqueIdentifier}
                databaseSchema={selectedDatabase.schema}
                selectedDocument={selectedDocument}
                onSelectDocument={(newDocument) => {
                    props.onSelectCancel();
                    setSelectedProperty(null);
                    setSelectedDocument(newDocument);
                }}
            />}
        {(selectedDatabase && selectedDocument)
            && <CommonPropertyPropertySelect
                allowedPropertyType={props.allowedPropertyType}
                databaseUniqueIdentifier={selectedDatabase.uniqueIdentifier}
                databaseSchema={selectedDatabase.schema}
                selectedDocument={selectedDocument}
                selectedProperty={selectedProperty}
                onSelectProperty={(newProperty) => {

                    setSelectedProperty(newProperty);
                    props.onSelectConfirm({
                        selectedDatabase: selectedDatabase,
                        selectedDocument: selectedDocument,
                        selectedProperty: newProperty,
                    });
                }}
            />}
    </div>);
};
