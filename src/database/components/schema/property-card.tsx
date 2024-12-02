/**
 * @author WMXPY
 * @namespace Database_Components_Schema
 * @description Property Card
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { Button, Card, CardBody, CardHeader, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getPropertyIcon } from "../../../property/utils/get-icon";
import { DatabaseSchemaPropertyCardOptions } from "./property-card-options";

export type DatabaseSchemaPropertyCardProps = {

    readonly property: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>;
    readonly schema: ImbricateDatabaseSchema;
    readonly setSchema: (schema: ImbricateDatabaseSchema) => void;
};

export const DatabaseSchemaPropertyCard: FC<DatabaseSchemaPropertyCardProps> = (
    props: DatabaseSchemaPropertyCardProps,
) => {

    const isPrimary: boolean = props.property.isPrimaryKey ?? false;
    const allowToSetPrimary: boolean = !isPrimary && props.property.propertyType === IMBRICATE_PROPERTY_TYPE.STRING;

    return (<Card
        className="border-1"
        key={props.property.propertyIdentifier}
        shadow="none"
    >
        <CardHeader
            className="flex justify-end"
        >
            {isPrimary && <div
                className="text-large flex items-center gap-1 flex-1"
            >
                <FaStar /> Primary Key
            </div>}
            <div
                className="text-default-400 text-small"
            >
                {props.property.propertyIdentifier}
            </div>
        </CardHeader>
        <Divider />
        <CardHeader
            className="flex flex-col gap-2 items-start"
        >
            <div
                className="flex w-full gap-1 items-center justify-center"
            >
                {allowToSetPrimary && <Button
                    className="h-14"
                    variant="flat"
                    color="primary"
                    isIconOnly
                    size="lg"
                    title="Set as Primary Key"
                    onClick={() => {

                        props.setSchema({
                            properties: props.schema.properties.map((each) => {
                                if (each.propertyIdentifier === props.property.propertyIdentifier) {
                                    return {
                                        ...each,
                                        propertyOptions: {
                                            ...each.propertyOptions,
                                        },
                                        isPrimaryKey: true,
                                    };
                                }
                                if (each.isPrimaryKey) {
                                    return {
                                        ...each,
                                        propertyOptions: {
                                            ...each.propertyOptions,
                                        },
                                        isPrimaryKey: false,
                                    };
                                }
                                return each;
                            }),
                        });
                    }}
                >
                    <FaStar
                        className="text-large"
                    />
                </Button>}
                <Input
                    label="Property Name"
                    color="primary"
                    value={props.property.propertyName}
                    className="flex-1"
                    onChange={(event) => {

                        const newValue: string = event.target.value;
                        props.setSchema({
                            properties: props.schema.properties.map((each) => {
                                if (each.propertyIdentifier === props.property.propertyIdentifier) {
                                    return {
                                        ...each,
                                        propertyName: newValue,
                                    };
                                }
                                return each;
                            }),
                        });
                    }}
                />
                <Button
                    className="h-14"
                    variant="flat"
                    color="danger"
                    isIconOnly
                    size="lg"
                    onClick={() => {

                        props.setSchema({
                            properties: props.schema.properties.filter((each) => each.propertyIdentifier !== props.property.propertyIdentifier),
                        });
                    }}
                >
                    <MdDelete
                        className="text-large"
                    />
                </Button>
            </div>
        </CardHeader>
        <Divider />
        <CardBody>
            <Select
                label="Property Type"
                defaultSelectedKeys={[props.property.propertyType]}
                startContent={getPropertyIcon(props.property.propertyType)}
                onChange={(event) => {

                    const newValue: IMBRICATE_PROPERTY_TYPE = event.target.value as IMBRICATE_PROPERTY_TYPE;

                    props.setSchema({
                        properties: props.schema.properties.map((each) => {
                            if (each.propertyIdentifier === props.property.propertyIdentifier) {
                                return {
                                    ...each,
                                    propertyType: newValue,
                                };
                            }
                            return each;
                        }),
                    });
                }}
            >
                <SelectItem
                    key={IMBRICATE_PROPERTY_TYPE.BOOLEAN}
                    startContent={getPropertyIcon(IMBRICATE_PROPERTY_TYPE.BOOLEAN)}
                >
                    Boolean
                </SelectItem>
                <SelectItem
                    key={IMBRICATE_PROPERTY_TYPE.STRING}
                    startContent={getPropertyIcon(IMBRICATE_PROPERTY_TYPE.STRING)}
                >
                    String
                </SelectItem>
                <SelectItem
                    key={IMBRICATE_PROPERTY_TYPE.NUMBER}
                    startContent={getPropertyIcon(IMBRICATE_PROPERTY_TYPE.NUMBER)}
                >
                    Number
                </SelectItem>
                <SelectItem
                    key={IMBRICATE_PROPERTY_TYPE.DATE}
                    startContent={getPropertyIcon(IMBRICATE_PROPERTY_TYPE.DATE)}
                >
                    Date
                </SelectItem>
                <SelectItem
                    key={IMBRICATE_PROPERTY_TYPE.MARKDOWN}
                    startContent={getPropertyIcon(IMBRICATE_PROPERTY_TYPE.MARKDOWN)}
                >
                    Markdown
                </SelectItem>
                <SelectItem
                    key={IMBRICATE_PROPERTY_TYPE.JSON}
                    startContent={getPropertyIcon(IMBRICATE_PROPERTY_TYPE.JSON)}
                >
                    JSON
                </SelectItem>
                <SelectItem
                    key={IMBRICATE_PROPERTY_TYPE.LABEL}
                    startContent={getPropertyIcon(IMBRICATE_PROPERTY_TYPE.LABEL)}
                >
                    Label
                </SelectItem>
            </Select>
        </CardBody>
        <DatabaseSchemaPropertyCardOptions
            property={props.property}
            schema={props.schema}
            setSchema={props.setSchema}
        />
    </Card>);
};
