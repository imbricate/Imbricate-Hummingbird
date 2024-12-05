/**
 * @author WMXPY
 * @namespace Lens_Types
 * @description Lens Definition
 */

import { LENS_BLOCK_ACTION_TARGET_SOURCE, LensBlockAction } from "./block-action";

export type LensBlockTarget = {

}

export enum LENS_BLOCK_TYPE {

    ACTION_BUTTON = "ACTION_BUTTON",
    COLUMNS = "COLUMNS",
    DOCUMENT_CARD = "DOCUMENT_CARD",
    GROUP_HEADER = "GROUP_HEADER",
}

export type LensBlockDataSwitch<T extends LENS_BLOCK_TYPE> =
    T extends LENS_BLOCK_TYPE.ACTION_BUTTON ? LensBlockDataActionButton
    : T extends LENS_BLOCK_TYPE.COLUMNS ? LensBlockDataColumns
    : T extends LENS_BLOCK_TYPE.DOCUMENT_CARD ? LensBlockDataDocumentCard
    : T extends LENS_BLOCK_TYPE.GROUP_HEADER ? LensBlockDataGroupHeader
    : never;

export type LensBlockDataActionButton = {

    readonly title: string;
    readonly description?: string;

    readonly action: LensBlockAction<LENS_BLOCK_ACTION_TARGET_SOURCE>;
};

export type LensBlockDataDocumentCard = {

    readonly database: string;
    readonly document: string;

    readonly properties?: string[];
};

export type LensBlockDataGroupHeader = {

    readonly header: string;
};

export type LensBlockDataColumnsColumn = {

    readonly blocks: LensBlock<LENS_BLOCK_TYPE>[];
};

export type LensBlockDataColumns = {

    readonly columns: LensBlockDataColumnsColumn[];
};

export type LensBlock<T extends LENS_BLOCK_TYPE> = {

    readonly type: T;
    readonly data: LensBlockDataSwitch<T>;
};

export type LensDefinition = {

    readonly blocks: LensBlock<LENS_BLOCK_TYPE>[];
};
