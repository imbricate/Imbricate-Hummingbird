/**
 * @author WMXPY
 * @namespace Common_Components_Selector
 * @description Property Selector
 */

import { DocumentPropertyKey, IImbricateDocument, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { getPropertyIcon } from "../../../property/utils/get-icon";

export type CommonPropertyPropertySelectProps = {

    readonly allowedPropertyType?: IMBRICATE_PROPERTY_TYPE[];

    readonly selectedDocument: IImbricateDocument;

    readonly databaseUniqueIdentifier: string;
    readonly databaseSchema: ImbricateDatabaseSchema;

    readonly selectedProperty: DocumentPropertyKey | null;
    readonly onSelectProperty: (property: DocumentPropertyKey) => void;
};

export const CommonPropertyPropertySelect: FC<CommonPropertyPropertySelectProps> = (
    props: CommonPropertyPropertySelectProps,
) => {

    const allowedSchemaProperties: Array<ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>> =
        props.databaseSchema.properties.filter((schemaProperty) => {
            if (!props.allowedPropertyType) {
                return true;
            }
            return props.allowedPropertyType.includes(schemaProperty.propertyType);
        });

    if (allowedSchemaProperties.length === 0) {
        return (<div>
            No Allowed Property Found in Schema
        </div>);
    }

    return (<Select
        label="Property"
        onChange={(event) => {

            props.onSelectProperty(event.target.value);
        }}
    >
        {allowedSchemaProperties.map((schemaProperty) => {

            return (<SelectItem
                key={schemaProperty.propertyIdentifier}
                startContent={getPropertyIcon(schemaProperty.propertyType)}
            >
                {schemaProperty.propertyName}
            </SelectItem>);
        })}
    </Select>);
};
