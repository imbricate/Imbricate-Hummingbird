/**
 * @author WMXPY
 * @namespace Origin_Components
 * @description Origin Information View
 */

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { OriginStorageInstanceOrigin } from "../origin-storage";

export type OriginInformationViewProps = {

    readonly originInstance: OriginStorageInstanceOrigin;
};

export const OriginInformationView: FC<OriginInformationViewProps> = (
    props: OriginInformationViewProps,
) => {

    return (<div
        className="flex flex-col gap-2"
    >
        <Card
            shadow="none"
            className="border-1"
        >
            <CardHeader>
                Origin Information
            </CardHeader>
            <Divider />
            <CardBody
                className="whitespace-pre-wrap"
            >
                {JSON.stringify(props.originInstance, null, 2)}
            </CardBody>
        </Card>
    </div>);
};
