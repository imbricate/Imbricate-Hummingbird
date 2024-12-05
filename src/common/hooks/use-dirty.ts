/**
 * @author WMXPY
 * @namespace Common_Hooks
 * @description Use Dirty
 */

import { useEffect, useState } from "react";

export type UseDirtyFunction = (isDirty: boolean) => void;

export const useDirty = (): UseDirtyFunction => {

    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isDirty]);

    return setIsDirty;
};
