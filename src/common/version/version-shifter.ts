/**
 * @author WMXPY
 * @namespace Common_Version
 * @description Version Shifter
 */

export class VersionShifter {

    private static _instances: Map<string, VersionShifter> = new Map();

    public static getInstance(
        identifier: string,
    ): VersionShifter {

        if (!this._instances.has(identifier)) {
            this._instances.set(identifier, new VersionShifter());
        }

        return this._instances.get(identifier) as VersionShifter;
    }

    private _version: number;

    private constructor() {

        this._version = 0;
    }

    public get version(): number {
        return this._version;
    }

    public shift(): void {

        this._version++;
    }
}
