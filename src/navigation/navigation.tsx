/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";
import { NavigationLogo } from "./logo";

export const Navigation: FC = () => {

    return (<div className="w-full max-w-[260px]">
        <div className="w-full justify-center items-center flex my-2">
            <NavigationLogo />
        </div>
        <Listbox
            aria-label="Actions"
            onAction={(key) => alert(key)}
        >
            <ListboxItem key="new">New file</ListboxItem>
            <ListboxItem key="copy">Copy link</ListboxItem>
            <ListboxItem key="edit">Edit file</ListboxItem>
            <ListboxItem key="delete" className="text-danger" color="danger">
                Delete file
            </ListboxItem>
        </Listbox>
    </div>);
};
