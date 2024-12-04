/**
 * @author WMXPY
 * @namespace Lens_Components_Block
 * @description Document Card Block
 */

import { DocumentProperties, DocumentPropertyKey, DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty, getImbricateDefaultValueOfProperty } from "@imbricate/core";
import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { IoSaveSharp } from "react-icons/io5";
import { DocumentPropertyCardContent } from "../../../document/components/property-card/property-card-content";
import { UseDocumentResponse } from "../../../document/hooks/use-document";
import { getPropertyIcon } from "../../../property/utils/get-icon";
import { LensBlockDateDocumentCard } from "../../types/lens-definition";

export type LensDocumentCardBlockProps = {

    readonly block: LensBlockDateDocumentCard;
    readonly document: UseDocumentResponse;
};

export const LensDocumentCardBlock: FC<LensDocumentCardBlockProps> = (
    props: LensDocumentCardBlockProps,
) => {

    const document = props.document;

    const [properties, setProperties] = React.useState<DocumentProperties>(() => document.document.properties);
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

    return (<Card
        shadow="none"
        className="border-1"
    >
        <CardBody
            className="flex flex-col gap-2"
        >
            {document.database.database.schema.properties
                .filter((schemaProperty: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>) => {
                    if (Array.isArray(props.block.properties)) {
                        return props.block.properties.includes(schemaProperty.propertyIdentifier);
                    }
                    return true;
                })
                .map((
                    schemaProperty: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>,
                ) => {

                    const propertyValue = properties[schemaProperty.propertyIdentifier]
                        ?? getImbricateDefaultValueOfProperty(schemaProperty.propertyType);

                    return (<div
                        key={schemaProperty.propertyIdentifier}
                        className="flex gap-2"
                    >
                        <div
                            className="flex-1 flex flex-col border-1 justify-center items-center py-3 rounded-md"
                        >
                            <div
                                className="flex gap-1 items-center"
                            >
                                {getPropertyIcon(schemaProperty.propertyType)}
                                {schemaProperty.isPrimaryKey && <FaStar />}
                            </div>
                            {schemaProperty.propertyName}
                        </div>
                        <div
                            className="flex-[4] self-center"
                        >
                            <DocumentPropertyCardContent
                                databaseUniqueIdentifier={props.block.database}
                                documentUniqueIdentifier={props.block.document}
                                schema={schemaProperty}
                                property={propertyValue}
                                updateProperty={(value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>) => {

                                    updateProperty(schemaProperty.propertyIdentifier, value);
                                }}
                            />
                        </div>
                    </div>);
                })}
        </CardBody>
        {edited && <React.Fragment>
            <Divider />
            <CardFooter>
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
            </CardFooter>
        </React.Fragment>}
    </Card>);
};
