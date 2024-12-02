/**
 * @author WMXPY
 * @namespace Database_Components_Schema
 * @description Add Property Button
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema } from "@imbricate/core";
import { Button, Card, CardHeader } from "@nextui-org/react";
import { UUIDVersion1 } from "@sudoo/uuid";
import React, { FC } from "react";

export type DatabaseSchemaAddPropertyButtonProps = {

    readonly schema: ImbricateDatabaseSchema;
    readonly setSchema: (schema: ImbricateDatabaseSchema) => void;
};

export const DatabaseSchemaAddPropertyButton: FC<DatabaseSchemaAddPropertyButtonProps> = (
    props: DatabaseSchemaAddPropertyButtonProps,
) => {

    return (<Card
        className="border-1"
        shadow="none"
    >
        <CardHeader>
            <Button
                variant="flat"
                onClick={() => {

                    props.setSchema({
                        properties: [
                            ...props.schema.properties,
                            {
                                propertyIdentifier: UUIDVersion1.generateString(),
                                propertyName: "New Property",
                                propertyType: IMBRICATE_PROPERTY_TYPE.STRING,
                                propertyOptions: {},
                            },
                        ],
                    });
                }}
            >
                Add Property
            </Button>
        </CardHeader>
    </Card>);
};
