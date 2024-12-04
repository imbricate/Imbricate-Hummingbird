/**
 * @author WMXPY
 * @namespace Lens_Components_Block
 * @description Group Header Block
 */

import React, { FC } from "react";
import { LensBlockDataGroupHeader } from "../../types/lens-definition";

export type GroupHeaderBlockProps = {

    readonly block: LensBlockDataGroupHeader;
};

export const GroupHeaderBlock: FC<GroupHeaderBlockProps> = (
    props: GroupHeaderBlockProps,
) => {

    return (<div
        className="my-2"
    >
        <h2
            className="text-2xl font-bold"
        >
            {props.block.header}
        </h2>
    </div>);
};
