/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Databases
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";
import { ImbricateDatabasesObject, useDatabases } from "../database/hooks/use-databases";

export const NavigationDatabases: FC = () => {

    const databases: ImbricateDatabasesObject[] = useDatabases();

    return (<Listbox
        items={databases}
    >
        {(item: ImbricateDatabasesObject) => {
            return (<ListboxItem
                key={item.database.uniqueIdentifier}
            >
                {item.database.uniqueIdentifier}
            </ListboxItem>);
        }}
    </Listbox>);
};
