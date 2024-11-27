/**
 * @author WMXPY
 * @namespace View
 * @description View Wrapper
 */

import React, { FC } from "react";
import { FullLoadingWrapper } from "../common/components/full-loading-wrapper";

const ViewApplication = React.lazy(() => import("./view-application"));

export const ViewWrapper: FC = () => {

    return <React.Suspense
        fallback={<FullLoadingWrapper />}
    >
        <ViewApplication />
    </React.Suspense>;
};
