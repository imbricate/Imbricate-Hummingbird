/**
 * @author WMXPY
 * @namespace Hummingbird
 * @description Application
 */

import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";
import { Navigation } from "./navigation/navigation";

export const Application = () => {

    return (<div>
        <Navigation />
        <Outlet />
    </div>);
};
