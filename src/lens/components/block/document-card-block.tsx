/**
 * @author WMXPY
 * @namespace Lens_Components_Block
 * @description Document Card Block
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { Card, CardBody } from "@nextui-org/react";
import React, { FC } from "react";
import { DocumentPropertyCardContent } from "../../../document/components/property-card/property-card-content";
import { UseDocumentResponse } from "../../../document/hooks/use-document";
import { LensBlockDateDocumentCard } from "../../types/lens-definition";

export type LensDocumentCardBlockProps = {

    readonly block: LensBlockDateDocumentCard;
    readonly document: UseDocumentResponse;
};

export const LensDocumentCardBlock: FC<LensDocumentCardBlockProps> = (
    props: LensDocumentCardBlockProps,
) => {

    const document = props.document;

    return (<Card
        shadow="none"
        className="border-1"
    >
        <CardBody
            className="flex flex-col gap-2"
        >
            {document.database.database.schema.properties.map((
                schemaProperty: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>,
            ) => {

                const propertyValue = document.document
                    .properties[schemaProperty.propertyIdentifier];

                return (<div
                    key={schemaProperty.propertyIdentifier}
                    className="flex gap-2"
                >
                    <div
                        className="flex-1"
                    >
                        {schemaProperty.propertyName}
                    </div>
                    <div
                        className="flex-[4]"
                    >
                        <DocumentPropertyCardContent
                            databaseUniqueIdentifier={props.block.database}
                            documentUniqueIdentifier={props.block.document}
                            schema={schemaProperty}
                            property={propertyValue}
                            updateProperty={() => {
                                // Do nothing
                            }}
                        />
                    </div>
                </div>);
            })}
        </CardBody>
    </Card>);
};
