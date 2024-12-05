/**
 * @author WMXPY
 * @namespace Common_Hooks
 * @description Use Version
 */

import React from "react";

export const useVersion = (): [number, () => void] => {

    const [version, updateVersion] = React.useReducer((x) => x + 1, 0);

    return [version, updateVersion];
};

export const useForceUpdate = (): (() => void) => {

    const [, updateVersion] = useVersion();

    return updateVersion;
};
