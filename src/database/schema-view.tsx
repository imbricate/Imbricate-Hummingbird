/**
 * @author WMXPY
 * @namespace Database
 * @description Schema View
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema } from "@imbricate/core";
import { Button, Card, CardBody, CardHeader, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { UUIDVersion1 } from "@sudoo/uuid";
import React, { FC, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { clearCache } from "../common/cache/cache";
import { DATABASE_CACHE_IDENTIFIER } from "../common/cache/static";
import { DatabaseHeader } from "./components/database-header";
import { useDatabase } from "./hooks/use-database";
import { cloneImbricateSchema } from "./utils/clone-schema";

export const DatabasesSchemaView: FC = () => {

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;

    const [schema, setSchema] = React.useState<ImbricateDatabaseSchema | null>(null);
    const editedRef = React.useRef(false);

    const database = useDatabase(databaseUniqueIdentifier);
    const navigate = useNavigate();

    const [saving, setSaving] = React.useState<boolean>(false);

    useEffect(() => {

        if (database) {
            setSchema(cloneImbricateSchema(database.database.schema));
        }
    }, [database?.origin.origin.uniqueIdentifier]);

    if (database === null || schema === null) {
        return null;
    }

    return (<div>
        <DatabaseHeader
            database={database.database}
            isSchema
        />
        <div
            className="flex flex-col gap-2"
        >
            {schema.properties.map((property) => {
                const isPrimary: boolean = property.isPrimaryKey ?? false;

                return (<Card
                    className="border-1"
                    key={property.propertyIdentifier}
                    shadow="none"
                >
                    <CardHeader
                        className="flex flex-col gap-2 items-start"
                    >
                        {isPrimary && <div
                            className="text-large flex items-center gap-1"
                        >
                            <FaStar /> Primary Key
                        </div>}
                        <div
                            className="flex w-full gap-1 items-center justify-center"
                        >
                            {!isPrimary && <Button
                                className="h-14"
                                variant="flat"
                                color="primary"
                                isIconOnly
                                size="lg"
                                onClick={() => {

                                    editedRef.current = true;
                                    setSchema({
                                        properties: schema.properties.map((each) => {
                                            if (each.propertyIdentifier === property.propertyIdentifier) {
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
                                value={property.propertyName}
                                className="flex-1"
                                onChange={(event) => {

                                    editedRef.current = true;
                                    const newValue: string = event.target.value;

                                    setSchema({
                                        properties: schema.properties.map((each) => {
                                            if (each.propertyIdentifier === property.propertyIdentifier) {
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

                                    editedRef.current = true;
                                    setSchema({
                                        properties: schema.properties.filter((each) => each.propertyIdentifier !== property.propertyIdentifier),
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
                            defaultSelectedKeys={[property.propertyType]}
                            onChange={(event) => {

                                editedRef.current = true;
                                const newValue: IMBRICATE_PROPERTY_TYPE = event.target.value as IMBRICATE_PROPERTY_TYPE;

                                setSchema({
                                    properties: schema.properties.map((each) => {
                                        if (each.propertyIdentifier === property.propertyIdentifier) {
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
                            <SelectItem key={IMBRICATE_PROPERTY_TYPE.BOOLEAN}>
                                Boolean
                            </SelectItem>
                            <SelectItem key={IMBRICATE_PROPERTY_TYPE.STRING}>
                                String
                            </SelectItem>
                            <SelectItem key={IMBRICATE_PROPERTY_TYPE.NUMBER}>
                                Number
                            </SelectItem>
                            <SelectItem key={IMBRICATE_PROPERTY_TYPE.DATE}>
                                Date
                            </SelectItem>
                            <SelectItem key={IMBRICATE_PROPERTY_TYPE.MARKDOWN}>
                                Markdown
                            </SelectItem>
                        </Select>
                    </CardBody>
                </Card>);
            })}
            <Card
                className="border-1"
                shadow="none"
            >
                <CardHeader>
                    <Button
                        variant="flat"
                        onClick={() => {

                            editedRef.current = true;
                            setSchema({
                                properties: [
                                    ...schema.properties,
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
            </Card>
        </div>
        <div
            className="mt-2"
        >
            {editedRef.current && <Button
                disabled={saving}
                variant="flat"
                color="primary"
                onClick={async () => {

                    setSaving(true);

                    clearCache(DATABASE_CACHE_IDENTIFIER);
                    await database.database.putSchema(schema);

                    navigate(`/database/${databaseUniqueIdentifier}/documents`);
                }}
            >
                Save
            </Button>}
        </div>
    </div>);
};
