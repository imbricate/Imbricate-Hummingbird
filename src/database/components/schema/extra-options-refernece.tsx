/**
 * @author WMXPY
 * @namespace Database_Components_Schema
 * @description Extra Options Reference
 */

import { IImbricateDatabase } from "@imbricate/core";
import React, { FC } from "react";

export type DatabaseExtraOptionsReferenceProps = {

    readonly database: IImbricateDatabase;
};

export const DatabaseExtraOptionsReference: FC<DatabaseExtraOptionsReferenceProps> = (props: DatabaseExtraOptionsReferenceProps) => {

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
