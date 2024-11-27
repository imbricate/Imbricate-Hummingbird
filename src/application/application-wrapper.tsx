/**
 * @author WMXPY
 * @namespace Application
 * @description Application Wrapper
 */

import React, { FC } from "react";
import { FullLoadingWrapper } from "../common/components/full-loading-wrapper";

const Application = React.lazy(() => import("./application"));

export const ApplicationWrapper: FC = () => {

    return <React.Suspense
        fallback={<FullLoadingWrapper />}
    >
        <Application />
    </React.Suspense>;
};
