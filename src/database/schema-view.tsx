/**
 * @author WMXPY
 * @namespace Database
 * @description Schema View
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Card, CardBody, CardHeader, Divider, Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { DatabaseHeader } from "./components/database-header";
import { useDatabase } from "./hooks/use-database";

export type DatabasesSchemaViewProps = {

};

export const DatabasesSchemaView: FC = () => {

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;

    const database = useDatabase(databaseUniqueIdentifier);

    if (database === null) {
        return null;
    }

    return (<div>
        <DatabaseHeader
            database={database.database}
        />
        <div
            className="flex flex-col gap-2"
        >

            {database.database.schema.properties.map((property) => {

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
                            onChange={(value) => {
                                console.log(value.target.value);
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
    </div>);
};
