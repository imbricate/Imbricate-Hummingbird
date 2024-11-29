/**
 * @author WMXPY
 * @namespace Document_Components_PropertyCard
 * @description Property Cards
 */

import { DocumentProperties, ImbricateDatabaseSchema } from "@imbricate/core";
import React from "react";
import { DocumentPropertyCard } from "./property-card";

export type DocumentPropertyCardsProps = {

    readonly schema: ImbricateDatabaseSchema;
    readonly properties: DocumentProperties;
};

export const DocumentPropertyCards: React.FC<DocumentPropertyCardsProps> = (
    props: DocumentPropertyCardsProps,
) => {

    return (<div
        className="flex flex-col gap-2"
    >
        {props.schema.properties.map((propertySchema) => {

            const propertyValue = props.properties[propertySchema.propertyIdentifier];

            return (<DocumentPropertyCard
                key={propertySchema.propertyIdentifier}
                schema={propertySchema}
                property={propertyValue}
            />);
        })}
    </div>);
};
