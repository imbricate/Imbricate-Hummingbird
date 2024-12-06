/**
 * @author WMXPY
 * @namespace Config_Components
 * @description Brand Banner
 */

import React, { FC } from "react";

export type ConfigBrandBannerProps = {
};

export const ConfigBrandBanner: FC<ConfigBrandBannerProps> = (
    _props: ConfigBrandBannerProps,
) => {

    return (<div
        style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
        }}
        className="font-mono text-tiny select-none pointer-events-none overflow-hidden -mt-1"
    >
        <div
            className="break-keep text-nowrap h-full"
        >
            A T E {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
        <div
            className="break-keep text-nowrap h-full"
        >
            {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
        <div
            className="break-keep text-nowrap h-full"
        >
            R I C A T E {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
        <div
            className="break-keep text-nowrap h-full"
        >
            A T E {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
        <div
            className="break-keep text-nowrap h-full"
        >
            {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
    </div>);
};
