/**
 * @author WMXPY
 * @namespace Database_Components_Schema_Label
 * @description Label Color Select
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema, ImbricateDatabaseSchemaProperty, ImbricateDatabaseSchemaPropertyOptionsLabel, ImbricateDatabaseSchemaPropertyOptionsLabelOption } from "@imbricate/core";
import { Button, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import React, { FC } from "react";
import { MdDelete } from "react-icons/md";
import { CommonCopyItem } from "../../../../common/components/copy-item";
import { getLabelColorDot } from "../../../utils/label-color";

export type DatabaseSchemaPropertyCardOptionsLabelColorSelectProps = {

    readonly property: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE.LABEL>;
    readonly schema: ImbricateDatabaseSchema;
    readonly setSchema: (schema: ImbricateDatabaseSchema) => void;

    readonly labelIdentifier: string;
    readonly currentSchema: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE.LABEL>;
};

export const DatabaseSchemaPropertyCardOptionsLabelColorSelect: FC<DatabaseSchemaPropertyCardOptionsLabelColorSelectProps> = (
    props: DatabaseSchemaPropertyCardOptionsLabelColorSelectProps,
) => {

    const options: ImbricateDatabaseSchemaPropertyOptionsLabel = props.currentSchema.propertyOptions;

    const labelOptions: ImbricateDatabaseSchemaPropertyOptionsLabelOption[] = options.labelOptions ?? [];

    const labelOption: ImbricateDatabaseSchemaPropertyOptionsLabelOption | undefined =
        labelOptions.find((each) => each.labelIdentifier === props.labelIdentifier);

    if (!labelOption) {
        return null;
    }

    return (<div
        className="flex gap-1"
    >
        <div
            className="flex-1"
        >
            <Select
                fullWidth
                size="sm"
                label="Label Color"
                defaultSelectedKeys={[labelOption.labelColor]}
                onChange={(event) => {

                    const value = event.target.value;
                    const newOptions: ImbricateDatabaseSchemaPropertyOptionsLabelOption[] = labelOptions.map((each) => {
                        if (each.labelIdentifier === props.labelIdentifier) {
                            return {
                                ...each,
                                labelColor: value,
                            };
                        }
                        return each;
                    });

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
                <SelectItem key="black" startContent={getLabelColorDot("black")}>
                    Black
                </SelectItem>
                <SelectItem key="red" startContent={getLabelColorDot("red")}>
                    Red
                </SelectItem>
                <SelectItem key="blue" startContent={getLabelColorDot("blue")}>
                    Blue
                </SelectItem>
                <SelectItem key="purple" startContent={getLabelColorDot("purple")}>
                    Purple
                </SelectItem>
            </Select>
        </div>
        <div
            className="flex-1"
        >
            <Input
                fullWidth
                size="sm"
                label="Label Name"
                value={labelOption.labelName}
                onChange={(event) => {

                    const value = event.target.value;
                    const newOptions: ImbricateDatabaseSchemaPropertyOptionsLabelOption[] = labelOptions.map((each) => {
                        if (each.labelIdentifier === props.labelIdentifier) {
                            return {
                                ...each,
                                labelName: value,
                            };
                        }
                        return each;
                    });

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
            />
        </div>
        <div>
            <Tooltip
                content={<CommonCopyItem
                    startContent="Label Identifier"
                    content={props.labelIdentifier}
                />}
                delay={1000}
                placement="left"
            >
                <Button
                    variant="flat"
                    color="danger"
                    isIconOnly
                    radius="sm"
                    size="lg"
                    onClick={() => {

                        const newOptions: ImbricateDatabaseSchemaPropertyOptionsLabelOption[] = labelOptions.filter((each) => each.labelIdentifier !== props.labelIdentifier);

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
                    <MdDelete
                        className="text-large"
                    />
                </Button>
            </Tooltip>
        </div>
    </div>);
};
