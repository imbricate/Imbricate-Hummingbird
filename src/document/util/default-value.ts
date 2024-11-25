/**
 * @author WMXPY
 * @namespace Document_Utils
 * @description Default Value
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";

// IMBRICATE_PROPERTY_TYPE SWITCH
export const getDefaultValueOfProperty = (type: IMBRICATE_PROPERTY_TYPE): any => {

    switch (type) {
        case IMBRICATE_PROPERTY_TYPE.BOOLEAN: return false;
        case IMBRICATE_PROPERTY_TYPE.STRING: return "";
        case IMBRICATE_PROPERTY_TYPE.NUMBER: return 0;
        case IMBRICATE_PROPERTY_TYPE.MARKDOWN: return "";
        case IMBRICATE_PROPERTY_TYPE.REFERENCE: return [];
    }

    return null;
};
