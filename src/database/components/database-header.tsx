/**
 * @author WMXPY
 * @namespace Database_Components
 * @description Database Header
 */

import { IImbricateDatabase } from "@imbricate/core";
import React, { FC } from "react";

export type DatabaseHeaderProps = {

    readonly database: IImbricateDatabase;
};

export const DatabaseHeader: FC<DatabaseHeaderProps> = (props: DatabaseHeaderProps) => {

    return <div
        className="m-2"
    >
        <h2
            className="text-2xl"
        >
            {props.database.databaseName}
        </h2>
    </div>;
};
