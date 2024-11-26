/**
 * @author WMXPY
 * @namespace Property_Hooks
 * @description Use Text
 */

import { IImbricateText } from "@imbricate/core";
import { useEffect, useState } from "react";
import { executeDeduplicate } from "../../common/ongoing/ongoing";
import { ImbricateOriginObject, useOrigins } from "../../origin/hooks/use-origins";

export type UseTextResponse = {

    readonly textContent: string;
};

export const useText = (
    originUniqueIdentifier: string,
    textUniqueIdentifier?: string,
): UseTextResponse | null => {

    const origins: ImbricateOriginObject[] = useOrigins();
    const targetOrigin = origins.find((origin: ImbricateOriginObject) => origin.origin.uniqueIdentifier === originUniqueIdentifier);

    const [text, setText] = useState<string | null>(null);

    if (!targetOrigin) {
        return null;
    }

    useEffect(() => {

        const execute = async () => {

            if (!textUniqueIdentifier) {
                setText("Text document not initialized");
                return;
            }

            if (!targetOrigin) {
                return;
            }

            const text: IImbricateText | null = await executeDeduplicate(
                `get-text-${textUniqueIdentifier}`,
                () => targetOrigin.origin
                    .getTextManager()
                    .getText(textUniqueIdentifier),
            );

            if (!text) {
                setText("Text document not found");
                return;
            }

            const textContent: string = await text.getContent();
            setText(textContent);
        };

        execute();
    }, [originUniqueIdentifier, textUniqueIdentifier]);

    if (text === null) {
        return null;
    }

    return {
        textContent: text,
    };
};
