/**
 * @author WMXPY
 * @namespace Document
 * @description Document View Wrapper
 */

import React, { FC } from "react";
import { LoadingWrapper } from "../common/components/loading-wrapper";

const DocumentViewApplication = React.lazy(() => import("./document-view"));

export const DocumentViewWrapper: FC = () => {

    return <React.Suspense
        fallback={<LoadingWrapper />}
    >
        <DocumentViewApplication />
    </React.Suspense>;
};
