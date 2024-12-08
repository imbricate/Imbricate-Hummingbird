/**
 * @author WMXPY
 * @namespace Lens_Components_Block
 * @description Columns Block
 */

import React, { FC, JSX } from "react";
import { LENS_BLOCK_TYPE, LensBlock, LensBlockDataColumns, LensBlockDataColumnsColumn } from "../../types/lens-definition";

export type ColumnsBlockProps = {

    readonly block: LensBlockDataColumns;

    readonly renderBlocks: (blocks: LensBlock<LENS_BLOCK_TYPE>[]) => JSX.Element;
};

export const ColumnsBlock: FC<ColumnsBlockProps> = (
    props: ColumnsBlockProps,
) => {

    return (<div>
        {props.block.columns.map((
            column: LensBlockDataColumnsColumn,
            index: number,
        ) => {

            const key = `${column.blocks.length}-${index}`;

            return (<div
                key={key}
            >
                {props.renderBlocks(column.blocks)}
            </div>);
        })}
    </div>);
};
