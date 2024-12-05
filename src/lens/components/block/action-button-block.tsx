/**
 * @author WMXPY
 * @namespace Lens_Components_Block
 * @description Action Button Block
 */

import React, { FC } from "react";
import { LensBlockDataActionButton } from "../../types/lens-definition";

export type ActionButtonBlockProps = {

    readonly block: LensBlockDataActionButton;
};

export const ActionButtonBlock: FC<ActionButtonBlockProps> = (
    props: ActionButtonBlockProps,
) => {

    return (<div
        className="my-2"
    >
        <h2
            className="text-2xl font-bold"
        >
            {props.block.title}
        </h2>
    </div>);
};
