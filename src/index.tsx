/**
 * @author WMXPY
 * @namespace Hummingbird
 * @description Index
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { ApplicationRouter } from "./router";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
    (<React.StrictMode>
        <BrowserRouter>
            <ApplicationRouter />
        </BrowserRouter>
    </React.StrictMode>),
);
