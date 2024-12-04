/**
 * @author WMXPY
 * @namespace Lens_Types
 * @description Lens Definition
 */

export enum LENS_BLOCK_TYPE {

    DOCUMENT_CARD = "DOCUMENT_CARD",
    GROUP_HEADER = "GROUP_HEADER",
}

export type LensBlockDataSwitch<T extends LENS_BLOCK_TYPE> =
    T extends LENS_BLOCK_TYPE.DOCUMENT_CARD ? LensBlockDataDocumentCard
    : T extends LENS_BLOCK_TYPE.GROUP_HEADER ? LensBlockDataGroupHeader
    : never;

export type LensBlockDataDocumentCard = {

    readonly database: string;
    readonly document: string;

    readonly properties?: string[];
};

export type LensBlockDataGroupHeader = {

    readonly header: string;
};

export type LensBlock<T extends LENS_BLOCK_TYPE> = {

    readonly type: T;
    readonly data: LensBlockDataSwitch<T>;
};

export type LensDefinition = {

    readonly blocks: LensBlock<LENS_BLOCK_TYPE>[];
};
