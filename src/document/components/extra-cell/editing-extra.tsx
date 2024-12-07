/**
 * @author WMXPY
 * @namespace Document_Components_ExtraCell
 * @description Editing Extra
 */

import { Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { GoTelescopeFill } from "react-icons/go";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { MdEdit, MdOutlineInfo } from "react-icons/md";
import { TbMoodPuzzled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { CommonCopyItem } from "../../../common/components/copy-item";
import { DocumentEditingController } from "../../controller/editing-controller";
import { ArrangeDocumentsResultItem } from "../../util/arrange-documents";

export type DocumentsTableEditingExtraCellProps = {

    readonly databaseUniqueIdentifier: string;
    readonly item: ArrangeDocumentsResultItem;
    readonly editingController: DocumentEditingController;
};

export const DocumentsTableEditingExtraCell: FC<DocumentsTableEditingExtraCellProps> = (
    props: DocumentsTableEditingExtraCellProps,
) => {

    const items: React.ReactElement[] = [];

    const navigate = useNavigate();

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
                onClick={() => {
                    props.editingController.saveEditingDocument(props.item.document);
                }}
            >
                <IoCheckmarkSharp />
            </Button>
            <Button
                isIconOnly
                color="danger"
                variant="solid"
                size="sm"
                onClick={() => {
                    props.editingController.cancelEditingDocument(props.item.document);
                }}
            >
                <IoClose />
            </Button>
        </div>);

    } else {

        items.push(<div
            key="editing-status"
        >
            <ButtonGroup>
                <Button
                    color="primary"
                    variant="solid"
                    size="sm"
                    onClick={() => {
                        navigate(`/database/${props.databaseUniqueIdentifier}/document/${props.item.document.uniqueIdentifier}`);
                    }}
                >
                    <GoTelescopeFill /> View
                </Button>
                <Button
                    isIconOnly
                    color="secondary"
                    variant="flat"
                    size="sm"
                    onClick={() => {
                        props.editingController.startEditingDocument(props.item.document);
                    }}
                >
                    <MdEdit />
                </Button>
            </ButtonGroup>
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
                <CommonCopyItem
                    startContent="Document Unique Identifier"
                    content={props.item.document.uniqueIdentifier}
                />
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
                                {String(floatingProperty.propertyValue.value)}
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
