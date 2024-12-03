/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Origins
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { ImbricateOriginObject, useOrigins } from "../origin/hooks/use-origins";
import { useNavigateOriginNewView, useNavigateOriginView } from "./hooks/use-routes";

export const NavigationOrigins: FC = () => {

    const origins = useOrigins();
    const navigateToOriginNew = useNavigateOriginNewView();
    const navigateToOrigin = useNavigateOriginView();

    return (<div>
        <Listbox
            aria-label="origin-list-new"
        >
            <ListboxItem
                key="new"
                startContent={<FaPlus />}
                className="text-primary"
                color="primary"
                onClick={() => {
                    navigateToOriginNew();
                }}
            >
                Add Origin
            </ListboxItem>
        </Listbox>
        <Listbox
            aria-label="origin-list"
            items={origins}
            onAction={(key) => {
                navigateToOrigin(key as string);
            }}
        >
            {(origin: ImbricateOriginObject) => {
                return (<ListboxItem
                    key={origin.origin.uniqueIdentifier}
                >
                    {origin.originName}
                </ListboxItem>);
            }}
        </Listbox>
    </div>);
};
