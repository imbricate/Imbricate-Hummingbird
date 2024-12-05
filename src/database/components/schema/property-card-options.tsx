/**
 * @author WMXPY
 * @namespace Database_Components_Schema
 * @description Property Card Options
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { CardFooter, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { DatabaseSchemaPropertyCardOptionsLabel } from "./card-options/label";
import { DatabaseSchemaPropertyCardOptionsReference } from "./card-options/reference";

export type DatabaseSchemaPropertyCardOptionsProps = {

    readonly property: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>;
    readonly schema: ImbricateDatabaseSchema;
    readonly setSchema: (schema: ImbricateDatabaseSchema) => void;
};

export const DatabaseSchemaPropertyCardOptions: FC<DatabaseSchemaPropertyCardOptionsProps> = (
    props: DatabaseSchemaPropertyCardOptionsProps,
) => {

    const getPropertyComponent = () => {

        switch (props.property.propertyType) {

            case IMBRICATE_PROPERTY_TYPE.LABEL:
                return (<DatabaseSchemaPropertyCardOptionsLabel
                    property={props.property as ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE.LABEL>}
                    schema={props.schema}
                    setSchema={props.setSchema}
                />);
            case IMBRICATE_PROPERTY_TYPE.REFERENCE:
                return (<DatabaseSchemaPropertyCardOptionsReference
                    property={props.property as ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE.REFERENCE>}
                    schema={props.schema}
                    setSchema={props.setSchema}
                />);
        }

        return null;
    };

    const component = getPropertyComponent();
    if (!component) {
        return null;
    }

    return (<React.Fragment>
        <Divider />
        <CardFooter>
            {component}
        </CardFooter>
    </React.Fragment>);
};
