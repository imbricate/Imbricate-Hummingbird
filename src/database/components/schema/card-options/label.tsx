/**
 * @author WMXPY
 * @namespace Database_Components_Schema
 * @description Property Card Options
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema, ImbricateDatabaseSchemaProperty, ImbricateDatabaseSchemaPropertyOptionsLabel, ImbricateDatabaseSchemaPropertyOptionsLabelOption } from "@imbricate/core";
import { Button, Checkbox } from "@nextui-org/react";
import { UUIDVersion1 } from "@sudoo/uuid";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { DatabaseSchemaPropertyCardOptionsLabelColorSelect } from "./label-color-select";

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

    return (<div
        className="w-full flex flex-col gap-2"
    >
        <div
            className="flex justify-center items-center"
        >
            <div
                className="flex-1 "
            >
                <Checkbox
                    className="flex-1"
                    size="lg"
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
            </div>
            <div>
                <Button
                    color="primary"
                    variant="flat"
                    size="lg"
                    radius="sm"
                    isIconOnly
                    onClick={() => {

                        const newOptions: ImbricateDatabaseSchemaPropertyOptionsLabelOption[] = [
                            ...labelOptions,
                            {
                                labelIdentifier: UUIDVersion1.generateString(),
                                labelName: "label",
                                labelColor: "blue",
                            },
                        ];

                        props.setSchema({
                            ...props.schema,
                            properties: props.schema.properties.map((each) => {
                                if (each.propertyIdentifier === props.property.propertyIdentifier) {
                                    return {
                                        ...each,
                                        propertyOptions: {
                                            ...options,
                                            labelOptions: newOptions,
                                        },
                                    };
                                }
                                return each;
                            }),
                        });
                    }}
                >
                    <FaPlus />
                </Button>
            </div>
        </div>
        <div
            className="w-full flex flex-col gap-1"
        >
            {labelOptions.map((each) => {
                return (<DatabaseSchemaPropertyCardOptionsLabelColorSelect
                    key={each.labelIdentifier}
                    property={props.property}
                    schema={props.schema}
                    setSchema={props.setSchema}
                    labelIdentifier={each.labelIdentifier}
                    currentSchema={currentSchema as ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE.LABEL>}
                />);
            })}
        </div>
    </div>);
};
