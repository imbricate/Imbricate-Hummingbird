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

    return (<div className="flex px-1 py-2">
        <Navigation />
        <div className="flex-1">
            <Outlet />
        </div>
    </div>);
};
