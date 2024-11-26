/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin View
 */

import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { OriginDatabaseListView } from "./components/origin-database-list-view";
import { OriginInformationView } from "./components/origin-information-view";
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

    return (<div
        className="flex flex-col gap-2"
    >
        <OriginInformationView
            originInstance={targetOrigin.originInstance}
        />
        <OriginDatabaseListView
            originName={targetOrigin.originName}
            origin={targetOrigin.origin}
        />
    </div>);
};
