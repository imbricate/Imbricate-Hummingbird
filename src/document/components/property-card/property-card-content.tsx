/**
 * @author WMXPY
 * @namespace Document_Components_PropertyCard
 * @description Property Card Content
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, ImbricateDatabaseSchemaProperty } from "@imbricate/core";
import React from "react";
import { DocumentBooleanValue } from "../property-value/boolean-value";
import { DocumentDateValue } from "../property-value/date-value";
import { DocumentLabelValue } from "../property-value/label-value";
import { DocumentMarkdownValue } from "../property-value/markdown-value";
import { DocumentNumberValue } from "../property-value/number-value";
import { DocumentStringValue } from "../property-value/string-value";
import { DocumentJsonValue } from "../property-value/json-value";
import { DocumentImbriscriptValue } from "../property-value/imbriscript-value";

export type DocumentPropertyCardContentProps = {

    readonly showPropertyName?: boolean;

    readonly databaseUniqueIdentifier: string;
    readonly documentUniqueIdentifier: string;

    readonly schema: ImbricateDatabaseSchemaProperty<IMBRICATE_PROPERTY_TYPE>;
    readonly property: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>;
    readonly updateProperty: (value: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>) => void;
};

export const DocumentPropertyCardContent: React.FC<DocumentPropertyCardContentProps> = (
    props: DocumentPropertyCardContentProps,
) => {

    const propertyType: IMBRICATE_PROPERTY_TYPE = props.schema.propertyType;
    const propertyIdentifier: string = props.schema.propertyIdentifier;

    // IMBRICATE_PROPERTY_TYPE SWITCH
    switch (propertyType) {

        case IMBRICATE_PROPERTY_TYPE.BOOLEAN:
            return (<DocumentBooleanValue
                propertyKey={propertyIdentifier}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
            />);
        case IMBRICATE_PROPERTY_TYPE.STRING:
            return (<DocumentStringValue
                showPropertyName={props.showPropertyName}
                propertySchema={props.schema as any}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
            />);
        case IMBRICATE_PROPERTY_TYPE.NUMBER:
            return (<DocumentNumberValue
                propertyKey={propertyIdentifier}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
            />);
        case IMBRICATE_PROPERTY_TYPE.DATE:
            return (<DocumentDateValue
                propertyKey={propertyIdentifier}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
            />);
        case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
            return (<DocumentMarkdownValue
                databaseUniqueIdentifier={props.databaseUniqueIdentifier}
                documentUniqueIdentifier={props.documentUniqueIdentifier}
                propertyKey={propertyIdentifier}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
            />);
        case IMBRICATE_PROPERTY_TYPE.IMBRISCRIPT:
            return (<DocumentImbriscriptValue
                databaseUniqueIdentifier={props.databaseUniqueIdentifier}
                documentUniqueIdentifier={props.documentUniqueIdentifier}
                propertyKey={propertyIdentifier}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
            />);
        case IMBRICATE_PROPERTY_TYPE.JSON:
            return (<DocumentJsonValue
                databaseUniqueIdentifier={props.databaseUniqueIdentifier}
                documentUniqueIdentifier={props.documentUniqueIdentifier}
                propertyKey={propertyIdentifier}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
            />);
        case IMBRICATE_PROPERTY_TYPE.LABEL:
            return (<DocumentLabelValue
                propertyKey={propertyIdentifier}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
                options={props.schema.propertyOptions as any}
            />);
        case IMBRICATE_PROPERTY_TYPE.REFERENCE:
            return (<DocumentStringValue
                showPropertyName={props.showPropertyName}
                propertySchema={props.schema as any}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
            />);
        default:
            return (<DocumentStringValue
                showPropertyName={props.showPropertyName}
                propertySchema={props.schema as any}
                property={props.property as any}
                updateProperty={props.updateProperty as any}
            />);
    }
};
