/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Imbriscript Value
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { FaEye } from "react-icons/fa6";
import { MdAddCircleOutline, MdEdit } from "react-icons/md";
import { PiKeyholeFill } from "react-icons/pi";
import { CommonCopyItem } from "../../../common/components/copy-item";
import { openEditWindow, openViewWindow } from "../../../common/window/window";

export type DocumentImbriscriptValueProps = {

    readonly databaseUniqueIdentifier?: string;
    readonly documentUniqueIdentifier?: string;

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.IMBRISCRIPT>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.IMBRISCRIPT>) => void;
};

export const DocumentImbriscriptValue: FC<DocumentImbriscriptValueProps> = (
    props: DocumentImbriscriptValueProps,
) => {

    const fileAlreadyExists = props.property.value?.length > 0;

    if (fileAlreadyExists) {

        return (<div
            className="flex flex-col gap-1 w-full"
        >
            <div className="flex gap-1 items-center">
                <CommonCopyItem
                    startContent="ImbriScript Document Identifier"
                    prefix={<PiKeyholeFill />}
                    content={props.property.value}
                />
            </div>
            <Button
                fullWidth
                startContent={<MdEdit />}
                color="secondary"
                onClick={() => {

                    if (!props.databaseUniqueIdentifier || !props.documentUniqueIdentifier) {
                        throw new Error("[Imbricate] Database or document unique identifier not found");
                    }

                    openEditWindow(
                        props.databaseUniqueIdentifier,
                        props.documentUniqueIdentifier,
                        props.propertyKey,
                    );
                }}
            >
                Edit ImbriScript Document
            </Button>
            <Button
                fullWidth
                startContent={<FaEye />}
                onClick={() => {

                    if (!props.databaseUniqueIdentifier || !props.documentUniqueIdentifier) {
                        throw new Error("[Imbricate] Database or document unique identifier not found");
                    }

                    openViewWindow(
                        props.databaseUniqueIdentifier,
                        props.documentUniqueIdentifier,
                        props.propertyKey,
                    );
                }}
            >
                View ImbriScript Document
            </Button>
        </div>);
    }

    return (<Button
        fullWidth
        startContent={<MdAddCircleOutline />}
        color="primary"
        variant="flat"
        onClick={() => {

            if (!props.databaseUniqueIdentifier || !props.documentUniqueIdentifier) {
                throw new Error("[Imbricate] Database or document unique identifier not found");
            }

            openEditWindow(
                props.databaseUniqueIdentifier,
                props.documentUniqueIdentifier,
                props.propertyKey,
            );
        }}
    >
        Create ImbriScript Document
    </Button>);
};
