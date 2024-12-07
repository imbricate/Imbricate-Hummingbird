/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin Storage
 */

import { ImbricateStackAPIAuthentication } from "@imbricate/origin-stack-api/definition";

export type OriginStorageInstanceStackAPIOrigin = {

    readonly originName: string;
    readonly type: "@imbricate/origin-stack-api";
    readonly basePath: string;
    readonly authentication: ImbricateStackAPIAuthentication;
};

export type OriginStorageInstanceOrigin = OriginStorageInstanceStackAPIOrigin;

export type OriginStorageInstance = {

    readonly origins: OriginStorageInstanceOrigin[];
};

export const putOriginStorageInstance = (instance: OriginStorageInstance): void => {

    localStorage.setItem("origin-storage-instance", JSON.stringify(instance));
};

export const getOriginStorageInstance = (): OriginStorageInstance => {

    const raw: string | null = localStorage.getItem("origin-storage-instance");
    if (typeof raw !== "string") {
        return {
            origins: [],
        };
    }

    return JSON.parse(raw);
};
