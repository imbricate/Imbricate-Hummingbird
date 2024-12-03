/**
 * @author WMXPY
 * @namespace Lens_Components
 * @description Lens Render
 */

import React, { FC } from "react";
import { LENS_CONFIG_SOURCE, LensConfigItem } from "../types/lens-config";
import { RenderImbriscriptLensWrapper } from "./renders/render-imbriscript-wrapper";

export type LensRenderProps = {

    readonly lensItem: LensConfigItem<LENS_CONFIG_SOURCE>;
};

export const LensRender: FC<LensRenderProps> = (
    props: LensRenderProps,
) => {

    switch (props.lensItem.source) {

        case LENS_CONFIG_SOURCE.IMBRISCRIPT: {

            return (<RenderImbriscriptLensWrapper
                lensItem={props.lensItem}
            />);
        }
    }
};
