/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Reference Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, DocumentPropertyValueObjectReference, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaPropertyOptionsReference } from "@imbricate/core";
import { Chip } from "@nextui-org/react";
import React, { FC } from "react";
import { DocumentReferenceValueReferencePopover } from "../property-value/reference/reference-popover";
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
            return (<Chip
                color="primary"
            >
                {fixedValue.length} References
            </Chip>);
        }

        return (<Chip
            size="sm"
            color="warning"
        >
            No Reference
        </Chip >);
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
                    type: props.property.type,
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
