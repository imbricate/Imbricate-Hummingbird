/**
 * @author WMXPY
 * @namespace Common_Ongoing
 * @description Ongoing Manager
 */

export class OngoingManager {

    private static _instance: OngoingManager;

    public static getInstance(): OngoingManager {

        if (!this._instance) {
            this._instance = new OngoingManager();
        }
        return this._instance;
    }

    private readonly _ongoingOperations: Map<string, PromiseLike<any>>;

    private constructor() {

        this._ongoingOperations = new Map();
    }

    public async execute<T>(
        identifier: string,
        execute: () => PromiseLike<T>,
    ): Promise<T> {

        const ongoing: PromiseLike<any> | undefined = this._ongoingOperations.get(identifier);

        if (ongoing) {
            const result = await ongoing;

            console.debug("[Hummingbird-Ongoing-Deduplicated]", identifier, result);
            return result;
        }

        const promise: PromiseLike<T> = execute();
        this._ongoingOperations.set(identifier, promise);

        const result: T = await promise;
        this._ongoingOperations.delete(identifier);

        console.debug("[Hummingbird-Ongoing-Executed]", identifier, result);
        return result;
    }
}
