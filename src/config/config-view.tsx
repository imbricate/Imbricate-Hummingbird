/**
 * @author WMXPY
 * @namespace Config
 * @description Config View
 */

import { Navbar, NavbarBrand, NavbarContent, Spacer } from "@nextui-org/react";
import React, { FC } from "react";
import { FaCog } from "react-icons/fa";
import { useTitle } from "../navigation/hooks/use-title";

export type ConfigViewProps = {
};

// LAZY LOAD ONLY
const ConfigView: FC<ConfigViewProps> = (
    _props: ConfigViewProps,
) => {

    useTitle([
        "Config",
    ]);

    return (<div
        className="flex flex-col gap-2 pb-4 overflow-auto h-full min-h-full"
    >
        <Navbar
            maxWidth="full"
            isBordered
        >
            <NavbarBrand>
                <FaCog
                    className="text-2xl"
                />
                <Spacer />
            </NavbarBrand>
            <NavbarContent
                justify="center"
            >
                <p className="font-bold text-xl">
                    Config
                </p>
            </NavbarContent>
            <NavbarContent
                justify="end"
            >
            </NavbarContent>
        </Navbar>
        <div
            className="pr-2 h-full"
        >

        </div>
    </div>);
};

export default ConfigView;
