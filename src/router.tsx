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
import { RawDatabase } from "./database/raw-database";
import { EditRoute } from "./edit/edit";
import { ViewRoute } from "./view/view";

export const ApplicationRouter = () => {

    const navigate = useNavigate();

    return (<NextUIProvider navigate={navigate} useHref={useHref}>
        <Routes>
            <Route path="/" element={<Application />} errorElement={<div>
                Not Found
            </div>}>
                <Route
                    path="databases"
                    element={<DatabasesView />}
                />
                <Route
                    path="database/:database-unique-identifier"
                    element={<RawDatabase />}
                />
            </Route>
            <Route
                path="/view/:text-unique-identifier"
                element={<ViewRoute />}
            />
            <Route
                path="/edit/:database-unique-identifier/document/:document-unique-identifier/property/:property-unique-identifier"
                element={<EditRoute />}
            />
        </Routes>
    </NextUIProvider>);
};
