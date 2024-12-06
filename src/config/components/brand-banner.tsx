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
        className="h-full font-mono text-tiny select-none pointer-events-none"
    >
        <div
            className="break-keep text-nowrap h-full overflow-hidden"
        >
            A T E {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
        <div
            className="break-keep text-nowrap h-full overflow-hidden"
        >
            {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
        <div
            className="break-keep text-nowrap h-full overflow-hidden"
        >
            R I C A T E {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
        <div
            className="break-keep text-nowrap h-full overflow-hidden"
        >
            A T E {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
        <div
            className="break-keep text-nowrap h-full overflow-hidden"
        >
            {("IMBRICATE".repeat(12)).split("").join(" ")}
        </div>
    </div>);
};
