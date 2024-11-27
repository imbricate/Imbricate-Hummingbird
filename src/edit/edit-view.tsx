/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit View
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { useProperty } from "../property/hooks/use-property";
import { EditSaveButton } from "./components/save-button";
import { EditEditors } from "./edit-editors";
import { GetValueRef } from "./types/editor-refs";

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
            <div className="flex-1 font-mono ml-3">
                I M B R I C A T E
            </div>
            <EditSaveButton
                saveProperty={async () => {
                    if (!getValueRef.current) {
                        return;
                    }

                    const valueContent = await getValueRef.current();
                    const updatePropertyValue: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE> = {
                        type: property.schemaProperty.propertyType,
                        value: valueContent,
                    };

                    await property.document.document.putProperty(
                        property.schemaProperty.propertyIdentifier,
                        updatePropertyValue,
                    );
                }}
            />
        </div>
        <Divider />
        <EditEditors
            usePropertyResponse={property}
            getValueRef={getValueRef}
        />
    </div>;
};
