/**
 * @author WMXPY
 * @namespace Lens_Components
 * @description Lens Blocks
 */

import React, { FC } from "react";
import { LENS_BLOCK_TYPE, LensBlock, LensBlockDataActionButton, LensBlockDataColumns, LensBlockDataDocumentCard, LensBlockDataGroupHeader, LensDefinition } from "../types/lens-definition";
import { ActionButtonBlock } from "./block/action-button-block";
import { ColumnsBlock } from "./block/columns-block";
import { LensDocumentCardBlockWrapper } from "./block/document-card-block-wrapper";
import { GroupHeaderBlock } from "./block/group-header-block";

export type LensBlocksProps = {

    readonly lensDefinition: LensDefinition;
};

export const LensBlocks: FC<LensBlocksProps> = (
    props: LensBlocksProps,
) => {

    return (<div
        className="flex flex-col gap-2 pb-2"
    >
        {props.lensDefinition.blocks.map((
            block: LensBlock<LENS_BLOCK_TYPE>,
            index: number,
        ) => {

            const key = `${block.type}-${index}`;

            switch (block.type) {

                case LENS_BLOCK_TYPE.ACTION_BUTTON: {

                    return <ActionButtonBlock
                        key={key}
                        block={block.data as LensBlockDataActionButton}
                    />;
                }
                case LENS_BLOCK_TYPE.COLUMNS: {

                    return (<ColumnsBlock
                        key={key}
                        block={block.data as LensBlockDataColumns}
                        renderBlocks={(
                            blocks: LensBlock<LENS_BLOCK_TYPE>[],
                        ) => {
                            return (<LensBlocks
                                lensDefinition={{
                                    blocks,
                                }}
                            />);
                        }}
                    />);
                }
                case LENS_BLOCK_TYPE.DOCUMENT_CARD: {

                    return (<LensDocumentCardBlockWrapper
                        key={key}
                        block={block.data as LensBlockDataDocumentCard}
                    />);
                }
                case LENS_BLOCK_TYPE.GROUP_HEADER: {

                    return (<GroupHeaderBlock
                        key={key}
                        block={block.data as LensBlockDataGroupHeader}
                    />);
                }
            }
            return null;
        })}
    </div>);
};
