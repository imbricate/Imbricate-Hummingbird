/**
 * @author WMXPY
 * @namespace Lens_Util
 * @description User Friendly
 */

import { LENS_CONFIG_SOURCE } from "../types/lens-config";

export const getUserFriendlyLensSourceName = (source: LENS_CONFIG_SOURCE): string => {

    switch (source) {

        case LENS_CONFIG_SOURCE.IMBRISCRIPT: return "ImbriScript";
    }

    return "Unknown";
};
