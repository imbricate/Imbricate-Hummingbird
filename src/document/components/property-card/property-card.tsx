/**
 * @author WMXPY
 * @namespace Document_Components_PropertyCard
 * @description Property Card
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { Card, CardBody, CardHeader, Chip, Divider, Tooltip } from "@nextui-org/react";
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

    const isPrimary: boolean = props.schema.isPrimaryKey ?? false;

    return (<Card
        className="border-1"
        shadow="none"
    >
        <CardHeader
            className="flex gap-2 items-center"
        >
            <Tooltip
                content={<CommonCopyItem
                    startContent="Property Identifier"
                    content={props.schema.propertyIdentifier}
                />}
                delay={1000}
                placement="bottom"
            >
                <div className="flex flex-1 gap-1 items-center">
                    <div>
                        {getPropertyIcon(props.schema.propertyType)}
                    </div>
                    <div
                        className="flex-1"
                    >
                        {props.schema.propertyName}
                    </div>
                </div>
            </Tooltip>
            {isPrimary && <Chip
                color="primary"
                size="sm"
            >
                Primary
            </Chip>}
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
