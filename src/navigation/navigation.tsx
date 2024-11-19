/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { Tab, Tabs } from "@nextui-org/react";
import React, { FC } from "react";
import { NavigationLogo } from "./logo";
import { NavigationDatabases } from "./navigation-databases";
import { NavigationOrigins } from "./navigation-origins";
import { NavigationViews } from "./navigation-views";

export const Navigation: FC = () => {

    return (<div className="w-full max-w-[260px]">
        <div className="w-full justify-center items-center flex my-2">
            <NavigationLogo />
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
