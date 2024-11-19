/**
 * @author WMXPY
 * @namespace Common_Cache
 * @description Cache Manager
 */

export class CacheManager {

    private static _instance: CacheManager;

    public static getInstance(): CacheManager {

        if (!this._instance) {
            this._instance = new CacheManager();
        }
        return this._instance;
    }

    private readonly _cachedDependencies: Map<string, string[]>;
    private readonly _cachedResults: Map<string, any>;

    private constructor() {

        this._cachedDependencies = new Map();
        this._cachedResults = new Map();
    }

    public get<T>(
        identifier: string,
        dependencies: string[],
    ): T | null {

        const cachedDependencies: string[] | undefined = this._cachedDependencies.get(identifier);

        if (Array.isArray(cachedDependencies)) {

            let matched: boolean = true;
            for (let i = 0; i < dependencies.length; i++) {
                if (cachedDependencies[i] !== dependencies[i]) {
                    matched = false;
                }
            }

            if (matched) {
                const cachedResult: T | null = this._cachedResults.get(identifier);
                return cachedResult ?? null;
            }
        }
        return null;
    }

    public set<T>(
        identifier: string,
        dependencies: string[],
        result: T,
    ): void {

        this._cachedDependencies.set(identifier, dependencies);
        this._cachedResults.set(identifier, result);
    }

    public reset(
        identifier: string,
    ): void {

        this._cachedDependencies.delete(identifier);
        this._cachedResults.delete(identifier);
    }
}
