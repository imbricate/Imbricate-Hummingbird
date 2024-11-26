/**
 * @author WMXPY
 * @namespace Origin_Components_OriginNewTypes
 * @description Stack API Origin
 */

import { Input, Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { OriginStorageInstanceOrigin } from "../../origin-storage";

export type NewOriginStackAPIOriginProps = {

    readonly originInstance: OriginStorageInstanceOrigin;
    readonly onOriginChange: (originInstance: OriginStorageInstanceOrigin) => void;
};

export const NewOriginStackAPIOrigin: FC<NewOriginStackAPIOriginProps> = (
    props: NewOriginStackAPIOriginProps,
) => {

    return (<div
        className="flex flex-col gap-2"
    >
        <Input
            label="Origin Name"
            value={props.originInstance.originName}
            onChange={(event) => {
                props.onOriginChange({
                    ...props.originInstance,
                    originName: event.target.value,
                });
            }}
        />
        <Input
            label="Base Path"
            value={props.originInstance.basePath}
            onChange={(event) => {
                props.onOriginChange({
                    ...props.originInstance,
                    basePath: event.target.value,
                });
            }}
        />
        <Select
            label="Authorization Type"
            defaultSelectedKeys={[props.originInstance.authentication.type]}
            onChange={(event) => {
                props.onOriginChange({
                    ...props.originInstance,
                    authentication: {
                        ...props.originInstance.authentication,
                        type: event.target.value as any,
                    },
                });
            }}
        >
            <SelectItem
                key={"Basic"}
            >
                Basic
            </SelectItem>
            <SelectItem
                key={"Bearer"}
            >
                Bearer
            </SelectItem>
        </Select>
        <Input
            label="Authorization Value"
            value={props.originInstance.authentication.value}
            onChange={(event) => {
                props.onOriginChange({
                    ...props.originInstance,
                    authentication: {
                        ...props.originInstance.authentication,
                        value: event.target.value,
                    },
                });
            }}
        />
    </div>);
};
