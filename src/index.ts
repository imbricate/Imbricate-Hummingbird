/**
 * @author WMXPY
 * @namespace Hummingbird
 * @description Index
 */

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./app";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
    React.createElement(StrictMode, {
        children: React.createElement(Application),
    }),
);