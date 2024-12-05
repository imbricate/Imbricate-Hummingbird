/**
 * @author WMXPY
 * @namespace Property_Utils
 * @description Stringify
 */

import { DocumentPropertyValue, DocumentPropertyValueObject, DocumentPropertyValueObjectReference, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";

export const stringifyPropertyValue = (
    propertyValue: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE>,
): string => {

    if (typeof propertyValue.value === "undefined" || propertyValue.value === null) {
        return "Empty";
    }

    // IMBRICATE_PROPERTY_TYPE SWITCH
    switch (propertyValue.type) {

        case IMBRICATE_PROPERTY_TYPE.BOOLEAN:
            return propertyValue.value ? "True" : "False";
        case IMBRICATE_PROPERTY_TYPE.STRING:
            return propertyValue.value as string;
        case IMBRICATE_PROPERTY_TYPE.NUMBER:
            return String(propertyValue.value);
        case IMBRICATE_PROPERTY_TYPE.DATE:
            return new Date(propertyValue.value as string).toLocaleString();
        case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
            return `Markdown File ${propertyValue.value}`;
        case IMBRICATE_PROPERTY_TYPE.IMBRISCRIPT:
            return `Imbriscript File ${propertyValue.value}`;
        case IMBRICATE_PROPERTY_TYPE.JSON:
            return `JSON File ${propertyValue.value}`;
        case IMBRICATE_PROPERTY_TYPE.LABEL:
            return (propertyValue.value as DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.LABEL>)
                .map((each: string) => each)
                .join(", ");
        case IMBRICATE_PROPERTY_TYPE.REFERENCE:
            return (propertyValue.value as DocumentPropertyValueObject<IMBRICATE_PROPERTY_TYPE.REFERENCE>)
                .map((each: DocumentPropertyValueObjectReference) => each.documentUniqueIdentifier)
                .join(", ");
    }

    return "Unknown";
};
