/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Extra
 */

import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
import { TbMoodPuzzled } from "react-icons/tb";
import { DocumentEditingController } from "../../controller/editing-controller";
import { ArrangeDocumentsResultItem } from "../../util/arrange-documents";
import { MdEdit } from "react-icons/md";

export type DocumentsTableExtraCellProps = {

    readonly item: ArrangeDocumentsResultItem;
    readonly editingController: DocumentEditingController;
};

export const DocumentsTableExtraCell: FC<DocumentsTableExtraCellProps> = (
    props: DocumentsTableExtraCellProps,
) => {

    const items: React.ReactElement[] = [];

    if (props.item.editing) {

        items.push(<div
            key="editing-status"
            className="flex gap-1"
        >
            <Button
                isIconOnly
                color="success"
                variant="solid"
                size="sm"
            >
                <IoCheckmarkSharp />
            </Button>
            <Button
                isIconOnly
                color="danger"
                variant="solid"
                size="sm"
            >
                <IoClose />
            </Button>
        </div>);

    } else {

        items.push(<div
            key="editing-status"
        >
            <Button
                isIconOnly
                color="secondary"
                variant="solid"
                size="sm"
            >
                <MdEdit />
            </Button>
        </div>);
    }

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
