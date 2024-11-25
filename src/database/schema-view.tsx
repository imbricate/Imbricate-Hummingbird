/**
 * @author WMXPY
 * @namespace Database
 * @description Schema View
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";

export type DatabasesSchemaViewProps = {

};

export const DatabasesSchemaView: FC = () => {

    const params = useParams();
    const databaseUniqueIdentifier: string =
        params["database-unique-identifier"] as string;

    return (<div>
        test {databaseUniqueIdentifier}
    </div>);
};
