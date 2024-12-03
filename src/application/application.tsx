/**
 * @author WMXPY
 * @namespace Application
 * @description Application
 */

import React from "react";
import { Outlet } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import "../index.css";
import { useLensInitialization } from "../lens/hooks/use-initialization";
import { Navigation } from "../navigation/navigation";
import { useOriginInitialization } from "../origin/hooks/use-initialization";

// LAZY LOAD ONLY
const Application = () => {

    const darkMode = useDarkMode(false);
    useOriginInitialization();
    useLensInitialization();

    return (<main
        className={`${darkMode.value ? "dark" : ""} text-foreground bg-background h-screen`}
    >
        <div className="flex gap-2 h-full">
            <Navigation />
            <div className="flex-1 overflow-hidden h-full">
                <Outlet />
            </div>
        </div>
    </main>);
};

export default Application;
