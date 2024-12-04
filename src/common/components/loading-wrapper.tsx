/**
 * @author WMXPY
 * @namespace Common_Components
 * @description Loading Wrapper
 */

import { Spinner } from "@nextui-org/react";
import React, { FC } from "react";
import { NextUIColor } from "../types/next-ui";

export type LoadingWrapperProps = {

    readonly label?: string[];
    readonly color?: NextUIColor;
};

export const LoadingWrapper: FC<LoadingWrapperProps> = (
    props: LoadingWrapperProps,
) => {

    return (<div
        className="w-full h-full flex justify-center items-center"
    >
        <Spinner
            className="font-mono whitespace-pre text-center"
            color={props.color}
            size="lg"
            label={Array.isArray(props.label)
                ? props.label.map((value) => {
                    return value.toUpperCase().split("").join(" ");
                }).join("\n")
                : undefined}
        />
    </div>);
};
