/**
 * @author WMXPY
 * @namespace Common_Components
 * @description Loading Wrapper
 */

import { Spinner } from "@nextui-org/react";
import React from "react";
import { FC } from "react";

export const LoadingWrapper: FC = () => {

    return (<div
        className="w-full h-full flex justify-center items-center"
    >
        <Spinner
            color="warning"
            size="lg"
        />
    </div>);
};
