/**
 * @author WMXPY
 * @namespace View_Hooks
 * @description Use Highlight
 */

import React from "react";

export const useHighlightStyle = (
    condition: () => boolean,
    dependencies: any[],
): void => {

    React.useEffect(() => {

        if (!condition()) {
            return;
        }

        const linkTag = document.createElement("link");
        linkTag.rel = "stylesheet";
        linkTag.type = "text/css";
        linkTag.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css";

        const scriptTag = document.createElement("script");
        scriptTag.id = "highlight-js-script";
        scriptTag.src = "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/highlight.min.js";

        const executeScriptTag = document.createElement("script");
        // Run hljs.highlightAll() when scriptTag is loaded
        executeScriptTag.innerHTML = [
            "document.getElementById('highlight-js-script').addEventListener('load', () => {",
            "    hljs.highlightAll();",
            "});",
        ].join("\n");

        document.head.appendChild(linkTag);
        document.body.appendChild(scriptTag);
        document.body.appendChild(executeScriptTag);

        return () => {

            document.head.removeChild(linkTag);
            document.body.removeChild(scriptTag);
            document.body.removeChild(executeScriptTag);
        };
    }, dependencies);
};
