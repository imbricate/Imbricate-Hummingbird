/**
 * @author WMXPY
 * @namespace Navigation_Hooks
 * @description Use Title
 */

import { useEffect } from "react";

export const useTitle = (
    titles: string[],
): void => {

    const joinedTitle: string = [
        ...titles,
        "Imbricate Hummingbird",
    ].join(" | ");

    useEffect(() => {

        document.title = joinedTitle;
    }, [joinedTitle]);
};

export const useAsyncTitle = (
    condition: () => boolean,
    getTitle: () => string[],
    deps: any[],
): void => {

    useEffect(() => {

        if (!condition()) {
            return;
        }

        const title = getTitle();
        document.title = [
            ...title,
            "Imbricate Hummingbird",
        ].join(" | ");
    }, deps);
};
