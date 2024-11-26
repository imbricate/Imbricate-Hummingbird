/**
 * @author WMXPY
 * @namespace Origin_Components_OriginNew
 * @description New Origin Select
 */

import { Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { ORIGIN_TYPE, originTypeMap } from "../../types/origin-types";

export type NewOriginSelectProps = {

    readonly onSelect: (originType: ORIGIN_TYPE) => void;
};

export const NewOriginSelect: FC<NewOriginSelectProps> = (
    props: NewOriginSelectProps,
) => {

    return (<div>
        <Select
            label="Origin Type"
            className="max-w-xs"
            onChange={(event) => {
                props.onSelect(event.target.value as ORIGIN_TYPE);
            }}
        >
            <SelectItem
                key={ORIGIN_TYPE.STACK_API}
            >
                {originTypeMap[ORIGIN_TYPE.STACK_API]}
            </SelectItem>
        </Select>
    </div>);
};
