/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Origins
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { ImbricateOriginObject, useOrigins } from "../origin/hooks/use-origins";

export const NavigationOrigins: FC = () => {

    const origins = useOrigins();

    return (<div>
        <Listbox>
            <ListboxItem
                key="new"
                startContent={<FaPlus />}
                className="text-primary"
                color="primary"
            >
                Add Origin
            </ListboxItem>
        </Listbox>
        <Listbox
            items={origins}
        >
            {(origin: ImbricateOriginObject) => {
                return (<ListboxItem key={origin.origin.uniqueIdentifier}>
                    {origin.originName}
                </ListboxItem>);
            }}
        </Listbox>
    </div>);
};
