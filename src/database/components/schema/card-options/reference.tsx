/**
 * @author WMXPY
 * @namespace Database_Components_Schema_CardOptions
 * @description Reference
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema, ImbricateDatabaseSchemaProperty, ImbricateDatabaseSchemaPropertyOptionsReference, ImbricateDatabaseSchemaPropertyOptionsReferenceDatabase } from "@imbricate/core";
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { LoadingWrapper } from "../../../../common/components/loading-wrapper";
import { useDatabases } from "../../../hooks/use-databases";

export type DatabaseSchemaPropertyCardOptionsReferenceProps = {

    readonly property: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE.REFERENCE>;
    readonly schema: ImbricateDatabaseSchema;
    readonly setSchema: (schema: ImbricateDatabaseSchema) => void;
};

export const DatabaseSchemaPropertyCardOptionsReference: FC<DatabaseSchemaPropertyCardOptionsReferenceProps> = (
    props: DatabaseSchemaPropertyCardOptionsReferenceProps,
) => {

    const databases = useDatabases();

    if (databases.length === 0) {
        return (<LoadingWrapper
            color="default"
        />);
    }

    const currentSchema = props.schema.properties.find((each) => {
        return each.propertyIdentifier === props.property.propertyIdentifier;
    });

    if (!currentSchema) {
        return null;
    }

    const options: ImbricateDatabaseSchemaPropertyOptionsReference =
        currentSchema.propertyOptions as ImbricateDatabaseSchemaPropertyOptionsReference;

    const allowMultiple: boolean = options.allowMultiple ?? false;
    const databaseOptions: ImbricateDatabaseSchemaPropertyOptionsReferenceDatabase[] =
        options.databases ?? [];

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
                <Dropdown
                    backdrop="blur"
                >
                    <DropdownTrigger>
                        <Button
                            color="primary"
                            variant="flat"
                            radius="sm"

                        >
                            <FaPlus /> Select Database
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        variant="flat"
                        aria-label="Dropdown menu to select available database"
                        onAction={(itemKey: any) => {

                            const target = databases.find((each) => each.database.uniqueIdentifier === itemKey);

                            if (!target) {
                                console.error(`Database not found in reference options: ${itemKey}`);
                                return;
                            }

                            const newOptions: ImbricateDatabaseSchemaPropertyOptionsReferenceDatabase[] = [
                                ...databaseOptions,
                                {
                                    originUniqueIdentifier: target.origin.origin.uniqueIdentifier,
                                    databaseUniqueIdentifier: target.database.uniqueIdentifier,
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
                                                databases: newOptions,
                                            },
                                        };
                                    }
                                    return each;
                                }),
                            });
                        }}
                    >
                        {databases
                            .filter((database) => {
                                return !databaseOptions.some((option) => {
                                    return option.databaseUniqueIdentifier === database.database.uniqueIdentifier;
                                });
                            })
                            .map((database) => {
                                return (<DropdownItem
                                    key={database.database.uniqueIdentifier}
                                    description={<div
                                        className="flex items-center gap-1"
                                    >
                                        <TbWorld />{database.origin.originName}
                                    </div>}
                                >
                                    {database.database.databaseName}
                                </DropdownItem>);
                            })}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        {databaseOptions.length > 0 && <div
            className="flex flex-col gap-1"
        >
            {databaseOptions.map((databaseItem) => {

                const targetDatabase = databases.find((each) => each.database.uniqueIdentifier === databaseItem.databaseUniqueIdentifier);

                if (!targetDatabase) {
                    return null;
                }

                return (<div
                    key={databaseItem.databaseUniqueIdentifier}
                    className="flex items-center"
                >
                    <div
                        className="flex-1"
                    >
                        {targetDatabase.database.databaseName}
                        <div
                            className="flex items-center gap-1 text-tiny text-gray-600"
                        >
                            <TbWorld />{targetDatabase.origin.originName}
                        </div>
                    </div>
                    <Button
                        variant="flat"
                        color="danger"
                        isIconOnly
                        radius="sm"
                        size="lg"
                        onClick={() => {

                            const newOptions: ImbricateDatabaseSchemaPropertyOptionsReferenceDatabase[] =
                                databaseOptions.filter((each) => each.databaseUniqueIdentifier !== databaseItem.databaseUniqueIdentifier);

                            props.setSchema({
                                ...props.schema,
                                properties: props.schema.properties.map((each) => {
                                    if (each.propertyIdentifier === props.property.propertyIdentifier) {
                                        return {
                                            ...each,
                                            propertyOptions: {
                                                ...options,
                                                databases: newOptions,
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
                </div>);
            })}
        </div>}
    </div>);
};
