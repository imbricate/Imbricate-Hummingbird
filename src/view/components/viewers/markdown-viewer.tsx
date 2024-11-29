/**
 * @author WMXPY
 * @namespace View_Components_Viewers
 * @description Markdown Viewer
 */

import React, { FC } from "react";
import { ImbricateOriginObject } from "../../../origin/hooks/use-origins";
import { useText } from "../../../text/hooks/use-text";
import { useMarkdownStyle } from "../../hooks/use-markdown-style";
import { useMermaid } from "../../hooks/use-mermaid";
import { transformMarkdown } from "../../markdown/transform-markdown";
import { useHighlightStyle } from "../../hooks/use-highlight";

export type ViewMarkdownViewerProps = {

    readonly origin: ImbricateOriginObject;
    readonly textUniqueIdentifier?: string;
};

export const ViewMarkdownViewer: FC<ViewMarkdownViewerProps> = (props: ViewMarkdownViewerProps) => {

    const textContent = useText(
        props.origin.origin.uniqueIdentifier,
        props.textUniqueIdentifier,
    );

    const [rendered, setRendered] = React.useState<string | null>(null);

    useMermaid(() => typeof rendered === "string", [rendered]);
    useMarkdownStyle(() => typeof rendered === "string", [rendered]);
    useHighlightStyle(() => typeof rendered === "string", [rendered]);

    React.useEffect(() => {

        const execute = async () => {

            if (!textContent) {
                return;
            }

            const markdown = await transformMarkdown(textContent.textContent);
            setRendered(markdown);
        };

        execute();
    }, [textContent?.textContent]);

    if (!textContent || !rendered) {
        return null;
    }

    return (<div
        dangerouslySetInnerHTML={{
            __html: rendered,
        }}
        className="markdown-body p-5"
    />);
};
