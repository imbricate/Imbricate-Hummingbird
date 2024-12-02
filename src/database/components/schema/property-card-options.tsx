/**
 * @author WMXPY
 * @namespace Database_Components_Schema
 * @description Property Card Options
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { CardFooter, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { DatabaseSchemaPropertyCardOptionsLabel } from "./card-options/label";

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
            <DatabaseSchemaPropertyCardOptionsLabel
                property={props.property as ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE.LABEL>}
                schema={props.schema}
                setSchema={props.setSchema}
            />
        </CardFooter>
    </React.Fragment>);
};
