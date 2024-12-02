/**
 * @author WMXPY
 * @namespace Database
 * @description Schema View
 */

import { ImbricateDatabaseSchema } from "@imbricate/core";
import { Button } from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clearCache } from "../common/cache/cache";
import { DATABASE_CACHE_IDENTIFIER } from "../common/cache/static";
import { DatabaseHeader } from "./components/database-header";
import { DatabaseSchemaAddPropertyButton } from "./components/schema/add-property-button";
import { DatabaseSchemaPropertyCard } from "./components/schema/property-card";
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

    const setSchemaMethod = (newSchema: ImbricateDatabaseSchema) => {

        editedRef.current = true;
        setSchema(newSchema);
    };

    return (<div
        className="flex flex-col h-full"
    >
        <div>
            <DatabaseHeader
                database={database.database}
                isSchema
            />
        </div>
        <div
            className="flex-1 min-h-0 min-w-0 overflow-auto"
        >
            <div
                className="flex flex-col gap-2 py-2 pr-2"
            >
                {schema.properties.map((property) => {
                    return (<DatabaseSchemaPropertyCard
                        key={property.propertyIdentifier}
                        property={property}
                        schema={schema}
                        setSchema={setSchemaMethod}
                    />);
                })}
                <DatabaseSchemaAddPropertyButton
                    schema={schema}
                    setSchema={setSchemaMethod}
                />
            </div>
        </div>
        <div
            className="mb-2"
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
