/**
 * @author WMXPY
 * @namespace Document_Components_PropertyCard
 * @description Property Cards
 */

import { DocumentProperties, DocumentPropertyKey, DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema } from "@imbricate/core";
import React from "react";
import { getDefaultValueOfProperty } from "../../util/default-value";
import { DocumentPropertyCard } from "./property-card";

export type DocumentPropertyCardsProps = {

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

    const updateProperty = (
        key: DocumentPropertyKey,
        value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>,
    ) => {

        console.log(key, value);

        setProperties({
            ...properties,
            [key]: value,
        });

        if (edited) {
            return;
        }
        setEdited(true);
    };

    return (<div
        className="flex flex-col gap-2"
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
    </div>);
};
