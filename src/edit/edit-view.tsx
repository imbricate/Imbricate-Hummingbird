/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit View
 */

import { Button, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { FaRegSave } from "react-icons/fa";
import { useProperty } from "../property/hooks/use-property";
import { EditEditors } from "./edit-editors";
import { GetValueRef } from "./types/editor-refs";
import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";

export type EditViewProps = {

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;
    readonly propertyUniqueIdentifier: string;
};

export const EditView: FC<EditViewProps> = (props: EditViewProps) => {

    const property = useProperty(
        props.databaseUniqueIdentifier,
        props.documentUniqueIdentifier,
        props.propertyUniqueIdentifier,
    );

    const getValueRef: GetValueRef = React.useRef<(() => Promise<any>) | null>(null);

    if (!property) {
        return null;
    }

    return <div className="h-screen flex flex-col">
        <div
            className="m-2 flex items-center"
        >
            <div className="flex-1">
                Edit
            </div>
            <Button
                variant="solid"
                size="sm"
                color="primary"
                startContent={<FaRegSave />}
                onClick={async () => {
                    if (!getValueRef.current) {
                        return null;
                    }

                    const valueContent = await getValueRef.current();
                    const updatePropertyValue: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE> = {
                        type: property.schemaProperty.propertyType,
                        value: valueContent,
                    };

                    const editRecords = await property.document.document.putProperty(
                        property.schemaProperty.propertyIdentifier,
                        updatePropertyValue,
                    );

                    console.log(editRecords);
                }}
            >
                Save
            </Button>
        </div>
        <Divider />
        <EditEditors
            usePropertyResponse={property}
            getValueRef={getValueRef}
        />
    </div>;
};
