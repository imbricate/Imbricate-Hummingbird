/**
 * @author WMXPY
 * @namespace Origin_Util
 * @description Realize Origins
 */

import { ImbricateStackAPIOrigin } from "@imbricate/origin-stack-api";
import { ImbricateOriginObject } from "../hooks/use-origins";
import { OriginStorageInstance } from "../origin-storage";

export const realizeOrigins = (
    originInstance: OriginStorageInstance,
): ImbricateOriginObject[] => {

    const result: ImbricateOriginObject[] = [];

    for (const origin of originInstance.origins) {

        switch (origin.type) {

            case "@imbricate/origin-stack-api": {

                result.push({
                    originName: origin.originName,
                    originInstance: origin,
                    origin: ImbricateStackAPIOrigin.create({
                        basePath: origin.basePath,
                        authentication: origin.authentication,
                    }),
                });
            }
        }
    }

    return result;
};
