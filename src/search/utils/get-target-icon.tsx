/**
 * @author WMXPY
 * @namespace Search_Utils
 * @description Get Target Icon
 */

import { IMBRICATE_SEARCH_TARGET_TYPE } from "@imbricate/core";
import React from "react";
import { AiFillFileUnknown } from "react-icons/ai";
import { FaDatabase, FaFile, FaMarkdown } from "react-icons/fa";

export const getSearchTargetIcon = (targetType: IMBRICATE_SEARCH_TARGET_TYPE): React.ReactNode => {

    // IMBRICATE_SEARCH_TARGET_TYPE SWITCH
    switch (targetType) {

        case IMBRICATE_SEARCH_TARGET_TYPE.DOCUMENT:
            return <FaFile />;
        case IMBRICATE_SEARCH_TARGET_TYPE.DATABASE:
            return <FaDatabase />;
        case IMBRICATE_SEARCH_TARGET_TYPE.MARKDOWN:
            return <FaMarkdown />;
    }

    return <AiFillFileUnknown />;
};
