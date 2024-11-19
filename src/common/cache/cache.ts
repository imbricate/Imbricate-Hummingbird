/**
 * @author WMXPY
 * @namespace Common_Cache
 * @description Cache
 */

import { CacheManager } from "./cache-manager";

export const findCache = <T>(
    identifier: string,
    dependencies: string[],
): T | null => {

    const cacheManager: CacheManager = CacheManager.getInstance();

    return cacheManager.get<T>(identifier, dependencies);
};

export const saveCache = <T>(
    identifier: string,
    dependencies: string[],
    value: T,
): void => {

    const cacheManager: CacheManager = CacheManager.getInstance();

    cacheManager.set<T>(identifier, dependencies, value);
};
