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
import { MdDateRange, MdLabel } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";
import { RiNumbersFill } from "react-icons/ri";

export const getPropertyIcon = (propertyType: IMBRICATE_PROPERTY_TYPE): React.ReactNode => {

    // IMBRICATE_PROPERTY_TYPE SWITCH
    switch (propertyType) {

        case IMBRICATE_PROPERTY_TYPE.BOOLEAN:
            return <IoMdCheckbox />;
        case IMBRICATE_PROPERTY_TYPE.STRING:
            return <PiTextTBold />;
        case IMBRICATE_PROPERTY_TYPE.NUMBER:
            return <RiNumbersFill />;
        case IMBRICATE_PROPERTY_TYPE.DATE:
            return <MdDateRange />;
        case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
            return <FaMarkdown />;
        case IMBRICATE_PROPERTY_TYPE.LABEL:
            return <MdLabel />;
        case IMBRICATE_PROPERTY_TYPE.REFERENCE:
            return <FaExternalLinkSquareAlt />;
    }

    return <AiFillFileUnknown />;
};
