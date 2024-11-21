/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Default Value
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";

export const getDefaultValueOfProperty = (type: IMBRICATE_PROPERTY_TYPE): any => {

    switch (type) {
        case IMBRICATE_PROPERTY_TYPE.STRING: return "";
        case IMBRICATE_PROPERTY_TYPE.MARKDOWN: return null;
    }

    return null;
};
