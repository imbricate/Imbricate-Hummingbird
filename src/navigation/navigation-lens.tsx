/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Lens
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";

export const NavigationLens: FC = () => {

    return (<Listbox
        aria-label="view-list"
        onAction={(key) => alert(key)}
    >
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
            Delete file
        </ListboxItem>
    </Listbox>);
};
