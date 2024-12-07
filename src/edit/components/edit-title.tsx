/**
 * @author WMXPY
 * @namespace Edit_Components
 * @description Edit Title
 */

import { DocumentPropertyValue, IMBRICATE_PROPERTY_TYPE, findPrimaryProperty } from "@imbricate/core";
import { Link } from "@nextui-org/react";
import React, { FC } from "react";
import { FaDatabase } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { NavigationLogo } from "../../navigation/logo";
import { getRouteDatabaseDocumentsView, getRouteDocumentView } from "../../navigation/util/routes";
import { UsePropertyResponse } from "../../property/hooks/use-property";
import { getPropertyIcon } from "../../property/utils/get-icon";
import { stringifyPropertyValue } from "../../property/utils/stringify";

export type EditViewTitleProps = {

    readonly property: UsePropertyResponse;
};

export const EditViewTitle: FC<EditViewTitleProps> = (
    props: EditViewTitleProps,
) => {

    const primaryValue: DocumentPropertyValue<IMBRICATE_PROPERTY_TYPE> | null =
        findPrimaryProperty(
            props.property.document.database.database.schema,
            props.property.document.document.properties,
        );

    if (primaryValue) {

        const stringifiedValue = stringifyPropertyValue(primaryValue);

        return (<div
            className="flex-1 ml-1.5 flex gap-4 items-center mr-5 min-h-0 min-w-0"
        >
            <NavigationLogo
                size="tiny"
            />
            <div
                className="flex-1 min-h-0 min-w-0"
            >
                <Link
                    className="block font-mono text-current overflow-hidden text-large whitespace-nowrap text-ellipsis"
                    href={getRouteDocumentView(
                        props.property.document.database.database.uniqueIdentifier,
                        props.property.document.document.uniqueIdentifier,
                    )}
                    target="_blank"
                >
                    {stringifiedValue}
                </Link>
                <div
                    className="flex gap-1 items-center"
                >
                    <Link
                        className="text-tiny text-gray-600 flex gap-1 items-center"
                        href={getRouteDatabaseDocumentsView(
                            props.property.document.database.database.uniqueIdentifier,
                        )}
                        target="_blank"
                    >
                        <FaDatabase />
                        {props.property.document.database.database.databaseName}
                    </Link>
                    <MdKeyboardDoubleArrowRight
                        className="text-medium text-gray-600"
                    />
                    <Link
                        className="text-tiny text-gray-600 flex gap-1 items-center"
                        href={getRouteDocumentView(
                            props.property.document.database.database.uniqueIdentifier,
                            props.property.document.document.uniqueIdentifier,
                        )}
                        target="_blank"
                    >
                        {getPropertyIcon(
                            props.property.schemaProperty.propertyType,
                        )}
                        {props.property.schemaProperty.propertyName}
                    </Link>
                </div>

            </div>
            <div>
                { }
            </div>
        </div>);
    }

    return null;
};
