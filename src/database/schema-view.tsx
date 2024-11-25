/**
 * @author WMXPY
 * @namespace Database
 * @description Schema View
 */

import { IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchema } from "@imbricate/core";
import { Button, Card, CardBody, CardHeader, Divider, Select, SelectItem } from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DatabaseHeader } from "./components/database-header";
import { useDatabase } from "./hooks/use-database";
import { cloneImbricateSchema } from "./utils/clone-schema";

export type DatabasesSchemaViewProps = {

};

export const DatabasesSchemaView: FC = () => {

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;

    const [schema, setSchema] = React.useState<ImbricateDatabaseSchema | null>(null);
    const editedRef = React.useRef(false);

    const database = useDatabase(databaseUniqueIdentifier);

    useEffect(() => {

        if (database) {
            setSchema(cloneImbricateSchema(database.database.schema));
        }
    }, [database?.originUniqueIdentifier]);

    if (database === null || schema === null) {
        return null;
    }


    console.log(schema, editedRef.current);
    return (<div>
        <DatabaseHeader
            database={database.database}
        />
        <div
            className="flex flex-col gap-2"
        >
            {schema.properties.map((property) => {
                return (<Card
                    className="border-1"
                    key={property.propertyIdentifier}
                    shadow="none"
                >
                    <CardHeader>
                        {property.propertyName}
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
                            <SelectItem key={IMBRICATE_PROPERTY_TYPE.STRING}>
                                String
                            </SelectItem>
                            <SelectItem key={IMBRICATE_PROPERTY_TYPE.NUMBER}>
                                Number
                            </SelectItem>
                        </Select>
                    </CardBody>
                </Card>);
            })}
        </div>
        <div
            className="mt-1"
        >
            {editedRef.current && <Button>
                Save
            </Button>}
        </div>
    </div>);
};
