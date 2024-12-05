/**
 * @author WMXPY
 * @namespace Navigation
 * @description Logo
 */

import React, { FC } from "react";

export type NavigationLogoProps = {

    readonly size?: "tiny" | "small" | "large";
};

export const NavigationLogo: FC<NavigationLogoProps> = (
    props: NavigationLogoProps,
) => {

    return (<div
        className={`font-mono text-${props.size ?? "small"} font-bold`}
    >
        I M B<br />
        R I C<br />
        A T E
    </div>);
};
