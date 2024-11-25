/**
 * @author WMXPY
 * @namespace Document_Components
 * @description Documents Table Cells Create
 */

import { DocumentProperties, DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { TableCell } from "@nextui-org/react";
import React from "react";
import { DocumentEditingController } from "../controller/editing-controller";
import { DocumentTableBooleanCell } from "./table-cells/boolean-cell";
import { DocumentTableMarkdownCell } from "./table-cells/markdown-cell";
import { DocumentTableNumberCell } from "./table-cells/number-cell";
import { DocumentTableStringCell } from "./table-cells/string-cell";
import { DocumentsTableCreatingExtraCell } from "./extra-cell/creating-extra";

export type DocumentsTableCellsCreateProps = {

    readonly propertyIdentifiers: string[];
    readonly propertyTypesMap: Record<string, IMBRICATE_PROPERTY_TYPE>;
    readonly creatingDocumentKey: string;
    readonly creatingDocumentProperties: DocumentProperties;
    readonly editingController: DocumentEditingController;
};

export const createDocumentsTableCellsCreate = (
    props: DocumentsTableCellsCreateProps,
): JSX.Element[] => {

    return [
        ...props.propertyIdentifiers.map((
            propertyIdentifier: string,
        ) => {

            const property = props.creatingDocumentProperties[propertyIdentifier];
            const propertyType: IMBRICATE_PROPERTY_TYPE = property
                ? property.type
                : props.propertyTypesMap[propertyIdentifier];

            const getEditingProperty = () => {

                const updatedProperties = props.editingController.getCreatingDocument(props.creatingDocumentKey);

                if (!updatedProperties) {
                    throw new Error("[Imbricate] Updated property not found");
                }

                return updatedProperties[propertyIdentifier]?.value as any;
            };

            const updateEditingProperty = (value: any) => {

                props.editingController.updateCreatingDocument(
                    props.creatingDocumentKey,
                    propertyIdentifier,
                    value,
                );
            };

            // IMBRICATE_PROPERTY_TYPE SWITCH
            switch (propertyType) {

                case IMBRICATE_PROPERTY_TYPE.BOOLEAN:
                    return (<TableCell
                        key={propertyIdentifier}
                    >
                        <DocumentTableBooleanCell
                            propertyKey={propertyIdentifier}
                            property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.BOOLEAN>}
                            getEditingProperty={getEditingProperty}
                            updateEditingProperty={updateEditingProperty}
                            editing
                        />
                    </TableCell>);
                case IMBRICATE_PROPERTY_TYPE.STRING:
                    return (<TableCell
                        key={propertyIdentifier}
                    >
                        <DocumentTableStringCell
                            propertyKey={propertyIdentifier}
                            property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>}
                            getEditingProperty={getEditingProperty}
                            updateEditingProperty={updateEditingProperty}
                            editing
                        />
                    </TableCell>);
                case IMBRICATE_PROPERTY_TYPE.NUMBER:
                    return (<TableCell
                        key={propertyIdentifier}
                    >
                        <DocumentTableNumberCell
                            propertyKey={propertyIdentifier}
                            property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.NUMBER>}
                            getEditingProperty={getEditingProperty}
                            updateEditingProperty={updateEditingProperty}
                            editing
                        />
                    </TableCell>);
                case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
                    return (<TableCell
                        key={propertyIdentifier}
                    >
                        <DocumentTableMarkdownCell
                            propertyKey={propertyIdentifier}
                            property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>}
                            getEditingProperty={getEditingProperty}
                            updateEditingProperty={updateEditingProperty}
                            editing
                        />
                    </TableCell>);
                default:
                    return (<TableCell
                        key={propertyIdentifier}
                    >
                        <DocumentTableStringCell
                            propertyKey={propertyIdentifier}
                            property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>}
                            getEditingProperty={getEditingProperty}
                            updateEditingProperty={updateEditingProperty}
                            editing
                        />
                    </TableCell>);
            }
        }),
        <TableCell
            key="$extra"
        >
            <DocumentsTableCreatingExtraCell
                creatingKey={props.creatingDocumentKey}
                editingController={props.editingController}
            />
        </TableCell>,
    ];
};
