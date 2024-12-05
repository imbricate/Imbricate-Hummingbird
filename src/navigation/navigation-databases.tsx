/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Databases
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";
import { TbWorld } from "react-icons/tb";
import { ImbricateDatabasesObject, useDatabases } from "../database/hooks/use-databases";
import { useNavigate } from "react-router-dom";

export const NavigationDatabases: FC = () => {

    const databases: ImbricateDatabasesObject[] = useDatabases();
    const navigate = useNavigate();

    return (<Listbox
        aria-label="database-list"
        items={databases}
        onAction={(key) => {
            navigate(`/database/${key}/documents`);
        }}
    >
        {(item: ImbricateDatabasesObject) => {
            return (<ListboxItem
                key={item.database.uniqueIdentifier}
                description={<div className="flex items-center gap-1">
                    <TbWorld />{item.origin.originName}
                </div>}
            >
                {item.database.databaseName}
            </ListboxItem>);
        }}
    </Listbox>);
};
