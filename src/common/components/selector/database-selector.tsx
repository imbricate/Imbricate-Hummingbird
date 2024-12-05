/**
 * @author WMXPY
 * @namespace Common_Components_Selector
 * @description Database Selector
 */

import { IImbricateDatabase } from "@imbricate/core";
import { Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { ImbricateDatabasesObject, useDatabases } from "../../../database/hooks/use-databases";

export type CommonPropertyDatabaseSelectSelectedDatabase = {

    readonly selectedOriginUniqueIdentifier: string;
    readonly selectedDatabase: IImbricateDatabase;
};

export type CommonPropertyDatabaseSelectProps = {

    readonly allowedDatabases?: string[];

    readonly selectedDatabase: IImbricateDatabase | null;
    readonly onSelectDatabase: (database: CommonPropertyDatabaseSelectSelectedDatabase) => void;
};

export const CommonPropertyDatabaseSelect: FC<CommonPropertyDatabaseSelectProps> = (
    props: CommonPropertyDatabaseSelectProps,
) => {

    const unfilteredDatabases = useDatabases();

    const databases: ImbricateDatabasesObject[] = Array.isArray(props.allowedDatabases)
        ? unfilteredDatabases.filter((database) => props.allowedDatabases!.includes(database.database.uniqueIdentifier))
        : unfilteredDatabases;

    return (<Select
        label="Database"
        isLoading={databases.length === 0}
        selectedKeys={props.selectedDatabase ? [props.selectedDatabase.uniqueIdentifier] : []}
        onChange={(event) => {

            const selectedDatabase = databases.find((database) => {
                return database.database.uniqueIdentifier === event.target.value;
            });

            props.onSelectDatabase({
                selectedOriginUniqueIdentifier: selectedDatabase!.origin.origin.uniqueIdentifier,
                selectedDatabase: selectedDatabase!.database,
            });
        }}
    >
        {databases.map((database) => {

            return (<SelectItem
                key={database.database.uniqueIdentifier}
            >
                {database.database.databaseName}
            </SelectItem>);
        })}
    </Select>);
};
