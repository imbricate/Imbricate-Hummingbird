/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { Button, Tab, Tabs } from "@nextui-org/react";
import React, { FC } from "react";
import { FaCog, FaSearch } from "react-icons/fa";
import { useNavigateConfigView, useNavigateSearchView } from "./hooks/use-routes";
import { NavigationLogo } from "./logo";
import { NavigationDatabases } from "./navigation-databases";
import { NavigationLenses } from "./navigation-lenses";
import { NavigationOrigins } from "./navigation-origins";

export const Navigation: FC = () => {

    const navigateToSearch = useNavigateSearchView();
    const navigateToConfig = useNavigateConfigView();

    return (<div className="w-full max-w-[270px] p-1 overflow-auto relative flex flex-col">
        <div className="w-full justify-center items-center flex my-2">
            <NavigationLogo />
        </div>
        <div className="w-full mt-2 mb-2 sticky top-0 z-20">
            <Button
                startContent={<FaSearch />}
                color="secondary"
                variant="solid"
                fullWidth
                onClick={() => {
                    navigateToSearch();
                }}
            >
                Search
            </Button>
        </div>
        <div
            className="flex-1 flex flex-col"
        >
            <div
                className="flex-1"
            >
                <Tabs
                    fullWidth
                    variant="solid"
                    defaultSelectedKey="lenses"
                >
                    <Tab
                        key="origins"
                        title="Origins"
                    >
                        <NavigationOrigins />
                    </Tab>
                    <Tab
                        key="lenses"
                        title="Lenses"
                    >
                        <NavigationLenses />
                    </Tab>
                    <Tab
                        key="databases"
                        title="Databases"
                    >
                        <NavigationDatabases />
                    </Tab>
                </Tabs>
            </div>
            <Button
                startContent={<FaCog />}
                variant="light"
                onClick={() => {
                    navigateToConfig();
                }}
            >
                Imbricate Hummingbird
            </Button>
        </div>
    </div>);
};
