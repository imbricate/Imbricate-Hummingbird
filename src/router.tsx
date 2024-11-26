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
import { DatabasesSchemaView } from "./database/schema-view";
import { EditApplication } from "./edit/edit-application";
import { NewOriginView } from "./origin/new-origin-view";
import { OriginView } from "./origin/origin-view";
import { ViewView } from "./view/view-view";

export const ApplicationRouter = () => {

    const navigate = useNavigate();

    return (<NextUIProvider navigate={navigate} useHref={useHref}>
        <Routes>
            <Route path="/" element={<Application />} errorElement={<div>
                Not Found
            </div>}>
                <Route
                    path="origin-new"
                    element={<NewOriginView />}
                />
                <Route
                    path="origin/:origin-unique-identifier"
                    element={<OriginView />}
                />
                <Route
                    path="databases"
                    element={<DatabasesView />}
                />
                <Route
                    path="database/:database-unique-identifier/documents"
                    element={<RawDatabase />}
                />
                <Route
                    path="database/:database-unique-identifier/schema"
                    element={<DatabasesSchemaView />}
                />
            </Route>
            <Route
                path="/view/:origin-unique-identifier/text/:text-unique-identifier"
                element={<ViewView />}
            />
            <Route
                path="/edit/:database-unique-identifier/document/:document-unique-identifier/property/:property-unique-identifier"
                element={<EditApplication />}
            />
        </Routes>
    </NextUIProvider>);
};
