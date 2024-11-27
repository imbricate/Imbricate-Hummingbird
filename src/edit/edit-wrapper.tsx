/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit Wrapper
 */

import React, { FC } from "react";
import { FullLoadingWrapper } from "../common/components/full-loading-wrapper";
import "../index.css";

const EditApplication = React.lazy(() => import("./edit-application"));

export const EditWrapper: FC = () => {

    return (<React.Suspense
        fallback={<FullLoadingWrapper />}
    >
        <EditApplication />
    </React.Suspense>);
};
