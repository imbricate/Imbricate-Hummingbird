/**
 * @author WMXPY
 * @namespace Lens_Components_Renders
 * @description Render Imbriscript
 */

import { END_SIGNAL, MarkedResult, Sandbox } from "@sudoo/marked";
import React, { FC } from "react";
import { LoadingWrapper } from "../../../common/components/loading-wrapper";
import { UsePropertyResponse } from "../../../property/hooks/use-property";
import { S_TextLoading, S_TextNotFound, S_TextNotInitialized, useText } from "../../../text/hooks/use-text";
import { createMarkedSandbox } from "../../script/sandbox";
import { LENS_CONFIG_SOURCE, LensConfigItem } from "../../types/lens-config";
import { LensDefinition } from "../../types/lens-definition";
import { LensBlocks } from "../lens-blocks";

export type RenderImbriscriptLensProps = {

    readonly version: number;

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
        [props.version],
    );

    const [executeResult, setExecuteResult] = React.useState<MarkedResult | null>(null);

    const textContentSummary = typeof textContent === "symbol"
        ? textContent.toString()
        : textContent.textContent.length;

    React.useEffect(() => {

        const execute = async () => {

            setExecuteResult(null);

            if (textContent === S_TextLoading
                || textContent === S_TextNotFound
                || textContent === S_TextNotInitialized
            ) {
                return;
            }

            const sandbox: Sandbox = createMarkedSandbox();
            const response = await sandbox.evaluate(textContent.textContent);

            setExecuteResult(response);
        };

        execute();
    }, [textContentSummary, props.version]);

    if (!executeResult) {
        return (<LoadingWrapper
            color="current"
            label={[
                "Executing",
                "Imbriscript",
            ]}
        />);
    }

    if (executeResult.signal !== END_SIGNAL.SUCCEED) {
        console.error("Execute Imbriscript Failed", executeResult);
        return null;
    }

    const result: LensDefinition | null = executeResult.exports.default;

    if (!result) {
        return (<div>
            <div>Result Not Found</div>
        </div>);
    }

    return (<LensBlocks
        lensDefinition={result}
    />);
};
