/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Origins
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useOriginInitialization } from "../origin/hooks/initialization";
import { OriginSliceState, useOriginSlice } from "../store/feature/origin";

export const NavigationOrigins: FC = () => {

    useOriginInitialization();

    const originState: OriginSliceState = useOriginSlice();

    console.log(originState);

    return (<Listbox>
        <ListboxItem
            key="new"
            startContent={<FaPlus />}
            className="text-primary"
            color="primary"
        >
            Add Origin
        </ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
            Delete file
        </ListboxItem>
    </Listbox>);
};
