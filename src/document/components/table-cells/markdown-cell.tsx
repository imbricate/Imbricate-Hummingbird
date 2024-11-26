/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Markdown Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { MdAddCircleOutline, MdEdit, MdOutlineInfo } from "react-icons/md";
import { DocumentTableCellContent } from "./cell-content";

export type DocumentTableMarkdownCellProps = {

    readonly databaseUniqueIdentifier?: string;
    readonly documentUniqueIdentifier?: string;

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.MARKDOWN> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.MARKDOWN>) => void;
    readonly editing: boolean;
};

export const DocumentTableMarkdownCell: FC<DocumentTableMarkdownCellProps> = (
    props: DocumentTableMarkdownCellProps,
) => {

    if (props.editing) {

        return (<div
            className="flex items-center gap-1"
        >
            <div>
                N/A
            </div>
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
                    Markdown property is not editable, please edit the markdown file directly after saving the document.
                </PopoverContent>
            </Popover>
        </div>);
    }

    return (<DocumentTableCellContent
        schemaType={IMBRICATE_PROPERTY_TYPE.MARKDOWN}
        property={props.property}
        render={(value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE>) => {

            const markdownAlreadyExists = typeof value === "string" && value.length > 0;
            const startContent = markdownAlreadyExists ? <MdEdit /> : <MdAddCircleOutline />;

            return (<Button
                startContent={startContent}
                color={markdownAlreadyExists ? "default" : "primary"}
                size="sm"
                variant="flat"
                onClick={() => {

                    if (!props.databaseUniqueIdentifier || !props.documentUniqueIdentifier) {
                        throw new Error("[Imbricate] Database or document unique identifier not found");
                    }

                    const win = window as Window | null;
                    if (win) {
                        win.open(`/edit/${props.databaseUniqueIdentifier}/document/${props.documentUniqueIdentifier}/property/${props.propertyKey}`, "_blank")?.focus();
                    }
                }}
            >
                Markdown
            </Button>);
        }}
    />);
};
