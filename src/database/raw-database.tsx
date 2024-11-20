/**
 * @author WMXPY
 * @namespace Database
 * @description Raw Database
 */

import { IImbricateDatabase } from "@imbricate/core";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useDocuments } from "../document/hooks/use-documents";

export type RawDatabaseProps = {

    databases: IImbricateDatabase[];
};

export const RawDatabase: FC = () => {

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;

    const documents = useDocuments(
        databaseUniqueIdentifier,
    );

    if (!documents) {
        return null;
    }

    return <div>{documents.length}</div>;
};
