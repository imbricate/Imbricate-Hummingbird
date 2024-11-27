/**
 * @author WMXPY
 * @namespace View
 * @description View Wrapper
 */

import React, { FC } from "react";

const ViewApplication = React.lazy(() => import("./view-application"));

export const ViewWrapper: FC = () => {

    return <React.Suspense fallback={<div>Loading...</div>}>
        <ViewApplication />
    </React.Suspense>;
};
