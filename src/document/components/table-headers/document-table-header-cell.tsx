/**
 * @author WMXPY
 * @namespace Document_Components_TableHeaders
 * @description Document Table Header Cell
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Tooltip } from "@nextui-org/react";
import React, { FC } from "react";
import { AiFillFileUnknown } from "react-icons/ai";
import { FaExternalLinkSquareAlt, FaMarkdown } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
import { PiTextTBold } from "react-icons/pi";
import { RiNumbersFill } from "react-icons/ri";
import { CommonCopyItem } from "../../../common/components/copy-item";
import { ArrangeDocumentsResult } from "../../util/arrange-documents";

export type DocumentsTableHeaderCellProps = {

    readonly propertyIdentifier: string;
    readonly arrangedDocuments: ArrangeDocumentsResult;
};

const getIcon = (propertyType: IMBRICATE_PROPERTY_TYPE): React.ReactNode => {

    // IMBRICATE_PROPERTY_TYPE SWITCH
    switch (propertyType) {

        case IMBRICATE_PROPERTY_TYPE.BOOLEAN:
            return <IoMdCheckbox />;
        case IMBRICATE_PROPERTY_TYPE.STRING:
            return <PiTextTBold />;
        case IMBRICATE_PROPERTY_TYPE.NUMBER:
            return <RiNumbersFill />;
        case IMBRICATE_PROPERTY_TYPE.DATE:
            return <PiTextTBold />;
        case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
            return <FaMarkdown />;
        case IMBRICATE_PROPERTY_TYPE.LABEL:
            return <PiTextTBold />;
        case IMBRICATE_PROPERTY_TYPE.REFERENCE:
            return <FaExternalLinkSquareAlt />;
    }

    return <AiFillFileUnknown />;
};

export const DocumentsTableHeaderCell: FC<DocumentsTableHeaderCellProps> = (
    props: DocumentsTableHeaderCellProps,
) => {

    const propertyType: IMBRICATE_PROPERTY_TYPE = props.arrangedDocuments.propertyTypesMap[props.propertyIdentifier];

    return (<Tooltip
        content={<CommonCopyItem
            startContent="Property Identifier"
            content={props.propertyIdentifier}
        />}
        delay={1000}
        placement="bottom"
    >
        <div className="flex gap-1 items-center">
            <div>
                {getIcon(propertyType)}
            </div>
            <div>
                {props.arrangedDocuments.propertyNameMap[props.propertyIdentifier]}
            </div>
        </div>
    </Tooltip>);
};
