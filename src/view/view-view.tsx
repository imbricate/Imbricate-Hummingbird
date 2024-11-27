/**
 * @author WMXPY
 * @namespace View
 * @description View View
 */

import React, { FC } from "react";
import { useProperty } from "../property/hooks/use-property";
import { ViewViewers } from "./view-viewers";

export type ViewViewProps = {

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;
    readonly propertyUniqueIdentifier: string;
};

export const ViewView: FC<ViewViewProps> = (
    props: ViewViewProps,
) => {

    const property = useProperty(
        props.databaseUniqueIdentifier,
        props.documentUniqueIdentifier,
        props.propertyUniqueIdentifier,
    );

    if (!property) {
        return null;
    }

    return <div>
        <ViewViewers
            usePropertyResponse={property}
        />
    </div>;
};
