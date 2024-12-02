/**
 * @author WMXPY
 * @namespace Database_Components_Schema
 * @description Property Card Options
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { CardFooter, Divider } from "@nextui-org/react";
import React, { FC } from "react";

export type DatabaseSchemaPropertyCardOptionsProps = {

    readonly property: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>;
    readonly schema: ImbricateDatabaseSchema;
    readonly setSchema: (schema: ImbricateDatabaseSchema) => void;
};

export const DatabaseSchemaPropertyCardOptions: FC<DatabaseSchemaPropertyCardOptionsProps> = (
    props: DatabaseSchemaPropertyCardOptionsProps,
) => {

    if (props.property.propertyType !== IMBRICATE_PROPERTY_TYPE.LABEL) {
        return null;
    }

    return (<React.Fragment>
        <Divider />
        <CardFooter>
            123
        </CardFooter>
    </React.Fragment>);
};
