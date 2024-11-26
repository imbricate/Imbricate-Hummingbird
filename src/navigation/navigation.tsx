/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { Button, Tab, Tabs } from "@nextui-org/react";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { NavigationLogo } from "./logo";
import { NavigationDatabases } from "./navigation-databases";
import { NavigationOrigins } from "./navigation-origins";
import { NavigationViews } from "./navigation-views";

export const Navigation: FC = () => {

    return (<div className="w-full max-w-[260px]">
        <div className="w-full justify-center items-center flex my-2">
            <NavigationLogo />
        </div>
        <div className="w-full mt-2 mb-2">
            <Button
                startContent={<FaSearch />}
                color="secondary"
                variant="solid"
                fullWidth
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
                key="views"
                title="Views"
            >
                <NavigationViews />
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
