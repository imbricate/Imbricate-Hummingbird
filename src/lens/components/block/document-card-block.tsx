/**
 * @author WMXPY
 * @namespace Lens_Components_Block
 * @description Document Card Block
 */

import { DocumentProperties, DocumentPropertyKey, DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty, getImbricateDefaultValueOfProperty } from "@imbricate/core";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { IoSaveSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { DocumentPropertyCardContent } from "../../../document/components/property-card/property-card-content";
import { UseDocumentResponse } from "../../../document/hooks/use-document";
import { getPropertyIcon } from "../../../property/utils/get-icon";
import { LensBlockDataDocumentCard } from "../../types/lens-definition";

export type LensDocumentCardBlockProps = {

    readonly block: LensBlockDataDocumentCard;
    readonly document: UseDocumentResponse;
};

export const LensDocumentCardBlock: FC<LensDocumentCardBlockProps> = (
    props: LensDocumentCardBlockProps,
) => {

    const document = props.document;

    const [properties, setProperties] = React.useState<DocumentProperties>(() => document.document.properties);
    const [edited, setEdited] = React.useState<boolean>(false);
    const [saving, setSaving] = React.useState<boolean>(false);

    const deleteProperty = (key: DocumentPropertyKey) => {

        const newProperties: DocumentProperties = Object.keys(properties)
            .filter((currentKey: DocumentPropertyKey) => currentKey !== key)
            .reduce((previous: DocumentProperties, current: DocumentPropertyKey) => {
                return {
                    ...previous,
                    [current]: properties[current],
                };
            }, {});

        setProperties(newProperties);

        if (edited) {
            return;
        }
        setEdited(true);
    };

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

    const headerProperty = document.database.database.schema.properties
        .find((schemaProperty: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>) => {
            if (schemaProperty.isPrimaryKey) {
                if (!Array.isArray(props.block.properties)) {
                    return true;
                }
                return props.block.properties.includes(schemaProperty.propertyIdentifier);
            };
        });

    const bodyProperties = document.database.database.schema.properties
        .filter((schemaProperty: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>) => {
            if (Array.isArray(props.block.properties)) {
                return props.block.properties.includes(schemaProperty.propertyIdentifier)
                    && !schemaProperty.isPrimaryKey;
            }
            return !schemaProperty.isPrimaryKey;
        });

    return (<Card
        shadow="none"
        className="border-1"
    >
        {headerProperty && <CardHeader>
            {(() => {
                const propertyValue = properties[headerProperty.propertyIdentifier]
                    ?? getImbricateDefaultValueOfProperty(headerProperty.propertyType);

                return (<DocumentPropertyCardContent
                    showPropertyName
                    databaseUniqueIdentifier={props.block.database}
                    documentUniqueIdentifier={props.block.document}
                    schema={headerProperty}
                    property={propertyValue}
                    deleteProperty={() => {
                        deleteProperty(headerProperty.propertyIdentifier);
                    }}
                    updateProperty={(value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>) => {
                        updateProperty(headerProperty.propertyIdentifier, value);
                    }}
                />);
            })()}
        </CardHeader>}
        {headerProperty && bodyProperties.length > 0 && <Divider />}
        {bodyProperties.length > 0 && <CardBody
            className="flex flex-col gap-2"
        >
            {bodyProperties.map((
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
                            deleteProperty={() => {
                                deleteProperty(schemaProperty.propertyIdentifier);
                            }}
                            updateProperty={(value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>) => {
                                updateProperty(schemaProperty.propertyIdentifier, value);
                            }}
                        />
                    </div>
                </div>);
            })}
        </CardBody>}
        {edited && <React.Fragment>
            <Divider />
            <CardFooter>
                <ButtonGroup>
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
                    <Button
                        variant="flat"
                        color="danger"
                        isLoading={saving}
                        isIconOnly
                        onClick={async () => {

                            setProperties(document.document.properties);
                            setEdited(false);
                        }}
                    >
                        <MdDelete />
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </React.Fragment>}
    </Card>);
};
