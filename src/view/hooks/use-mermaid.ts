/**
 * @author WMXPY
 * @namespace View_Hooks
 * @description Use Mermaid
 */

import React from "react";

export const useMermaid = (
    condition: () => boolean,
    dependencies: any[],
): void => {

    React.useEffect(() => {

        if (!condition()) {
            return;
        }

        const scriptTag = document.createElement("script");
        scriptTag.type = "module";
        scriptTag.async = true;
        scriptTag.innerHTML = [
            "import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';",
            "mermaid.initialize({ startOnLoad: false });",
            "mermaid.run({querySelector: '.mermaid',});",
        ].join("\n");

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, dependencies);
};
