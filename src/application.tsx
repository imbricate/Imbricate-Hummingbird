/**
 * @author WMXPY
 * @namespace Hummingbird
 * @description Application
 */

import React from "react";
import { Outlet } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import "./index.css";
import { Navigation } from "./navigation/navigation";
import { useOriginInitialization } from "./origin/hooks/use-initialization";

export const Application = () => {

    const darkMode = useDarkMode(false);
    useOriginInitialization();

    return (<main
        className={`${darkMode.value ? "dark" : ""} text-foreground bg-background`}
    >
        <div className="flex px-1 py-2">
            <Navigation />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    </main>);
};
