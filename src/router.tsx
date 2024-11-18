/**
 * @author WMXPY
 * @namespace Hummingbird
 * @description Router
 */

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Application } from "./application";

export const applicationRouter = createBrowserRouter([
    {
        path: "/",
        element: (<Application />),
        errorElement: (<div>Not Found</div>),
    },
]);
