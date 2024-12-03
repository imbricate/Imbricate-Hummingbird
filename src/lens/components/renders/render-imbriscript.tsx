/**
 * @author WMXPY
 * @namespace Lens_Components_Renders
 * @description Render Imbriscript
 */

import { END_SIGNAL, Sandbox } from "@sudoo/marked";
import React, { FC } from "react";
import { UsePropertyResponse } from "../../../property/hooks/use-property";
import { S_TextLoading, S_TextNotFound, S_TextNotInitialized, useText } from "../../../text/hooks/use-text";
import { createMarkedSandbox } from "../../script/sandbox";
import { LENS_CONFIG_SOURCE, LensConfigItem } from "../../types/lens-config";
import { LensDefinition } from "../../types/lens-definition";
import { LensBlocks } from "../block/lens-blocks";

export type RenderImbriscriptLensProps = {

    readonly lensItem: LensConfigItem<LENS_CONFIG_SOURCE.IMBRISCRIPT>;
    readonly property: UsePropertyResponse;
    readonly textIdentifier?: string;
};

export const RenderImbriscriptLens: FC<RenderImbriscriptLensProps> = (
    props: RenderImbriscriptLensProps,
) => {

    const textContent = useText(
        props.property.origin.origin.uniqueIdentifier,
        props.textIdentifier,
    );

    const [executeResult, setExecuteResult] = React.useState<LensDefinition | null>(null);

    React.useEffect(() => {

        const execute = async () => {

            if (textContent === S_TextLoading
                || textContent === S_TextNotFound
                || textContent === S_TextNotInitialized
            ) {
                return;
            }

            const sandbox: Sandbox = createMarkedSandbox();

            const response = await sandbox.evaluate(textContent.textContent);

            if (response.signal !== END_SIGNAL.SUCCEED) {

                console.error("Execute Imbriscript Failed", response);
                return;
            }

            const result: LensDefinition | null = response.exports.default;

            if (!result) {
                console.error("Invalid Imbriscript Result", response);
                return;
            }

            setExecuteResult(result);
        };

        execute();
    }, [textContent]);

    if (!executeResult) {
        return null;
    }

    return (<LensBlocks
        lensDefinition={executeResult}
    />);
};
