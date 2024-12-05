/**
 * @author WMXPY
 * @namespace Property_Utils
 * @description Get Icon
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import React from "react";
import { AiFillFileUnknown } from "react-icons/ai";
import { FaExternalLinkSquareAlt, FaMarkdown } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
import { LuFileJson } from "react-icons/lu";
import { MdDateRange, MdLabel } from "react-icons/md";
import { PiFilmScriptFill, PiTextTBold } from "react-icons/pi";
import { RiNumbersFill } from "react-icons/ri";

export const getPropertyIcon = (
    propertyType: IMBRICATE_PROPERTY_TYPE,
    className?: string,
): React.ReactNode => {

    // IMBRICATE_PROPERTY_TYPE SWITCH
    switch (propertyType) {

        case IMBRICATE_PROPERTY_TYPE.BOOLEAN:
            return <IoMdCheckbox
                className={className}
            />;
        case IMBRICATE_PROPERTY_TYPE.STRING:
            return <PiTextTBold
                className={className}
            />;
        case IMBRICATE_PROPERTY_TYPE.NUMBER:
            return <RiNumbersFill
                className={className}
            />;
        case IMBRICATE_PROPERTY_TYPE.DATE:
            return <MdDateRange
                className={className}
            />;
        case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
            return <FaMarkdown
                className={className}
            />;
        case IMBRICATE_PROPERTY_TYPE.IMBRISCRIPT:
            return <PiFilmScriptFill
                className={className}
            />;
        case IMBRICATE_PROPERTY_TYPE.JSON:
            return <LuFileJson
                className={className}
            />;
        case IMBRICATE_PROPERTY_TYPE.LABEL:
            return <MdLabel
                className={className}
            />;
        case IMBRICATE_PROPERTY_TYPE.REFERENCE:
            return <FaExternalLinkSquareAlt
                className={className}
            />;
    }

    return <AiFillFileUnknown
        className={className}
    />;
};
