/**
 * @author WMXPY
 * @namespace Document_Components_PropertyValue
 * @description Label Value
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaPropertyOptionsLabel } from "@imbricate/core";
import { Button, Chip, Select, SelectItem, SelectedItems } from "@nextui-org/react";
import React, { FC } from "react";
import { FaUnlink } from "react-icons/fa";
import { getLabelColorClassName, getLabelColorDot, getLabelColorTextClassNameReverse } from "../../../database/utils/label-color";

export type DocumentLabelValueProps = {

    readonly propertyKey: string;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.LABEL>;
    readonly deleteProperty: () => void;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.LABEL>) => void;

    readonly options: ImbricateDatabaseSchemaPropertyOptionsLabel;
};

export const DocumentLabelValue: FC<DocumentLabelValueProps> = (
    props: DocumentLabelValueProps,
) => {

    const parsedValue = Array.isArray(props.property.value)
        ? props.property.value
        : [];

    return (<div
        className="flex gap-1 w-full"
    >
        <div
            className="flex-1"
        >
            <Select
                aria-label="Select label"
                selectionMode={props.options.allowMultiple ? "multiple" : "single"}
                selectedKeys={new Set(parsedValue)}
                renderValue={(value: SelectedItems) => {
                    return value.map((each) => {

                        const labelColor = props.options.labelOptions.find((option) => option.labelIdentifier === each.key)?.labelColor;

                        return (<Chip
                            key={each.key}
                            size="sm"
                            className="mr-1 last:mr-0"
                            classNames={{
                                base: labelColor ?
                                    (getLabelColorClassName(labelColor) ?? "")
                                    : "",
                                content: labelColor ?
                                    (getLabelColorTextClassNameReverse(labelColor) ?? "")
                                    : "",
                            }}
                        >
                            {each.textValue}
                        </Chip>);
                    });
                }}
                onSelectionChange={(newSelection) => {

                    const newValue: any[] = Array.from(newSelection);

                    props.updateProperty({
                        type: IMBRICATE_PROPERTY_TYPE.LABEL,
                        value: newValue,
                    });
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
            </Select>
        </div>
        {parsedValue.length > 0 && <Button
            variant="flat"
            color="danger"
            isIconOnly
            onClick={props.deleteProperty}
        >
            <FaUnlink
                className="text-large"
            />
        </Button>}
    </div>);
};
