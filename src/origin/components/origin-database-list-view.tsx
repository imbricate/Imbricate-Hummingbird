/**
 * @author WMXPY
 * @namespace Origin_Components
 * @description Origin Database List View
 */

import { IImbricateOrigin } from "@imbricate/core";
import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { clearCache } from "../../common/cache/cache";
import { DATABASE_CACHE_IDENTIFIER } from "../../common/cache/static";
import { ImbricateDatabasesObject, useDatabases } from "../../database/hooks/use-databases";

export type OriginDatabaseListViewProps = {

    readonly originName: string;
    readonly origin: IImbricateOrigin;
};

export const OriginDatabaseListView: FC<OriginDatabaseListViewProps> = (
    props: OriginDatabaseListViewProps,
) => {

    const databases: ImbricateDatabasesObject[] = useDatabases(
        props.origin.uniqueIdentifier,
    );
    const navigate = useNavigate();

    const [newDatabaseName, setNewDatabaseName] = React.useState<string>("");
    const [creating, setCreating] = React.useState<boolean>(false);

    return (<div
        className="flex flex-col gap-2"
    >
        {databases.map((database: ImbricateDatabasesObject) => {
            return (<Card
                key={database.database.uniqueIdentifier}
                shadow="none"
                className="border-1"
            >
                <CardHeader>
                    {database.database.databaseName}
                </CardHeader>
            </Card>);
        })}
        <Card
            shadow="none"
            className="border-1"
        >
            <CardHeader>
                <Input
                    label="Database Name"
                    value={newDatabaseName}
                    onChange={(event) => {
                        setNewDatabaseName(event.target.value);
                    }}
                />
            </CardHeader>
            <Divider />
            <CardBody>
                <Button
                    variant="flat"
                    disabled={newDatabaseName.length === 0 || creating}
                    isLoading={creating}
                    color={newDatabaseName.length === 0 ? "default" : "primary"}
                    onClick={async () => {

                        setCreating(true);

                        const newDatabase = await props.origin.getDatabaseManager()
                            .createDatabase(newDatabaseName, {
                                properties: [],
                            });

                        clearCache(DATABASE_CACHE_IDENTIFIER);
                        navigate(`/database/${newDatabase.uniqueIdentifier}/schema`);
                    }}
                >
                    Create Database
                </Button>
            </CardBody>
        </Card>
    </div>);
};
