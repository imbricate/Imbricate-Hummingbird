/**
 * @author WMXPY
 * @namespace Document_Components_PropertyCard
 * @description Property Card
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import { getPropertyIcon } from "../../../property/utils/get-icon";
import { CommonCopyItem } from "../../../common/components/copy-item";

export type DocumentPropertyCardProps = {

    readonly schema: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>;
    readonly property?: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
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
            {props.schema.propertyIdentifier}
        </CardBody>
    </Card>);
};
