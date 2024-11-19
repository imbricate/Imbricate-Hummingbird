/**
 * @author WMXPY
 * @namespace Database
 * @description Raw Database
 */

import { IImbricateDatabase } from "@imbricate/core";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useDatabases } from "./hooks/use-databases";

export type RawDatabaseProps = {

    databases: IImbricateDatabase[];
};

export const RawDatabase: FC = () => {

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;

    const databases = useDatabases();

    const targetDatabase = databases.find((database) => database.database.uniqueIdentifier === databaseUniqueIdentifier);

    if (!targetDatabase) {
        return null;
    }

    return <div>{targetDatabase.originName}</div>;
};
