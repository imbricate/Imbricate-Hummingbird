/**
 * @author WMXPY
 * @namespace Application
 * @description Application
 */

import React from "react";
import { Outlet } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import "../index.css";
import { Navigation } from "../navigation/navigation";
import { useOriginInitialization } from "../origin/hooks/use-initialization";

// LAZY LOAD ONLY
const Application = () => {

    const darkMode = useDarkMode(false);
    useOriginInitialization();

    return (<main
        className={`${darkMode.value ? "dark" : ""} text-foreground bg-background min-h-screen`}
    >
        <div className="flex px-1 py-2 gap-2">
            <Navigation />
            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    </main>);
};

export default Application;
