/**
 * @author WMXPY
 * @namespace Common_Components
 * @description Full Loading Wrapper
 */

import { Spinner } from "@nextui-org/react";
import React from "react";
import { FC } from "react";

export const FullLoadingWrapper: FC = () => {

    return (<div
        className="w-screen h-screen flex justify-center items-center font-mono"
    >
        <Spinner
            color="primary"
            size="lg"
            label="I M B R I C A T E"
        />
    </div>);
};
