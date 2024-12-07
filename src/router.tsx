/**
 * @author WMXPY
 * @namespace Hummingbird
 * @description Router
 */

import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import { ApplicationWrapper } from "./application/application-wrapper";
import { ConfigViewWrapper } from "./config/config-view-wrapper";
import { DatabasesView } from "./database/databases-view";
import { RawDatabase } from "./database/raw-database";
import { DatabasesSchemaView } from "./database/schema-view";
import { DocumentViewWrapper } from "./document/document-view-wrapper";
import { EditWrapper } from "./edit/edit-wrapper";
import { LensViewWrapper } from "./lens/lens-view-wrapper";
import { NewLensView } from "./lens/new-lens-view";
import { NewOriginView } from "./origin/new-origin-view";
import { OriginView } from "./origin/origin-view";
import { SearchView } from "./search/search-view";
import { ViewWrapper } from "./view/view-wrapper";

export const ApplicationRouter = () => {

    const navigate = useNavigate();

    return (<NextUIProvider
        navigate={navigate}
        useHref={useHref}
    >
        <Routes>
            <Route path="/" element={<ApplicationWrapper />} errorElement={<div>
                Not Found
            </div>}>
                <Route
                    path="config"
                    element={<ConfigViewWrapper />}
                />
                <Route
                    path="search"
                    element={<SearchView />}
                />
                <Route
                    path="origin-new"
                    element={<NewOriginView />}
                />
                <Route
                    path="origin/:origin-unique-identifier"
                    element={<OriginView />}
                />
                <Route
                    path="lens-new"
                    element={<NewLensView />}
                />
                <Route
                    path="lens/:lens-identifier"
                    element={<LensViewWrapper />}
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
                    path="database/:database-unique-identifier/document/:document-unique-identifier"
                    element={<DocumentViewWrapper />}
                />
                <Route
                    path="database/:database-unique-identifier/schema"
                    element={<DatabasesSchemaView />}
                />
            </Route>
            <Route
                path="/view/:database-unique-identifier/document/:document-unique-identifier/property/:property-unique-identifier"
                element={<ViewWrapper />}
            />
            <Route
                path="/edit/:database-unique-identifier/document/:document-unique-identifier/property/:property-unique-identifier"
                element={<EditWrapper />}
            />
        </Routes>
    </NextUIProvider>);
};
