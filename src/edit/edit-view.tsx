/**
 * @author WMXPY
 * @namespace Edit
 * @description Edit View
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { Divider } from "@nextui-org/react";
import React, { FC, useCallback } from "react";
import { useDirty } from "../common/hooks/use-dirty";
import { useSaveKeys } from "../common/hooks/use-save-keys";
import { useProperty } from "../property/hooks/use-property";
import { EditViewTitle } from "./components/edit-title";
import { EditMagicButton } from "./components/magic-button";
import { EditEditors } from "./edit-editors";
import { GetValueRef } from "./types/editor-refs";

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

    const savePropertyAction = useCallback(async () => {

        if (!property || !getValueRef.current || !valueChanged) {
            return;
        }

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
    }, [typeof property, typeof getValueRef.current, valueChanged]);

    useSaveKeys(savePropertyAction);

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
                saveProperty={savePropertyAction}
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
