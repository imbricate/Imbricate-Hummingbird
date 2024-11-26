/**
 * @author WMXPY
 * @namespace Origin_Hooks
 * @description Origins
 */

import { IImbricateOrigin } from "@imbricate/core";
import { useMemo } from "react";
import { useOriginSlice } from "../../store/feature/origin";
import { ImbricateStackAPIOrigin } from "@imbricate/origin-stack-api";
import { OriginStorageInstanceOrigin } from "../origin-storage";

export type ImbricateOriginObject = {

    readonly originName: string;
    readonly originInstance: OriginStorageInstanceOrigin;
    readonly origin: IImbricateOrigin;
};

export const useOrigins = (): ImbricateOriginObject[] => {

    const originState = useOriginSlice();

    const origins: ImbricateOriginObject[] = useMemo(() => {

        const result: ImbricateOriginObject[] = [];

        for (const origin of originState.originInstance.origins) {

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
    }, [originState]);

    return origins;
};
