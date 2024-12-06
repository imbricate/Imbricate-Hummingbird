/**
 * @author WMXPY
 * @namespace Config
 * @description Config View
 */

import { Button, Card, CardBody, CardHeader, Divider, Navbar, NavbarBrand, NavbarContent, Spacer } from "@nextui-org/react";
import React, { FC } from "react";
import { FaCog, FaGithub } from "react-icons/fa";
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
        className="h-full min-h-full flex flex-col"
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
            className="flex-1 min-h-0 min-w-0 flex gap-2 h-full"
        >
            <ConfigBrandBanner />
            <div
                className="flex-1 h-full overflow-auto"
            >
                <div
                    className="flex flex-col gap-2 pr-2 py-2"
                >
                    <Card
                        shadow="none"
                        className="border-1"
                    >
                        <CardHeader>
                            Resources
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <Button
                                fullWidth
                                startContent={<FaGithub />}
                                variant="light"
                            >
                                Github
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    </div >);
};

export default ConfigView;
