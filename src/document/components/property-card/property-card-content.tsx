/**
 * @author WMXPY
 * @namespace Document_Components_PropertyCard
 * @description Property Card Content
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import { Card, CardBody, CardHeader, Divider, TableCell } from "@nextui-org/react";
import React from "react";
import { getPropertyIcon } from "../../../property/utils/get-icon";
import { CommonCopyItem } from "../../../common/components/copy-item";
import { DocumentTableBooleanCell } from "../table-cells/boolean-cell";
import { DocumentTableDateCell } from "../table-cells/date-cell";
import { DocumentTableMarkdownCell } from "../table-cells/markdown-cell";
import { DocumentTableNumberCell } from "../table-cells/number-cell";
import { DocumentTableStringCell } from "../table-cells/string-cell";

export type DocumentPropertyCardContentProps = {

    readonly schema: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>;
    readonly property?: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
};

export const DocumentPropertyCardContent: React.FC<DocumentPropertyCardContentProps> = (
    props: DocumentPropertyCardContentProps,
) => {

    const propertyType: IMBRICATE_PROPERTY_TYPE = props.schema.propertyType;
    const propertyIdentifier: string = props.schema.propertyIdentifier;
    const property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE> = props.property as any;

    const getEditingProperty = () => {
        return null as any;
    };

    const updateEditingProperty = (value: any) => {
    };

    // IMBRICATE_PROPERTY_TYPE SWITCH
    switch (propertyType) {

        case IMBRICATE_PROPERTY_TYPE.BOOLEAN:
            return (<DocumentTableBooleanCell
                propertyKey={propertyIdentifier}
                property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.BOOLEAN>}
                getEditingProperty={getEditingProperty}
                updateEditingProperty={updateEditingProperty}
                editing
            />);
        case IMBRICATE_PROPERTY_TYPE.STRING:
            return (<DocumentTableStringCell
                propertyKey={propertyIdentifier}
                property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>}
                getEditingProperty={getEditingProperty}
                updateEditingProperty={updateEditingProperty}
                editing
            />);
        case IMBRICATE_PROPERTY_TYPE.NUMBER:
            return (<DocumentTableNumberCell
                propertyKey={propertyIdentifier}
                property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.NUMBER>}
                getEditingProperty={getEditingProperty}
                updateEditingProperty={updateEditingProperty}
                editing
            />);
        case IMBRICATE_PROPERTY_TYPE.DATE:
            return (<DocumentTableDateCell
                propertyKey={propertyIdentifier}
                property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.DATE>}
                getEditingProperty={getEditingProperty}
                updateEditingProperty={updateEditingProperty}
                editing
            />);
        case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
            return (<DocumentTableMarkdownCell
                databaseUniqueIdentifier={props.databaseUniqueIdentifier}
                documentUniqueIdentifier={props.document.document.uniqueIdentifier}
                propertyKey={propertyIdentifier}
                property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>}
                getEditingProperty={getEditingProperty}
                updateEditingProperty={updateEditingProperty}
                editing
            />);
        case IMBRICATE_PROPERTY_TYPE.LABEL:
            return (<DocumentTableStringCell
                propertyKey={propertyIdentifier}
                property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>}
                getEditingProperty={getEditingProperty}
                updateEditingProperty={updateEditingProperty}
                editing
            />);
        case IMBRICATE_PROPERTY_TYPE.REFERENCE:
            return (<DocumentTableStringCell
                propertyKey={propertyIdentifier}
                property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>}
                getEditingProperty={getEditingProperty}
                updateEditingProperty={updateEditingProperty}
                editing
            />);
        default:
            return (<DocumentTableStringCell
                propertyKey={propertyIdentifier}
                property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>}
                getEditingProperty={getEditingProperty}
                updateEditingProperty={updateEditingProperty}
                editing
            />);
    }
};
