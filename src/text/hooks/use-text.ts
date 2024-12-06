/**
 * @author WMXPY
 * @namespace Property_Hooks
 * @description Use Text
 */

import { IImbricateText } from "@imbricate/core";
import { useEffect, useState } from "react";
import { executeDeduplicate } from "../../common/ongoing/ongoing";
import { ImbricateOriginObject, useOrigins } from "../../origin/hooks/use-origins";

export const S_TextLoading: unique symbol = Symbol("TextLoading");
export const S_TextNotInitialized: unique symbol = Symbol("TextNotInitialized");
export const S_TextNotFound: unique symbol = Symbol("TextNotFound");

export type UseTextResponse =
    {

        readonly textContent: string;
    }
    | typeof S_TextLoading
    | typeof S_TextNotInitialized
    | typeof S_TextNotFound;

export const useText = (
    originUniqueIdentifier: string,
    textUniqueIdentifier?: string,
    dependencies?: any[],
): UseTextResponse => {

    const origins: ImbricateOriginObject[] = useOrigins();
    const targetOrigin = origins.find((origin: ImbricateOriginObject) => origin.origin.uniqueIdentifier === originUniqueIdentifier);

    const [text, setText] = useState<string | null>(null);
    const [responseSymbol, setResponseSymbol] = useState<UseTextResponse | null>(null);

    if (!targetOrigin) {
        return S_TextLoading;
    }

    const fixedDependencies: any[] = dependencies ?? [];

    useEffect(() => {

        const execute = async () => {

            if (!textUniqueIdentifier) {
                setResponseSymbol(S_TextNotInitialized);
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
                setResponseSymbol(S_TextNotFound);
                return;
            }

            const textContent: string = await text.getContent();
            setText(textContent);
        };

        execute();
    }, [originUniqueIdentifier, textUniqueIdentifier, ...fixedDependencies]);

    if (typeof responseSymbol === "symbol") {
        return responseSymbol;
    }

    if (text === null) {
        return S_TextLoading;
    }

    return {
        textContent: text,
    };
};
