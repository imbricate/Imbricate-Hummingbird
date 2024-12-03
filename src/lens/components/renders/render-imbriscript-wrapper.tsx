/**
 * @author WMXPY
 * @namespace Lens_Components_Renders
 * @description Render Imbriscript Wrapper
 */

import React, { FC } from "react";
import { LENS_CONFIG_SOURCE, LensConfigItem } from "../../types/lens-config";
import { useProperty } from "../../../property/hooks/use-property";
import { RenderImbriscriptLens } from "./render-imbriscript";

export type RenderImbriscriptLensWrapperProps = {

    readonly lensItem: LensConfigItem<LENS_CONFIG_SOURCE.IMBRISCRIPT>;
};

export const RenderImbriscriptLensWrapper: FC<RenderImbriscriptLensWrapperProps> = (
    props: RenderImbriscriptLensWrapperProps,
) => {

    const property = useProperty(
        props.lensItem.target.databaseUniqueIdentifier,
        props.lensItem.target.documentUniqueIdentifier,
        props.lensItem.target.propertyKey,
    );

    if (!property) {
        return null;
    }

    if (property.documentProperty.value === null) {
        return null;
    }

    return (<RenderImbriscriptLens
        lensItem={props.lensItem}
        property={property}
        textIdentifier={property.documentProperty.value as string | undefined}
    />);
};
