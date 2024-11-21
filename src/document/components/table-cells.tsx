/**
 * @author WMXPY
 * @namespace Document_Components
 * @description Documents Table Cells
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { TableCell } from "@nextui-org/react";
import React from "react";
import { ArrangeDocumentsResultItem } from "../util/arrange-documents";
import { getDefaultValueOfProperty } from "../util/default-value";
import { DocumentsTableExtraCell } from "./table-cells/extra";
import { DocumentTableStringCell } from "./table-cells/string-cell";

export type DocumentsTableCellsProps = {

    readonly propertyIdentifiers: string[];
    readonly propertyTypesMap: Record<string, IMBRICATE_PROPERTY_TYPE>;
    readonly document: ArrangeDocumentsResultItem;
};

export const createDocumentsTableCells = (
    props: DocumentsTableCellsProps,
): JSX.Element[] => {

    return [
        ...props.propertyIdentifiers.map((
            propertyIdentifier: string,
        ) => {

            const property = props.document.propertyValueMap[propertyIdentifier];
            const propertyType: IMBRICATE_PROPERTY_TYPE = property
                ? property.type
                : props.propertyTypesMap[propertyIdentifier];

            switch (propertyType) {

                case IMBRICATE_PROPERTY_TYPE.STRING:
                    return (<TableCell
                        key={propertyIdentifier}
                    >
                        <DocumentTableStringCell
                            property={property as DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE.STRING>}
                            editing={Math.random() > 0.5}
                        />
                    </TableCell>);

                case IMBRICATE_PROPERTY_TYPE.MARKDOWN:
                    return (<TableCell
                        key={propertyIdentifier}
                    >
                        {property && typeof property.value !== "undefined"
                            ? property.value
                            : getDefaultValueOfProperty(IMBRICATE_PROPERTY_TYPE.MARKDOWN)}
                    </TableCell>);
            }
        }),
        <TableCell
            key="$extra"
        >
            <DocumentsTableExtraCell
                item={props.document}
            />
        </TableCell>,
    ];
};
