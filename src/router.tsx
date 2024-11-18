/**
 * @author WMXPY
 * @namespace Hummingbird
 * @description Router
 */

import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import { Application } from "./application";
import { DatabasesView } from "./database/databases-view";

export const ApplicationRouter = () => {

    const navigate = useNavigate();

    return (<NextUIProvider navigate={navigate} useHref={useHref}>
        <Routes>
            <Route path="/" element={<Application />} errorElement={<div>
                Not Found
            </div>}>
                <Route path="databases" element={<DatabasesView />} />
            </Route>
        </Routes>
    </NextUIProvider>);
};
