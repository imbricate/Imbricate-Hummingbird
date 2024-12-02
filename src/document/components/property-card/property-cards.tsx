/**
 * @author WMXPY
 * @namespace Document_Components_PropertyCard
 * @description Property Cards
 */

import { DocumentProperties, DocumentPropertyKey, DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema } from "@imbricate/core";
import { Button } from "@nextui-org/react";
import React from "react";
import { IoSaveSharp } from "react-icons/io5";
import { UseDocumentResponse } from "../../hooks/use-document";
import { getDefaultValueOfProperty } from "../../util/default-value";
import { DocumentPropertyCard } from "./property-card";

export type DocumentPropertyCardsProps = {

    readonly document: UseDocumentResponse;

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;

    readonly schema: ImbricateDatabaseSchema;
    readonly properties: DocumentProperties;
};

export const DocumentPropertyCards: React.FC<DocumentPropertyCardsProps> = (
    props: DocumentPropertyCardsProps,
) => {

    const [properties, setProperties] = React.useState<DocumentProperties>(() => props.properties);
    const [edited, setEdited] = React.useState<boolean>(false);
    const [saving, setSaving] = React.useState<boolean>(false);

    const updateProperty = (
        key: DocumentPropertyKey,
        value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>,
    ) => {

        const newProperties: DocumentProperties = {
            ...properties,
            [key]: {
                type: value.type,
                value: value.value,
            },
        };
        setProperties(newProperties);

        if (edited) {
            return;
        }
        setEdited(true);
    };

    return (<div
        className="flex flex-col gap-2 py-4 pr-2"
    >
        {props.schema.properties.map((propertySchema) => {

            const propertyValue = properties[propertySchema.propertyIdentifier]
                ?? getDefaultValueOfProperty(propertySchema.propertyType);

            return (<DocumentPropertyCard
                key={propertySchema.propertyIdentifier}
                databaseUniqueIdentifier={props.databaseUniqueIdentifier}
                documentUniqueIdentifier={props.documentUniqueIdentifier}
                schema={propertySchema}
                property={propertyValue}
                updateProperty={(
                    value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>,
                ) => {
                    updateProperty(propertySchema.propertyIdentifier, value);
                }}
            />);
        })}
        {edited && <div>
            <Button
                startContent={<IoSaveSharp />}
                variant="solid"
                color="primary"
                isLoading={saving}
                onClick={async () => {

                    setSaving(true);
                    await props.document.document.putProperties(properties);

                    setSaving(false);
                    setEdited(false);
                }}
            >
                Save Changes
            </Button>
        </ div>}
    </div>);
};
