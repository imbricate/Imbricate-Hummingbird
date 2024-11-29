/**
 * @author WMXPY
 * @namespace View_Hooks
 * @description Use Markdown Style
 */

import React from "react";

export const useMarkdownStyle = (
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
        linkTag.href = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css";

        document.head.appendChild(linkTag);

        return () => {

            document.head.removeChild(linkTag);
        };
    }, dependencies);
};
