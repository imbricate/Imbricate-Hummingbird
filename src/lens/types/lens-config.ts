/**
 * @author WMXPY
 * @namespace Lens_Types
 * @description Lens Config
 */

export enum LENS_CONFIG_SOURCE {

    IMBRISCRIPT = "IMBRISCRIPT",
}

export type LensConfigTarget<T extends LENS_CONFIG_SOURCE> =
    T extends LENS_CONFIG_SOURCE.IMBRISCRIPT ? LensConfigTargetImbriscript
    : never;

export type LensConfigTargetImbriscript = {

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;
    readonly propertyKey: string;
};

export type LensConfigItem<T extends LENS_CONFIG_SOURCE> = {

    readonly lensIdentifier: string;

    readonly lensName: string;
    readonly source: T;
    readonly target: LensConfigTarget<T>;
};

export type LensConfig = {

    readonly items: LensConfigItem<LENS_CONFIG_SOURCE>[];
};
