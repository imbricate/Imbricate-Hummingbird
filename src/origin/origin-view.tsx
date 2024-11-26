/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin View
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { OriginDatabaseListView } from "./components/origin-database-list-view";
import { ImbricateOriginObject, useOrigins } from "./hooks/use-origins";

export type OriginViewProps = {
};

export const OriginView: FC<OriginViewProps> = (
    _props: OriginViewProps,
) => {

    const params = useParams();
    const originUniqueIdentifier: string =
        params["origin-unique-identifier"] as string;

    const origins: ImbricateOriginObject[] = useOrigins();

    const targetOrigin: ImbricateOriginObject | undefined = origins.find((origin: ImbricateOriginObject) => {
        return origin.origin.uniqueIdentifier === originUniqueIdentifier;
    });

    if (!targetOrigin) {
        return null;
    }

    return (<OriginDatabaseListView
        originName={targetOrigin.originName}
        origin={targetOrigin.origin}
    />);
};
