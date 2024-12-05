/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Reference Value
 */

import { DocumentPropertyValue, DocumentPropertyValueObjectReference, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaPropertyOptionsReference } from "@imbricate/core";
import React, { FC } from "react";
import { DocumentReferenceValueReferencePopover } from "./reference/reference-popover";
import { DocumentReferenceValueSelectedReference } from "./reference/selected-reference";

export type DocumentReferenceValueProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.REFERENCE>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.REFERENCE>) => void;

    readonly options: ImbricateDatabaseSchemaPropertyOptionsReference;
};

export const DocumentReferenceValue: FC<DocumentReferenceValueProps> = (
    props: DocumentReferenceValueProps,
) => {

    const fixedValue: DocumentPropertyValueObjectReference[] =
        Array.isArray(props.property.value)
            ? props.property.value
            : [];

    return (<div
        className="flex w-full gap-2"
    >
        <div
            className="flex-1 flex flex-col gap-1"
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

                        props.updateProperty({
                            type: IMBRICATE_PROPERTY_TYPE.REFERENCE,
                            value: newValue,
                        });
                    }}
                />);
            })}
        </div>
        <div>
            <DocumentReferenceValueReferencePopover
                radius="sm"
                propertyKey={props.propertyKey}
                currentProperty={{
                    type: props.property.type,
                    value: fixedValue,
                }}
                updateProperty={props.updateProperty}
                options={props.options}
            />
        </div>
    </div>);
};
