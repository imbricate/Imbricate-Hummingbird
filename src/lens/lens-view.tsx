/**
 * @author WMXPY
 * @namespace Lens
 * @description Lens View
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useAsyncTitle } from "../navigation/hooks/use-title";
import { useLensConfig } from "./hooks/use-lenses";
import { LENS_CONFIG_SOURCE, LensConfig, LensConfigItem } from "./types/lens-config";

export type LensViewProps = {
};

export const LensView: FC<LensViewProps> = (
    _props: LensViewProps,
) => {

    const params = useParams();
    const lensIdentifier: string =
        params["lens-identifier"] as string;

    const lensConfig: LensConfig = useLensConfig();

    const targetLens: LensConfigItem<LENS_CONFIG_SOURCE> | undefined =
        lensConfig.items.find((lens: LensConfigItem<LENS_CONFIG_SOURCE>) => {
            return lens.lensIdentifier === lensIdentifier;
        });

    useAsyncTitle(
        () => Boolean(targetLens),
        () => {
            return [
                targetLens!.lensName,
                "Lens",
            ];
        },
        [targetLens?.lensIdentifier],
    );

    if (!targetLens) {
        return null;
    }

    return (<div
        className="flex flex-col gap-2"
    >
        {targetLens.lensName}
    </div>);
};
