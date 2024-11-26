/**
 * @author WMXPY
 * @namespace Origin_Components_OriginNew
 * @description New Origin Switch
 */

import React, { FC } from "react";
import { OriginStorageInstanceOrigin } from "../../origin-storage";
import { ORIGIN_TYPE } from "../../types/origin-types";
import { NewOriginStackAPIOrigin } from "../origin-new-types/stack-api-origin";

export type NewOriginSwitchProps = {

    readonly originInstance: OriginStorageInstanceOrigin;
    readonly onOriginChange: (originInstance: OriginStorageInstanceOrigin) => void;

    readonly originType: ORIGIN_TYPE | null;
};

export const NewOriginSwitch: FC<NewOriginSwitchProps> = (
    props: NewOriginSwitchProps,
) => {

    if (!props.originType) {
        return null;
    }

    switch (props.originType) {

        case ORIGIN_TYPE.STACK_API: {
            return (<NewOriginStackAPIOrigin
                originInstance={props.originInstance}
                onOriginChange={props.onOriginChange}
            />);
        }
    }
};
