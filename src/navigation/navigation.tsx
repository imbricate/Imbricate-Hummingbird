/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { Button, Tab, Tabs } from "@nextui-org/react";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavigationLogo } from "./logo";
import { NavigationDatabases } from "./navigation-databases";
import { NavigationLens } from "./navigation-lens";
import { NavigationOrigins } from "./navigation-origins";

export const Navigation: FC = () => {

    const navigate = useNavigate();

    return (<div className="w-full max-w-[270px] p-1 overflow-auto relative">
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
                    navigate("/search");
                }}
            >
                Search
            </Button>
        </div>
        <Tabs
            fullWidth
            variant="solid"
            defaultSelectedKey="databases"
        >
            <Tab
                key="origins"
                title="Origins"
            >
                <NavigationOrigins />
            </Tab>
            <Tab
                key="lens"
                title="Lens"
            >
                <NavigationLens />
            </Tab>
            <Tab
                key="databases"
                title="Databases"
            >
                <NavigationDatabases />
            </Tab>
        </Tabs>
    </div>);
};
