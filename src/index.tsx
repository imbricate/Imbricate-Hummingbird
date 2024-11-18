/**
 * @author WMXPY
 * @namespace Hummingbird
 * @description Index
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { applicationRouter } from "./router";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
    (<React.StrictMode>
        <RouterProvider
            router={applicationRouter}
        />
    </React.StrictMode>),
);
