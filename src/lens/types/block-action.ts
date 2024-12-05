/**
 * @author WMXPY
 * @namespace Lens_Types
 * @description Block Action
 */

export enum LENS_BLOCK_ACTION_TARGET_SOURCE {

    IMBRISCRIPT = "IMBRISCRIPT",
}

export type LensBlockActionTargetImbriscript = {

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;
    readonly propertyKey: string;
};

export type LensBlockActionTarget<T extends LENS_BLOCK_ACTION_TARGET_SOURCE> = {

    readonly source: T;

    readonly target: LensBlockActionTargetImbriscript;
};

export type LensBlockAction<T extends LENS_BLOCK_ACTION_TARGET_SOURCE> = {

    readonly source: T;
    readonly target: LensBlockActionTarget<T>;
};
