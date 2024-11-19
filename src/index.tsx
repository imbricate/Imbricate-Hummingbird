/**
 * @author WMXPY
 * @namespace Hummingbird
 * @description Index
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ApplicationRouter } from "./router";
import { applicationStore } from "./store/store";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
    (<React.StrictMode>
        <Provider store={applicationStore}>
            <BrowserRouter>
                <ApplicationRouter />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>),
);
