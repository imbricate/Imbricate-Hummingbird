/**
 * @author WMXPY
 * @namespace Lens_Types
 * @description Lens Definition
 */

export enum LENS_BLOCK_TYPE {

    DOCUMENT_CARD = "DOCUMENT_CARD",
}

export type LensBlockDataSwitch<T extends LENS_BLOCK_TYPE> =
    T extends LENS_BLOCK_TYPE.DOCUMENT_CARD ? LensBlockDateDocumentCard
    : never;

export type LensBlockDateDocumentCard = {

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;
};

export type LensBlock<T extends LENS_BLOCK_TYPE> = {

    readonly type: T;
    readonly data: LensBlockDataSwitch<T>;
};

export type LensDefinition = {

    readonly blocks: LensBlock<LENS_BLOCK_TYPE>[];
};
