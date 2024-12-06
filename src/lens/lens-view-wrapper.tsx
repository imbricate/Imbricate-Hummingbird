/**
 * @author WMXPY
 * @namespace Lens
 * @description Lens View Wrapper
 */

import React, { FC } from "react";
import { LoadingWrapper } from "../common/components/loading-wrapper";

const LensViewApplication = React.lazy(() => import("./lens-view"));

export const LensViewWrapper: FC = () => {

    return <React.Suspense
        fallback={<LoadingWrapper />}
    >
        <LensViewApplication />
    </React.Suspense>;
};
