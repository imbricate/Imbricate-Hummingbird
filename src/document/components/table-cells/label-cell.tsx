/**
 * @author WMXPY
 * @namespace Document_Components_TableCells
 * @description Label Cell
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaPropertyOptionsLabel, ImbricateDatabaseSchemaPropertyOptionsLabelOption } from "@imbricate/core";
import { Chip, Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { getLabelColorClassName, getLabelColorDot, getLabelColorTextClassNameReverse } from "../../../database/utils/label-color";
import { DocumentTableCellContent } from "./cell-content";

export type DocumentTableLabelCellProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.LABEL>;
    readonly getEditingProperty: () => DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.LABEL> | undefined;
    readonly updateEditingProperty: (value: DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.LABEL>) => void;
    readonly editing: boolean;

    readonly options: ImbricateDatabaseSchemaPropertyOptionsLabel;
};

export const DocumentTableLabelCell: FC<DocumentTableLabelCellProps> = (
    props: DocumentTableLabelCellProps,
) => {

    if (props.editing) {

        const updatedProperty = props.getEditingProperty();

        if (typeof updatedProperty === "undefined") {
            throw new Error("[Imbricate] Updated property value not found");
        }

        return (<Select
            aria-label="Select label"
            selectionMode={props.options.allowMultiple ? "multiple" : "single"}
            selectedKeys={new Set(updatedProperty)}
            onSelectionChange={(newSelection) => {

                const newValue: any[] = Array.from(newSelection);

                props.updateEditingProperty(newValue);
            }}
        >
            {props.options.labelOptions.map((each) => {
                return <SelectItem
                    key={each.labelIdentifier}
                    startContent={getLabelColorDot(each.labelColor)}
                >
                    {each.labelName}
                </SelectItem>;
            })}
        </Select>);
    }

    return (<DocumentTableCellContent
        schemaType={IMBRICATE_PROPERTY_TYPE.LABEL}
        property={props.property}
        render={(value) => {

            if (!Array.isArray(value)) {
                return null;
            }

            const fixedValue: string[] = value as string[];

            return (<div className="flex gap-1 flex-wrap">
                {fixedValue
                    .map((each: string) => {
                        const targetOption = props.options.labelOptions.find((option) => option.labelIdentifier === each);

                        if (!targetOption) {
                            return null;
                        }

                        return targetOption;
                    })
                    .filter((each) => each !== null)
                    .map((each: ImbricateDatabaseSchemaPropertyOptionsLabelOption) => {
                        return (<Chip
                            key={each.labelIdentifier}
                            size="sm"
                            classNames={{
                                base: getLabelColorClassName(each.labelColor) ?? "",
                                content: getLabelColorTextClassNameReverse(each.labelColor) ?? "",
                            }}
                        >
                            {each.labelName}
                        </Chip>);
                    })}
            </div>);
        }}
    />);
};
