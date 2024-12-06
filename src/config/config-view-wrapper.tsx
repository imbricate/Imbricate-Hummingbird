/**
 * @author WMXPY
 * @namespace Config
 * @description Config View Wrapper
 */

import React, { FC } from "react";
import { LoadingWrapper } from "../common/components/loading-wrapper";

const ConfigViewApplication = React.lazy(() => import("./config-view"));

export const ConfigViewWrapper: FC = () => {

    return <React.Suspense
        fallback={<LoadingWrapper />}
    >
        <ConfigViewApplication />
    </React.Suspense>;
};
