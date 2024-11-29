/**
 * @author WMXPY
 * @namespace Document_Components_PropertyCard
 * @description Property Card
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import { CommonCopyItem } from "../../../common/components/copy-item";
import { getPropertyIcon } from "../../../property/utils/get-icon";
import { DocumentPropertyCardContent } from "./property-card-content";

export type DocumentPropertyCardProps = {

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;

    readonly schema: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>) => void;
};

export const DocumentPropertyCard: React.FC<DocumentPropertyCardProps> = (
    props: DocumentPropertyCardProps,
) => {

    return (<Card
        className="border-1"
        shadow="none"
    >
        <CardHeader
            className="flex gap-2 items-center"
        >
            <div>
                {getPropertyIcon(props.schema.propertyType)}
            </div>
            <div
                className="flex-1"
            >
                {props.schema.propertyName}

            </div>
            <CommonCopyItem
                content={props.schema.propertyIdentifier}
            />
        </CardHeader>
        <Divider />
        <CardBody>
            <DocumentPropertyCardContent
                databaseUniqueIdentifier={props.databaseUniqueIdentifier}
                documentUniqueIdentifier={props.documentUniqueIdentifier}
                schema={props.schema}
                property={props.property}
                updateProperty={props.updateProperty}
            />
        </CardBody>
    </Card>);
};
