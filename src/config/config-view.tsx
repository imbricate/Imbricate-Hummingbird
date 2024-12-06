/**
 * @author WMXPY
 * @namespace Config
 * @description Config View
 */

import { Card, CardBody, CardHeader, Navbar, NavbarBrand, NavbarContent, Spacer } from "@nextui-org/react";
import React, { FC } from "react";
import { FaCog } from "react-icons/fa";
import { useTitle } from "../navigation/hooks/use-title";
import { ConfigBrandBanner } from "./components/brand-banner";

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
        className="flex flex-col gap-2 overflow-auto h-full min-h-full"
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
            className="pr-2 flex-1 min-h-0 min-w-0 flex gap-2"
        >
            <div
                className="after:contents('')"
            >
                <ConfigBrandBanner />
            </div>
            <div
                className="flex-1"
            >
                <Card>
                    <CardHeader>
                        <p>
                            Config
                        </p>
                    </CardHeader>
                    <CardBody>
                        <p>
                            Config
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div >);
};

export default ConfigView;
