/**
 * @author WMXPY
 * @namespace Common_Components_Selector
 * @description Database Selector
 */

import { IImbricateDatabase } from "@imbricate/core";
import { Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { useDatabases } from "../../../database/hooks/use-databases";

export type CommonPropertyDatabaseSelectProps = {

    readonly selectedDatabase: IImbricateDatabase | null;
    readonly onSelectDatabase: (database: IImbricateDatabase) => void;
};

export const CommonPropertyDatabaseSelect: FC<CommonPropertyDatabaseSelectProps> = (
    props: CommonPropertyDatabaseSelectProps,
) => {

    const databases = useDatabases();

    return (<Select
        label="Database"
        isLoading={databases.length === 0}
        selectedKeys={props.selectedDatabase ? [props.selectedDatabase.uniqueIdentifier] : []}
        onChange={(event) => {

            const selectedDatabase = databases.find((database) => {
                return database.database.uniqueIdentifier === event.target.value;
            });

            props.onSelectDatabase(selectedDatabase!.database);
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
