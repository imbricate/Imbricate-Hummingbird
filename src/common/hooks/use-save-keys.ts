/**
 * @author WMXPY
 * @namespace Common_Hooks
 * @description Use Save Keys
 */

import { useEffect } from "react";

export const useSaveKeys = (onSave: () => void) => {

    useEffect(() => {
        console.debug("Save Keys Hook Initialized");

        const handleKeyDown = (event: KeyboardEvent) => {

            if ((event.ctrlKey || event.metaKey) && event.key === "s") {
                event.preventDefault();
                onSave();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            console.debug("Save Keys Hook Terminated");
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onSave]);
};
