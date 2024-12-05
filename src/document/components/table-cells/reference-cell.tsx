/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Reference Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, DocumentPropertyValueObjectReference, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaPropertyOptionsReference } from "@imbricate/core";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { FC } from "react";
import { DocumentReferenceValueReferencePopover } from "../property-value/reference/reference-popover";
import { DocumentReferenceValueSelectedReference } from "../property-value/reference/selected-reference";
import { DocumentTableCellContent } from "./cell-content";

export type DocumentTableReferenceCellProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.REFERENCE>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.REFERENCE> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.REFERENCE>) => void;
    readonly editing: boolean;

    readonly options: ImbricateDatabaseSchemaPropertyOptionsReference;
};

export const DocumentTableReferenceCell: FC<DocumentTableReferenceCellProps> = (
    props: DocumentTableReferenceCellProps,
) => {

    const renderChip = (value: any) => {

        if (!Array.isArray(value)) {
            return null;
        }

        const fixedValue: DocumentPropertyValueObjectReference[] =
            Array.isArray(value)
                ? value
                : [];

        if (fixedValue.length > 0) {
            return (<Popover>
                <PopoverTrigger>
                    <Button
                        color="primary"
                        size="sm"
                        variant="flat"
                    >
                        {fixedValue.length} References
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-3 flex flex-col gap-1"
                >
                    {fixedValue.map((item) => {

                        const fixedKey: string = [
                            item.originUniqueIdentifier,
                            item.databaseUniqueIdentifier,
                            item.documentUniqueIdentifier,
                        ].join("/");

                        return (<DocumentReferenceValueSelectedReference
                            key={fixedKey}
                            reference={item}
                            onDelete={() => {

                                const newValue: DocumentPropertyValueObjectReference[] = fixedValue.filter((value) => {
                                    return value.originUniqueIdentifier !== item.originUniqueIdentifier
                                        || value.databaseUniqueIdentifier !== item.databaseUniqueIdentifier
                                        || value.documentUniqueIdentifier !== item.documentUniqueIdentifier;
                                });

                                props.updateEditingProperty(newValue);
                            }}
                        />);
                    })}
                </PopoverContent>
            </Popover>);
        }

        return (<Button
            color="warning"
            size="sm"
            variant="flat"
            isDisabled
        >
            No Reference
        </Button>);
    };

    if (props.editing) {

        const updatedProperty = props.getEditingProperty();

        if (typeof updatedProperty === "undefined") {
            throw new Error("[Imbricate] Updated property value not found");
        }

        return (<div
            className="flex gap-1 items-center"
        >
            {renderChip(updatedProperty)}
            <DocumentReferenceValueReferencePopover
                size="sm"
                radius="full"
                iconOnly
                propertyKey={props.propertyKey}
                currentProperty={{
                    type: props.property
                        ? props.property.type
                        : IMBRICATE_PROPERTY_TYPE.REFERENCE,
                    value: updatedProperty,
                }}
                updateProperty={(newProperty) => {
                    props.updateEditingProperty(newProperty.value);
                }}
                options={props.options}
            />
        </div>);
    }

    return (<DocumentTableCellContent
        schemaType={IMBRICATE_PROPERTY_TYPE.REFERENCE}
        property={props.property}
        render={renderChip}
    />);
};
