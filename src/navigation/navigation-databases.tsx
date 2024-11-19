/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Databases
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";

export const NavigationDatabases: FC = () => {

    return (<Listbox
        aria-label="Actions"
        onAction={(key) => alert(key)}
    >
        <ListboxItem key="new">New file Database</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
            Delete file
        </ListboxItem>
    </Listbox>);
};
