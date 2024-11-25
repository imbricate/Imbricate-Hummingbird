/**
 * @author WMXPY
 * @namespace Document_Components_ExtraCell
 * @description Creating Extra
 */

import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { FaRegSave } from "react-icons/fa";
import { DocumentEditingController } from "../../controller/editing-controller";

export type DocumentsTableCreatingExtraCellProps = {

    readonly creatingKey: string;
    readonly editingController: DocumentEditingController;
};

export const DocumentsTableCreatingExtraCell: FC<DocumentsTableCreatingExtraCellProps> = (
    props: DocumentsTableCreatingExtraCellProps,
) => {

    const items: React.ReactElement[] = [];

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
                props.editingController.saveCreatingDocument(props.creatingKey);
            }}
        >
            <FaRegSave />
        </Button>
    </div>);

    return (<div
        className="flex gap-1"
    >
        {items}
    </div>);
};
