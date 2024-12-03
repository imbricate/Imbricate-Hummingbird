/**
 * @author WMXPY
 * @namespace Lens_Storage
 * @description Lens Config
 */

import { LensConfig } from "../types/lens-config";

const LENS_LOCAL_STORAGE_KEY: string = "IMBRICATE_LENS_CONFIG";

export const readLendsConfig = (): LensConfig => {

    const configString: string | null = localStorage.getItem(LENS_LOCAL_STORAGE_KEY);

    if (!configString) {
        return {
            items: [],
        };
    }

    return JSON.parse(configString);
};

export const writeLensConfig = (config: LensConfig): void => {

    const configString: string = JSON.stringify(config);
    localStorage.setItem(LENS_LOCAL_STORAGE_KEY, configString);
};
