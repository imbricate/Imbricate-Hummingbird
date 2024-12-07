/**
 * @author WMXPY
 * @namespace View_Markdown
 * @description Transform Markdown
 */

import { Renderer, Tokens, parse } from "marked";

export const transformMarkdown = async (markdown: string): Promise<string> => {

    const renderer = new Renderer();

    renderer.code = (token: Tokens.Code) => {

        switch (token.lang) {

            case "mermaid": {
                return `<pre class="mermaid">${token.text}</pre>`;
            }
        }
        return `<pre><code class="language-${token.lang}">${token.text}</code></pre>`;
    };

    return await parse(markdown, {
        renderer,
    });
};
