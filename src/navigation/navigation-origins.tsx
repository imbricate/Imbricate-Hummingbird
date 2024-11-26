/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation Origins
 */

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ImbricateOriginObject, useOrigins } from "../origin/hooks/use-origins";

export const NavigationOrigins: FC = () => {

    const origins = useOrigins();
    const navigate = useNavigate();

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
                    navigate("/origin-new");
                }}
            >
                Add Origin
            </ListboxItem>
        </Listbox>
        <Listbox
            aria-label="origin-list"
            items={origins}
            onAction={(key) => {
                navigate(`/origin/${key}`);
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
