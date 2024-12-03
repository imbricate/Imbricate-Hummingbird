/**
 * @author WMXPY
 * @namespace Lens_Components_Block
 * @description Document Card Block
 */

import React, { FC } from "react";
import { LensBlockDateDocumentCard } from "../../types/lens-definition";

export type LensDocumentCardBlockProps = {

    readonly block: LensBlockDateDocumentCard;
};

export const LensDocumentCardBlock: FC<LensDocumentCardBlockProps> = (
    props: LensDocumentCardBlockProps,
) => {

    return (<div>
        {JSON.stringify(props.block)}
    </div>);
};
