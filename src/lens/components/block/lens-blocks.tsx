/**
 * @author WMXPY
 * @namespace Lens_Components_Block
 * @description Lens Blocks
 */

import React, { FC } from "react";
import { LENS_BLOCK_TYPE, LensBlock, LensBlockDateDocumentCard, LensDefinition } from "../../types/lens-definition";
import { LensDocumentCardBlockWrapper } from "./document-card-block-wrapper";

export type LensBlocksProps = {

    readonly lensDefinition: LensDefinition;
};

export const LensBlocks: FC<LensBlocksProps> = (
    props: LensBlocksProps,
) => {

    return (<div>
        {props.lensDefinition.blocks.map((
            block: LensBlock<LENS_BLOCK_TYPE>,
            index: number,
        ) => {

            const key = `${block.type}-${index}`;

            switch (block.type) {

                case LENS_BLOCK_TYPE.DOCUMENT_CARD: {

                    return (<LensDocumentCardBlockWrapper
                        key={key}
                        block={block.data as LensBlockDateDocumentCard}
                    />);
                }
            }
            return null;
        })}
    </div>);
};
