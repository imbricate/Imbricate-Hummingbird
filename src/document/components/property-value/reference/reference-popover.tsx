/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue_Reference
 * @description Reference Popover
 */

import { DocumentPropertyValue, DocumentPropertyValueObjectReference, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaPropertyOptionsReference } from "@imbricate/core";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { FaCheck, FaLink, FaPlus } from "react-icons/fa";
import { CommonDocumentSelect, CommonDocumentSelectResponse } from "../../../../common/components/document-selector";
import { NextUIRadius, NextUISize } from "../../../../common/types/next-ui";

export type DocumentReferenceValueReferencePopoverProps = {

    readonly size?: NextUISize;
    readonly radius?: NextUIRadius;
    readonly iconOnly?: boolean;

    readonly propertyKey: string;
    readonly currentProperty: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.REFERENCE>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.REFERENCE>) => void;

    readonly options: ImbricateDatabaseSchemaPropertyOptionsReference;
};

export const DocumentReferenceValueReferencePopover: FC<DocumentReferenceValueReferencePopoverProps> = (
    props: DocumentReferenceValueReferencePopoverProps,
) => {

    const [toBeLinked, setToBeLinked] = React.useState<CommonDocumentSelectResponse | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const allowedDatabase: string[] = Array.isArray(props.options.databases)
        ? props.options.databases.map((each) => each.databaseUniqueIdentifier)
        : [];

    const isSingleReference = !props.options.allowMultiple;
    const shouldDisableLink = isSingleReference && props.currentProperty.value.length > 0;

    return (<Popover
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={(open) => {
            setIsOpen(open);
        }}
    >
        <PopoverTrigger
            disabled={shouldDisableLink}
        >
            <Button
                color="primary"
                variant="flat"
                isDisabled={shouldDisableLink}
                radius={props.radius}
                size={props.size}
                isIconOnly={props.iconOnly}
            >
                {isSingleReference
                    ? <FaLink
                        className={props.iconOnly ? "text-large" : undefined}
                    />
                    : <FaPlus
                        className={props.iconOnly ? "text-large" : undefined}
                    />} {props.iconOnly ? "" : "Link Document"}
            </Button>
        </PopoverTrigger>
        <PopoverContent
            className="min-w-[356px] p-2 flex flex-col gap-2 items-end"
        >
            <CommonDocumentSelect
                allowedDatabases={allowedDatabase}
                filterDocument={(document) => {
                    return !props.currentProperty.value.some((each: DocumentPropertyValueObjectReference) => {
                        return each.documentUniqueIdentifier === document.uniqueIdentifier;
                    });
                }}
                onSelectCancel={() => {
                    setToBeLinked(null);
                }}
                onSelectConfirm={(response) => {
                    setToBeLinked(response);
                }}
            />
            {toBeLinked && <Button
                color="success"
                variant="flat"
                onClick={() => {

                    if (!toBeLinked) {
                        return;
                    }
                    setIsOpen(false);

                    const newValue: DocumentPropertyValueObjectReference[] = [
                        ...props.currentProperty.value,
                        {
                            originUniqueIdentifier: toBeLinked.selectedOriginUniqueIdentifier,
                            databaseUniqueIdentifier: toBeLinked.selectedDatabase.uniqueIdentifier,
                            documentUniqueIdentifier: toBeLinked.selectedDocument.uniqueIdentifier,
                        },
                    ];

                    props.updateProperty({
                        type: IMBRICATE_PROPERTY_TYPE.REFERENCE,
                        value: newValue,
                    });

                    setToBeLinked(null);
                }}
            >
                <FaCheck /> Link Document
            </Button>}
        </PopoverContent>
    </Popover>);
};
