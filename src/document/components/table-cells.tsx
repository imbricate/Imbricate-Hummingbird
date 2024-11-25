/**
 * @author WMXPY
 * @namespace Document_Components
 * @description Documents Table Cells
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { TableCell } from "@nextui-org/react";
import React from "react";
import { DocumentEditingController } from "../controller/editing-controller";
import { ArrangeDocumentsResultItem } from "../util/arrange-documents";
import { DocumentsTableEditingExtraCell } from "./extra-cell/editing-extra";
import { DocumentTableBooleanCell } from "./table-cells/boolean-cell";
import { DocumentTableMarkdownCell } from "./table-cells/markdown-cell";
import { DocumentTableNumberCell } from "./table-cells/number-cell";
import { DocumentTableStringCell } from "./table-cells/string-cell";

export type DocumentsTableCellsProps = {

    readonly databaseUniqueIdentifier: string;
    readonly propertyIdentifiers: string[];
    readonly propertyTypesMap: Record<string, IMBRICATE_PROPERTY_TYPE>;
    readonly document: ArrangeDocumentsResultItem;
    readonly editingController: DocumentEditingController;
};

export const createDocumentsTableCells = (
    props: DocumentsTableCellsProps,
): JSX.Element[] => {

    return [
        ...props.propertyIdentifiers.map((
            propertyIdentifier: string,
        ) => {

            const property = props.document.propertyValueMap[propertyIdentifier];
            const propertyType: IMBRICATE_PROPERTY_TYPE = props.propertyTypesMap[propertyIdentifier];

            const getEditingProperty = () => {

                const updatedProperties = props.editingController.getUpdatedProperties(props.document.document);

                if (!updatedProperties) {
                    throw new Error("[Imbricate] Updated property not found");
                }

                return updatedProperties[propertyIdentifier]?.value as any;
            };

            const updateEditingProperty = (value: any) => {

                props.editingController.setUpdatingProperty(
                    props.document.document,
                    propertyIdentifier,
                    propertyType,
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
                            editing={props.document.editing}
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
                            editing={props.document.editing}
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
                            editing={props.document.editing}
                        />
                    </TableCell>);
                case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
                    return (<TableCell
                        key={propertyIdentifier}
                    >
                        <DocumentTableMarkdownCell
                            databaseUniqueIdentifier={props.databaseUniqueIdentifier}
                            documentUniqueIdentifier={props.document.document.uniqueIdentifier}
                            propertyKey={propertyIdentifier}
                            property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.MARKDOWN>}
                            getEditingProperty={getEditingProperty}
                            updateEditingProperty={updateEditingProperty}
                            editing={props.document.editing}
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
                            editing={props.document.editing}
                        />
                    </TableCell>);
            }
        }),
        <TableCell
            key="$extra"
        >
            <DocumentsTableEditingExtraCell
                item={props.document}
                editingController={props.editingController}
            />
        </TableCell>,
    ];
};
