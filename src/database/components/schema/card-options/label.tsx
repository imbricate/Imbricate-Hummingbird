/**
 * @author WMXPY
 * @namespace Database_Components_Schema
 * @description Property Card Options
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema, ImbricateDatabaseSchemaProperty, ImbricateDatabaseSchemaPropertyOptionsLabel, ImbricateDatabaseSchemaPropertyOptionsLabelOption } from "@imbricate/core";
import { Checkbox, Input } from "@nextui-org/react";
import React, { FC } from "react";

export type DatabaseSchemaPropertyCardOptionsLabelProps = {

    readonly property: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE.LABEL>;
    readonly schema: ImbricateDatabaseSchema;
    readonly setSchema: (schema: ImbricateDatabaseSchema) => void;
};

export const DatabaseSchemaPropertyCardOptionsLabel: FC<DatabaseSchemaPropertyCardOptionsLabelProps> = (
    props: DatabaseSchemaPropertyCardOptionsLabelProps,
) => {

    const currentSchema = props.schema.properties.find((each) => {
        return each.propertyIdentifier === props.property.propertyIdentifier;
    });

    if (!currentSchema) {
        return null;
    }

    const options: ImbricateDatabaseSchemaPropertyOptionsLabel =
        currentSchema.propertyOptions as ImbricateDatabaseSchemaPropertyOptionsLabel;

    const allowMultiple: boolean = options.allowMultiple ?? false;
    const labelOptions: ImbricateDatabaseSchemaPropertyOptionsLabelOption[] = options.labelOptions ?? [];

    console.log(labelOptions);

    return (<div>
        <Checkbox
            defaultSelected={allowMultiple}
            onChange={(event) => {
                const value = event.target.checked;
                props.setSchema({
                    ...props.schema,
                    properties: props.schema.properties.map((each) => {
                        if (each.propertyIdentifier === props.property.propertyIdentifier) {
                            return {
                                ...each,
                                propertyOptions: {
                                    ...options,
                                    allowMultiple: value,
                                },
                            };
                        }
                        return each;
                    }),
                });
            }}
        >
            Allow Multiple
        </Checkbox>
        <div>
            <Input></Input>
        </div>
    </div>);
};
