/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit View
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { useProperty } from "../property/hooks/use-property";
import { EditViewTitle } from "./components/edit-title";
import { EditMagicButton } from "./components/magic-button";
import { EditEditors } from "./edit-editors";
import { GetValueRef } from "./types/editor-refs";
import { useDirty } from "../common/hooks/use-dirty";

export type EditViewProps = {

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;
    readonly propertyUniqueIdentifier: string;
};

export const EditView: FC<EditViewProps> = (props: EditViewProps) => {

    const setIsDirty = useDirty();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [valueChanged, setValueChanged] = React.useState<boolean>(false);

    const property = useProperty(
        props.databaseUniqueIdentifier,
        props.documentUniqueIdentifier,
        props.propertyUniqueIdentifier,
    );

    const getValueRef: GetValueRef = React.useRef<(() => Promise<any>) | null>(null);

    if (!property) {
        return null;
    }

    return (<div className="h-screen flex flex-col">
        <div
            className="m-2 flex items-center"
        >
            <EditViewTitle
                property={property}
            />
            <EditMagicButton
                isLoading={loading}
                valueChanged={valueChanged}
                saveProperty={async () => {
                    if (!getValueRef.current) {
                        return;
                    }

                    setLoading(true);

                    const valueContent = await getValueRef.current();
                    const updatePropertyValue: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE> = {
                        type: property.schemaProperty.propertyType,
                        value: valueContent,
                    };

                    await property.document.document.putProperty(
                        property.schemaProperty.propertyIdentifier,
                        updatePropertyValue,
                    );

                    setIsDirty(false);
                    setLoading(false);
                    setValueChanged(false);
                }}
            />
        </div>
        <Divider />
        <EditEditors
            usePropertyResponse={property}
            getValueRef={getValueRef}
            onValueChange={() => {
                if (!valueChanged) {
                    setIsDirty(true);
                    setValueChanged(true);
                }
            }}
        />
    </div>);
};
