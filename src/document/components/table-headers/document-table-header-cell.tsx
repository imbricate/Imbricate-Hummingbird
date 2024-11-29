/**
 * @author WMXPY
 * @namespace Document_Components_TableHeaders
 * @description Document Table Header Cell
 */

import { IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Tooltip } from "@nextui-org/react";
import React, { FC } from "react";
import { FaStar } from "react-icons/fa";
import { CommonCopyItem } from "../../../common/components/copy-item";
import { getPropertyIcon } from "../../../property/utils/get-icon";
import { ArrangeDocumentsResult } from "../../util/arrange-documents";

export type DocumentsTableHeaderCellProps = {

    readonly propertyIdentifier: string;
    readonly arrangedDocuments: ArrangeDocumentsResult;
};

export const DocumentsTableHeaderCell: FC<DocumentsTableHeaderCellProps> = (
    props: DocumentsTableHeaderCellProps,
) => {

    const propertyType: IMBRICATE_PROPERTY_TYPE = props.arrangedDocuments.propertyTypesMap[props.propertyIdentifier];
    const isPrimary: boolean = props.arrangedDocuments.primaryPropertyIdentifier === props.propertyIdentifier;

    return (<Tooltip
        content={<CommonCopyItem
            startContent={isPrimary
                ? "Primary Property Identifier"
                : "Property Identifier"}
            content={props.propertyIdentifier}
        />}
        delay={1000}
        placement="bottom"
    >
        <div className="flex gap-1 items-center">
            {isPrimary
                && <div>
                    <FaStar />
                </div>}
            <div>
                {getPropertyIcon(propertyType)}
            </div>
            <div>
                {props.arrangedDocuments.propertyNameMap[props.propertyIdentifier]}
            </div>
        </div>
    </Tooltip>);
};
