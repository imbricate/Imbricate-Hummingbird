/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Extra
 */

import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { TbMoodPuzzled } from "react-icons/tb";
import { ArrangeDocumentsResultItem } from "../../util/arrange-documents";
import { MdOutlineInfo } from "react-icons/md";

export type DocumentsTableExtraCellProps = {

    readonly item: ArrangeDocumentsResultItem;
};

export const DocumentsTableExtraCell: FC<DocumentsTableExtraCellProps> = (
    props: DocumentsTableExtraCellProps,
) => {

    const items: React.ReactElement[] = [];

    items.push(<div key="document-information">
        <Popover
            placement="left"
        >
            <PopoverTrigger>
                <Button
                    isIconOnly
                    color="primary"
                    variant="light"
                    size="sm"
                >
                    <MdOutlineInfo />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {props.item.documentIdentifier}
            </PopoverContent>
        </Popover>
    </div>);

    if (props.item.floatingProperties.length > 0) {

        items.push(<div key="floating-properties">
            <Popover
                placement="left"
            >
                <PopoverTrigger>
                    <Button
                        isIconOnly
                        color="warning"
                        variant="light"
                        size="sm"
                    >
                        <TbMoodPuzzled />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    {props.item.floatingProperties.map((floatingProperty) => {
                        return (<div
                            key={floatingProperty.propertyIdentifier}
                            className="px-1 py-2"
                        >
                            <div className="text-small font-bold">
                                {floatingProperty.propertyIdentifier}
                            </div>
                            <div className="text-tiny">
                                {floatingProperty.propertyValue.value}
                            </div>
                        </div>);
                    })}
                </PopoverContent>
            </Popover>
        </div>);
    }

    return (<div
        className="flex gap-1"
    >
        {items}
    </div>);
};
