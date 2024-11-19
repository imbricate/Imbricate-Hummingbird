/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin Hooks
 */

import { IImbricateOrigin } from "@imbricate/core";
import { getOriginStorageInstance } from "./origin-storage";

export class OriginHook {

    public readonly origins: IImbricateOrigin[];
}

export const useOrigins = () => {

    const originInstances = getOriginStorageInstance();

    for (const origin of originInstances.origins) {
        console.log(origin);
    }
};
